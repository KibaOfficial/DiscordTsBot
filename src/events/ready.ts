// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ActivityType, Client as Bot } from 'discord.js';
import logger from '../utils/logger';

export default function (bot: Bot) {
  bot.on('ready', async () => {
    logger({ status: "INFO", message: `Ready! Logged in as ${bot.user?.tag}.`});

    const activities = [
      { name: `watching on ${bot.guilds.cache.size} servers`, type: ActivityType.Watching },
      { name: 'streaming content', type: ActivityType.Streaming, url: 'https://twitch.tv/KibaOfficial' },
      { name: 'watching code on', type: ActivityType.Streaming, url: 'https://github.com/KibaOfficial'}
    ];

    let currentActivity = 0;
    const changeActivity = () => {
      bot.user?.setActivity(activities[currentActivity]);
      currentActivity = (currentActivity + 1) % activities.length;
    };

    changeActivity();
    setInterval(changeActivity, 600000); 
  });
}
