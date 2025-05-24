-- Copyright (c) 2024 KibaOfficial
-- 
-- This software is released under the MIT License.
-- https://opensource.org/licenses/MIT

CREATE TABLE IF NOT EXISTS guilds(
  guild_id    varchar(19) not null,
  welcome_id  varchar(19),

  primary key(guild_id)
);

CREATE TABLE IF NOT EXISTS reactionroles(
  guild_id  varchar(19) not null,
  channel_id varchar(19) not null,
  message_id varchar(19) not null,
  role_id    varchar(19) not null,

  primary key(guild_id, channel_id, message_id)
);
