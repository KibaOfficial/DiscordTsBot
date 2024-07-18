// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Client as Bot, Events } from "discord.js";
import logger from "../utils/logger";

export default {
  name: Events.ClientReady,
  once: true,
  execute(bot: Bot) {
    logger({ status: "INFO", message: `Ready! Logged in as ${bot.user?.tag}`});
  },
};
