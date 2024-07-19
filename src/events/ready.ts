// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Client as Bot } from 'discord.js';
import logger from '../utils/logger';

export default function (bot: Bot) {
  bot.on('ready', async () => {
    logger({ status: "INFO", message: `Ready! Logged in as ${bot.user?.tag}. Hello From ./events/ready.ts`});
  });
}
