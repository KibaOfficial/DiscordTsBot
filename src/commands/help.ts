// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends helpful information about this bot"),
  async execute(interaction) {
    const embed =  new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("Willkommen")
    .setDescription("For more help please visit: https://discord.gg/vRvxbuQUVn")
    .addFields(
      { name: 'User Commands', value: '\u200b'},
      { name: '/ping', value: "Tests the latency to the discord api" },
      { name: '/help', value: "Sends this message" },
      { name: '\u200b', value: '\u200b'},
      { name: 'Adminstrative Commands', value: "\u200b" },
      { name: '/setrole', value: 'Gives a specific user a defined role' },
      { name: '/removerole', value: "Removes a specific role from a defined user" },
      { name: '/setwelcome', value: "Sets the welcome channel for this server" },
      { name: '\u200b', value: '\u200b'},
      { name: 'Owner Commands', value: '\u200b'},
      { name: '/reboot', value: "Reboots the bot" },
    )
    .setTimestamp()
    .setFooter({ text: "Made with ❤️ by KibaOfficial in Germany 🇩🇪"})

    interaction.reply({ embeds: [embed] });
  },
};

export default command;
