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
} from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from './types';
import dotenv from 'dotenv';
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
    console.error(`Invalid command file: ${file}. Expected a valid SlashCommandBuilder object.`);
  }
}

async function registerCommandsForGuild(guildId: string) {
  const rest = new REST({ version: '10' }).setToken(discordToken || "DISCORD_TOKEN_HERE");

  try {
    await rest.put(
      Routes.applicationGuildCommands(discordClientId || "DISCORD_CLIENT_ID_HERE", guildId),
      { body: commandData }
    );
    console.log(`Successfully registered application (/) commands for guild ${guildId}.`);
  } catch (error) {
    console.error(`Error registering application (/) commands for guild ${guildId}:`, error);
  }
}

async function startBot() {
  try {
    await bot.login(discordToken);
    console.log('Bot is connected and ready.');
    
    await registerCommandsForGuild(guildId || 'GUILD_ID_HERE');
  } catch (error) {
    console.error('Error starting bot:', error);
  }
}

bot.on('ready', async () => {
  console.log('Bot is ready.');
});

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
  }
});

async function rebootBot() {
  try {
    await bot.destroy();
    await bot.login(discordToken);
    console.log('Bot restarted successfully.');
  } catch (error) {
    console.error('Error restarting bot:', error);
  }
}

startBot();

export { bot, registerCommandsForGuild, rebootBot };
