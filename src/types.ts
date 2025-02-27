// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction, JSONEncodable } from 'discord.js';

export interface Command {
  data: JSONEncodable<RESTPostAPIChatInputApplicationCommandsJSONBody>;
  name?: string;
  execute(interaction: CommandInteraction): Promise<void>;
}

export interface LoggerProps {
  status: String
  message: String
}