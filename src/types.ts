// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  name?: string;
  execute(interaction: CommandInteraction): Promise<void>;
}
