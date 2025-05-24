import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",
  CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  GUILD_ID: process.env.GUILD_ID || "",
  OWNER_ID: process.env.OWNER_ID || "",
  REGISTER_TYPE: process.env.REGISTER_TYPE || "GUILD",
};
