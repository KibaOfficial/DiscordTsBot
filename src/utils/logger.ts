// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { LoggerProps } from "../types";
import fs from "fs";
import path from "path";

const logFile = path.join(__dirname, "../../logs/bot.log");
const logDir = path.dirname(logFile);

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getFormatedDate = (): string => {
  const currentDate = new Date();
  return (
    currentDate.toLocaleTimeString() +
    ", " +
    currentDate.getDate() +
    "." +
    (currentDate.getMonth() + 1) +
    "." +
    currentDate.getFullYear()
  );
};

const logger = ({ status, message }: LoggerProps): void => {
  const formattedDate = getFormatedDate();
  const logMessage = `[${formattedDate}] [${status}]: ${message}`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage + "\n");
}

export default logger;