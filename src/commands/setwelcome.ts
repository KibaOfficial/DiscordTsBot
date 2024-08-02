// Copyright (c) 2024 KibaOfficial
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { GuildMember, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { db } from "../utils/db";
import logger from "../utils/logger";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("sets the welcome channel for this server")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("add a channel to sent welcome messages")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.guildId;
    const channel = interaction.options.get("channel")?.value;

    const interactionUser = interaction.member as GuildMember;

    const userPermissions = interactionUser.permissions.has("ManageRoles");

    if (!userPermissions) {
      await interaction.reply({
        content: "No Permissions to add role to other users.",
        ephemeral: true,
      });
      return;
    }
    try {
      await new Promise<void>((resolve, reject) => {
        db.run(
          "UPDATE guilds SET welcome_id = ? WHERE guild_id = ?",
          [channel, guild],
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error adding server ${guild} welcome channel ${channel} to DB: ${error}`,
      });
      await interaction.reply({
        content: "There was an error while adding the channel",
        ephemeral: true,
      });
      return;
    }
    logger({
      status: "INFO",
      message: `Added server ${guild} with channel ${channel} to DB`,
    });
    await interaction.reply({ content: "Welcome Channel added successfully" });
  },
};

export default command;
