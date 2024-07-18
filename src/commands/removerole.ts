// Copyright (c) 2024 KibaOfficial
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  SlashCommandBuilder,
  GuildMember,
  ChatInputCommandInteraction,
  Guild,
} from "discord.js";
import { Command } from "../types";
import logger from "../utils/logger";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Removes a specific role from a defined user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to remove the role from")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove from the user")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");

    const interactionUser = interaction.member as GuildMember;

    const userPermissions = interactionUser.permissions.has("ManageRoles");

    if (!userPermissions) {
      await interaction.reply({
        content: "No Permissions to add role to other users.",
        ephemeral: true,
      });
      return;
    }

    if (!user || !role) {
      await interaction.reply({
        content: "User or role not found.",
        ephemeral: true,
      });
      return;
    }

    const member = interaction.guild?.members.cache.get(user.id);
    if (!member) {
      await interaction.reply({
        content: "Member not found in this guild.",
        ephemeral: true,
      });
      return;
    }

    try {
      await member.roles.remove(role.id);
      await interaction.reply({
        content: `Successfully remove the role ${role.name} from ${
          member.nickname || member.user.tag
        }`,
        ephemeral: true,
      });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error removing role (${role.name}) from ${
          member.nickname || member.user.tag
        }: ${error}`,
      });
      await interaction.reply({
        content: "Failed to remove the role.",
        ephemeral: true,
      });
    }
  },
};

export default command;