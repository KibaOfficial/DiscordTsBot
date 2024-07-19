<!--
Copyright (c) 2024 KibaOfficial

This software is released under the MIT License.

https://opensource.org/licenses/MIT
-->

# Discord TS Bot

A Discord Bot project written in TypeScript.

## Setup

To set up the bot, follow these steps:

### 1. Create a bot on the Discord developer site

1. Go to the [Discord developer site](https://discord.com/developers/applications).

2. Click on "New Application" and give your bot a name.

3. Navigate to "Bot" in the menu on the left and click on "Add Bot".

4. Copy your bot's token. You will need it later.

### 2. Configure the .env file

1. Find the `.env.example` file in your project directory.
2. Fill the file with the necessary information:
```env
-- BOT STUFF ---
DISCORD_TOKEN=YourDiscordBotToken
DISCORD_CLIENT_ID=YourClientID

-- GUILD STUFF ---
GUILD_ID=YourGuildID
WELCOME_CHANNEL_ID=YourWelcomeChannelID

-- OWNER STUFF ---
OWNER_ID=YourOwnerID
```
3. Rename the file to `.env`.

### 3. Install the dependencies

Open a terminal in the project directory and run the following command:
```bash
npm i
```

### 4. Start the bot

To start the bot in development mode, run the following command:
```bash
./startBot.sh prod
```
or
```batch
./startBot.bat dev
```
or
```pwsh
./startBot.ps1 dev
```

Or to build and start the bot for production:
```bash
./startBot.sh prod
```
or
```batch
./startBot.bat prod
```
or
```pwsh
./startBot.ps1 prod
```

## Contribute

If you want to contribute to the development of this project, please follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.