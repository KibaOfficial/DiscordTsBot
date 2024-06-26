// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';
import { bot, rebootBot, registerCommandsForGuild } from '../bot';

const guildId = process.env.GUILD_ID

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('reboot')
    .setDescription('Restarts the bot (Admin only)'),
  async execute(interaction) {
    const allowedUserId = process.env.OWNER_ID || 'OWNER_ID_HERE';

    if (interaction.user.id !== allowedUserId) {
      await interaction.reply({ content: 'You do not have permission to execute this command.', ephemeral: true });
      console.error(`${interaction.user.globalName} with the user id ${interaction.user.id} has tried to reboot the Bot`);
      return;
    }

    try {
      await interaction.deferReply({ ephemeral: true });
      console.log('Initiating bot restart...');
      await rebootBot();
      await registerCommandsForGuild(guildId || '');
      console.log('Bot restarted successfully.');
      await interaction.followUp('Bot is online!');
      
    } catch (error) {
      console.error('Error restarting bot:', error);
      await interaction.editReply('An error occurred while restarting the bot.');
    }
  },
};

export default command;
