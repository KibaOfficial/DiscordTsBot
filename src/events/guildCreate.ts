// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Client as Bot,
} from "discord.js";
import { db } from "../utils/db";
import logger from "../utils/logger";

export default function (bot: Bot) {
  bot.on('guildCreate', async (guild) => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.run("INSERT INTO guilds(guild_id) VALUES(?)", [guild.id], (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error adding server ${guild} to DB: ${error}`,
      });
      return;
    } 
  })
}