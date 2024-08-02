// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Client as Bot } from 'discord.js';
import logger from '../utils/logger';
import { db } from '../utils/db';


export default function (bot: Bot) {
  bot.on('guildDelete', async (guild) => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.run("DELETE FROM guilds WHERE guild_id = ?", [guild.id], (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    } catch (error) {
      logger({ status: "ERROR", message: `Error removing server ${guild} to DB: ${error}` });
      return;
    }
  })
}