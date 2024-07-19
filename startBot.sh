#!/bin/bash
# Copyright (c) 2024 KibaOfficial
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

if [ -z "$1" ]; then
  echo "Kein Argument übergeben. Syntax: ./startBot.sh dev/prod"
  exit 1
fi

environment=$1

if [ "$environment" == "dev" ]; then
  npm run dev
elif [ "$environment" == "prod" ]; then
  npm run build
  npm run start
else
  echo "Ungültiges Argument. Syntax: ./startBot.sh dev/prod"
  exit 1
fi
