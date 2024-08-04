// Copyright (c) 2024 KibaOfficial
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { bot } from "../bot";
import logger from "../utils/logger";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("get weather data for your city")
    .addStringOption((option) =>
      option
        .setName("lang")
        .setDescription("language code i.e. de, en-us...")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("city").setDescription("city name").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("unit")
        .setDescription("C or F (Default is °C)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const lang = interaction.options.get("lang", true)?.value as string;
    const city = interaction.options.get("city", true)?.value as string;
    const unit = interaction.options.get("unit", true)?.value as string;

    try {
      // create api url
      const apiUrl = `https://wttr.in/${city}?lang=${lang}&format=j2`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      let temperature = `${data.current_condition[0].temp_C}°C`;
      if (unit === "F") {
        temperature = `${data.current_condition[0].temp_F}°F`;
      }

      let condition = data.current_condition[0];
      if (lang === "de") {
        condition = condition.lang_de[0].value;
      } else {
        condition = condition.weatherDesc[0].value;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Weather for ${city}`)
        .setDescription(`Current weather conditions in ${city}`)
        .addFields(
          { name: "Temperature", value: temperature, inline: true },
          { name: "Condition", value: condition, inline: true },
          { name: "Humidity", value: `${data.current_condition[0].humidity}%`, inline: true },
          { name: "Wind Speed", value: `${data.current_condition[0].windspeedKmph} km/h`, inline: true },
          { name: "Pressure", value: `${data.current_condition[0].pressure} hPa`, inline: true },
          { name: "Visibility", value: `${data.current_condition[0].visibility} km`, inline: true }
        )
        .setFooter({ text: `Data provided by wttr.in` });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      logger({
        status: "ERROR",
        message: `Error getting weather data: ${error}`,
      });
      interaction.reply({
        content: "Error fetching weather data for " + city,
        ephemeral: true,
      });
      throw new Error("Error fetching weather data");
    }
  },
};

export default command;
