// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { SlashCommandBuilder, GuildMember } from 'discord.js';
import { Command } from '../types';

// /setRole User: Mention Role: Role Mention/Role ID

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('setrole')
    .setDescription('Gives a specific user a defined role')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to assign the role to')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to assign to the user')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.get('user');
    const role = interaction.options?.get('role');
    const interactionUser = interaction.member as GuildMember;

    const userPermissions = interactionUser.permissions.has("ManageRoles");

    if (!userPermissions) {
      await interaction.reply({ content: 'No Permissions to add role to other users.', ephemeral: true});
      return;
    }
    
    if (!user || !role) {
      await interaction.reply({ content: 'User or role not found.', ephemeral: true });
      return;
    }

    const member = interaction.guild?.members.cache.get(user.user?.id || "");
    if (!member) {
      await interaction.reply({ content: 'Member not found in this guild.', ephemeral: true });
      return;
    }

    try {
      await member.roles.add(role);
      await interaction.reply({ content: `Successfully assigned the role ${role.name} to ${user.tag}.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Failed to assign the role.', ephemeral: true });
    }
  }
}

export default command;