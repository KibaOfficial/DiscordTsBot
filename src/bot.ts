// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { 
  Client as Bot, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  RESTPostAPIApplicationCommandsJSONBody, 
  Collection,
  EmbedBuilder,
  TextChannel,
} from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from './types';
import dotenv from 'dotenv';
import logger from './utils/logger';
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.GUILD_ID;

const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const commands = new Collection<string, Command>();
const commandData: RESTPostAPIApplicationCommandsJSONBody[] = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`).default as Command;
    commands.set(command.data.toJSON().name, command);
    commandData.push(command.data.toJSON());
  } catch (error) {
    logger({ status: "ERROR", message: `Invalid command file: ${file}. Expected a valid SlashCommandBuilder object.`});
  }
}

// TODO: Fix Eventhandler
// const eventsPath = path.join(__dirname, 'events')
// const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

// for (const file of eventFiles) {
//   const filePath = path.join(eventsPath, file);
//   const event = require(filePath) as { name: string; once: boolean; execute: (...args: any[]) => void };
  
//   if (event.once) {
//       bot.once(event.name, (...args: any[]) => event.execute(...args));
//   } else {
//       bot.on(event.name, (...args: any[]) => event.execute(...args));
//   }
// }

async function registerCommandsForGuild(guildId: string) {
  const rest = new REST({ version: '10' }).setToken(discordToken || "DISCORD_TOKEN_HERE");

  try {
    await rest.put(
      Routes.applicationGuildCommands(discordClientId || "DISCORD_CLIENT_ID_HERE", guildId),
      { body: commandData }
    );
    logger({ status: "INFO", message: `Successfully registered application (/) commands for guild ${guildId}.`});
  } catch (error) {
    logger({ status: "ERROR", message: `Error registering application (/) commands for guild ${guildId}: ${error}`});
  }
}

async function startBot() {
  try {
    await bot.login(discordToken);
    logger({ status: "INFO", message: 'Bot is connected and ready.'})
    await registerCommandsForGuild(guildId || 'GUILD_ID_HERE');
  } catch (error) {
    logger({ status: "ERROR", message: `Error starting bot: ${error}`});
  }
}

bot.on('ready', async () => {
  logger({ status: "INFO", message: "Bot is ready."});
});

bot.on('guildMemberAdd', async member => {
  const welcomeChannelId = process.env.WELCOME_ID;
  if (!welcomeChannelId) {
    logger({ status: "ERROR", message: "WELCOME_ID is not set"});
    return;
  }

  const channel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel;
  if (!channel || !channel.isTextBased) {
    logger({ status: "ERROR", message: "Welcome channel is not a text channel or not found"});
    return;
  }

  const totalMembers = member.guild.memberCount;
  const welcomeEmbed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('Willkommen')
    .setDescription(`Willkommen auf dem Server, ${member.user.tag}! Du bist der ${totalMembers}. User hier`)
    .setThumbnail(member.user.displayAvatarURL());

  await channel.send({ embeds: [welcomeEmbed]});
})

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger({ status: "ERROR", message: `Command not found: ${interaction.commandName}`});
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger({ status: "ERROR", message: `Error executing command ${interaction.commandName}: ${error}`});
    await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
  }
});

async function rebootBot() {
  try {
    await bot.destroy();
    await bot.login(discordToken);
    logger({ status: "INFO", message: "Bot restarted successfully."});
  } catch (error) {
    logger({ status: "ERROR", message: `Error restarting bot: ${error}`});
  }
}

startBot();

export { bot, registerCommandsForGuild, rebootBot };
