// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { LoggerProps } from "../types";

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

const logger = ({ status, message}: LoggerProps): void => {
  const formattedDate = getFormatedDate();
  console.log(`[${formattedDate}] [${status}]: ${message}`);
}

export default logger;