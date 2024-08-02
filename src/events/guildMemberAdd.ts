// Copyright (c) 2024 KibaOfficial
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {
  Client as Bot,
  GuildMember,
  TextChannel,
  EmbedBuilder,
} from "discord.js";
import logger from "../utils/logger";
import dotenv from "dotenv";
import { db } from "../utils/db";
dotenv.config();

export default function (bot: Bot) {
  bot.on("guildMemberAdd", async (member: GuildMember) => {
    try {
      const result = await new Promise<{ welcome_id: string }>((resolve, reject) => {
        db.get(
          "SELECT welcome_id FROM guilds WHERE guild_id = ?",
          [member.guild.id],
          (err, row) => {
            if (err) {
              return reject(err);
            }
            resolve(row as { welcome_id: string });
          }
        );
      });
      
      if (!result) {
        logger({ status: "WARN", message: `No welcome channel set for server ${member.guild.id}`});
        return;
      }

      const welcomeChannelId = result.welcome_id;

      const channel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel;
      if (!channel || !channel.isTextBased) {
        logger({ status: "ERROR", message: "Welcome channel is not a text channel or not found"});
        return;
      }

      const totalMembers = member.guild.memberCount;
      const welcomeEmbed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Willkommen")
        .setDescription(
          `Willkommen auf dem Server, ${member.user.tag}! Du bist der ${totalMembers}. User hier`
        )
        .setThumbnail(member.user.displayAvatarURL());

      await channel.send({ embeds: [welcomeEmbed] });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error fetching welcome channel ID: ${error}`,
      });
      return;
    }
  });
}
