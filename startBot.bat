rem Copyright (c) 2024 KibaOfficial
rem 
rem This software is released under the MIT License.
rem https://opensource.org/licenses/MIT

@echo off
setlocal

rem Überprüfen, ob ein Argument übergeben wurde
if "%~1"=="" (
  echo Kein Argument übergeben. Syntax: startBot.bat dev/prod
  exit /b 1
)

set "environment=%~1"

if "%environment%"=="dev" (
  npm run dev
) else if "%environment%"=="prod" (
  npm run build
  npm run start
) else (
  echo Ungueltiges Argument. Syntax: startBot.bat dev/prod
  exit /b 1
)

endlocal
