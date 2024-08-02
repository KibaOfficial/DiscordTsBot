-- Copyright (c) 2024 KibaOfficial
-- 
-- This software is released under the MIT License.
-- https://opensource.org/licenses/MIT

CREATE TABLE IF NOT EXISTS guilds(
  guild_id    varchar(19) not null,
  welcome_id  varchar(19),

  primary key(guild_id)
);
