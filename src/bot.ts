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
  Interaction,
} from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "./types";
import dotenv from "dotenv";
import logger from "./utils/logger";
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

const loadCommands = async () => {
  const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));
  for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default as Command;
    commands.set(command.data.toJSON().name, command);
    commandData.push(command.data.toJSON());
  }
};

const loadEvents = async () => {
  const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
  for (const file of eventFiles) {
    const event = (await import(`./events/${file}`)).default;
    event(bot);
  }
};

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(
    discordToken || "DISCORD_TOKEN_HERE"
  );

  if (process.env.REGISTER_TYPE === "GLOBAL") {
    try {
      await rest.put(
        Routes.applicationCommands(
          discordClientId || "DISCORD_CLIENT_ID_HERE"
        ),
        { body: commandData }
      );
      logger({
        status: "INFO",
        message: `Successfully registered application (/) commands globally.`,
      });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error registering application (/) commands globally: ${error}`,
      });
    }
  } else if (process.env.REGISTER_TYPE === "GUILD") {
    try {
      await rest.put(
        Routes.applicationGuildCommands(
          discordClientId || "DISCORD_CLIENT_ID_HERE",
          guildId || "GUILD_ID_HERE"
        ),
        { body: commandData }
      );
      logger({
        status: "INFO",
        message: `Successfully registered application (/) commands for guild ${guildId}.`,
      });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error registering application (/) commands for guild ${guildId}: ${error}`,
      });
    }
  } else {
    logger({
      status: "ERROR",
      message: "Error: Check REGISTER_TYPE in .env file",
    });
  }
}

async function startBot() {
  try {
    await bot.login(discordToken);
    logger({ status: "INFO", message: "Bot is connected and ready." });
    await registerCommands();
  } catch (error) {
    logger({ status: "ERROR", message: `Error starting bot: ${error}` });
  }
}

bot.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger({
      status: "ERROR",
      message: `Command not found: ${interaction.commandName}`,
    });
    return;
  }

  try {
    const response = await command.execute(interaction);
    const { commandName, user: { tag } } = interaction;

    logger({
      status: "INFO",
      message: `Command executed: ${commandName} by ${tag} in ${interaction.inGuild() ? interaction.guild?.name : `DM with userId ${interaction.user.id}`}`,
    });
  } catch (error) {
    logger({
      status: "ERROR",
      message: `Error executing command ${interaction.commandName}: ${error}`,
    });
    await interaction.reply({
      content: "There was an error while executing this command",
      ephemeral: true,
    });
  }
});

(async () => {
  await loadCommands();
  await loadEvents();
  await startBot();
})();

async function rebootBot() {
  try {
    await bot.destroy();
    await bot.login(discordToken);
    logger({ status: "INFO", message: "Bot restarted successfully." });
  } catch (error) {
    logger({ status: "ERROR", message: `Error restarting bot: ${error}` });
  }
}

async function registerCommandsForGuild(guildId: string) {
  const rest = new REST({ version: "10" }).setToken(
    discordToken || "DISCORD_TOKEN_HERE"
  );

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        discordClientId || "DISCORD_CLIENT_ID_HERE",
        guildId
      ),
      { body: commandData }
    );
    logger({
      status: "INFO",
      message: `Successfully registered application (/) commands for guild ${guildId}.`,
    });
  } catch (error) {
    logger({
      status: "ERROR",
      message: `Error registering application (/) commands for guild ${guildId}: ${error}`,
    });
  }
}

export { bot, registerCommandsForGuild, rebootBot };
