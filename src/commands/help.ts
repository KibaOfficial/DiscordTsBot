// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { bot } from "../bot";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends helpful information about this bot"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Welcome to our Bot!")
      .setDescription("Here is a list of available commands and their descriptions.")
      .addFields(
        { name: 'User Commands', value: 'Commands that all users can use:' },
        { name: '/ping', value: "Tests the latency to the Discord API" },
        { name: '/help', value: "Sends this help message" },
        { name: '/weather', value: "Get weather data for your city" },
        { name: '\u200b', value: '\u200b' }, // Empty line for better separation
        { name: 'Administrative Commands', value: "Commands for administrators:" },
        { name: '/setrole', value: 'Gives a specific user a defined role' },
        { name: '/removerole', value: "Removes a specific role from a defined user" },
        { name: '/setwelcome', value: "Sets the welcome channel for this server" },
        { name: '\u200b', value: '\u200b' }, // Empty line for better separation
        { name: 'Owner Commands', value: 'Commands that only the owner can use:' },
        { name: '/reboot', value: "Reboots the bot" }
      )
      .setTimestamp()
      .setFooter({ text: `Made with ❤️ by KibaOfficial` });

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
