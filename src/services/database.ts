import { db } from "../utils/db";

export const addGuild = async (guildId: string) => {
  return new Promise<void>((resolve, reject) => {
    db.run("INSERT INTO guilds(guild_id) VALUES(?)", [guildId], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const removeGuild = async (guildId: string) => {
  return new Promise<void>((resolve, reject) => {
    db.run("DELETE FROM guilds WHERE guild_id = ?", [guildId], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Add more database operations as needed
