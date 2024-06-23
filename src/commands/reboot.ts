// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types';
import { rebootBot } from '../bot';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('reboot')
    .setDescription('Restarts the bot (Admin only)'),
  async execute(interaction) {
    const allowedUserId = process.env.OWNER_ID || 'OWNER_ID_HERE';

    if (interaction.user.id !== allowedUserId) {
      await interaction.reply({ content: 'You do not have permission to execute this command.', ephemeral: true });
      return;
    }

    try {
      await interaction.deferReply({ ephemeral: true });
      console.log('Initiating bot restart...');
      await rebootBot();
      console.log('Bot restarted successfully.');

      try {
        const replyMessage = await interaction.editReply('Bot is restarting...');
        if (!replyMessage) throw new Error('Reply message not found.');

        await replyMessage.edit('Bot is online!');
        console.log('Bot restarted by user:', interaction.user.tag);
        console.log('Bot restart complete.');
      } catch (error) {
        console.error('Error editing reply message:', error);
        await interaction.followUp('Bot is online!');
      }
      
    } catch (error) {
      console.error('Error restarting bot:', error);
      await interaction.editReply('An error occurred while restarting the bot.');
    }
  },
};

export default command;
