// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Client as Bot, GuildMember, TextChannel, EmbedBuilder } from 'discord.js';
import logger from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

export default function (bot: Bot) {
  bot.on('guildMemberAdd', async (member: GuildMember) => {
    const welcomeChannelId = process.env.WELCOME_ID;
    if (!welcomeChannelId) {
      logger({ status: "ERROR", message: "WELCOME_ID is not set" });
      return;
    }

    const channel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel;
    if (!channel || !channel.isTextBased) {
      logger({ status: "ERROR", message: "Welcome channel is not a text channel or not found" });
      return;
    }

    const totalMembers = member.guild.memberCount;
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Willkommen')
      .setDescription(`Willkommen auf dem Server, ${member.user.tag}! Du bist der ${totalMembers}. User hier`)
      .setThumbnail(member.user.displayAvatarURL());

    await channel.send({ embeds: [welcomeEmbed] });
  });
}
