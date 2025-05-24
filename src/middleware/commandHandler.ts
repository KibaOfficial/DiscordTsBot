import { CommandInteraction } from "discord.js";
import { Command } from "../types";
import logger from "../utils/logger";

export const executeCommand = async (
  interaction: CommandInteraction,
  command: Command
) => {
  try {
    await command.execute(interaction);
    logger({
      status: "INFO",
      message: `Command executed: ${interaction.commandName} by ${interaction.user.tag}`,
    });
  } catch (error) {
    logger({
      status: "ERROR",
      message: `Error executing command ${interaction.commandName}: ${error}`,
    });
    await interaction.reply({
      content: "There was an error while executing this command.",
      ephemeral: true,
    });
  }
};
