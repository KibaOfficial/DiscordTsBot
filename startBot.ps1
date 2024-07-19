# Copyright (c) 2024 KibaOfficial
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

$environment = $args[0]

if (-not $environment) {
    Write-Error "Kein Argument übergeben. Syntax: ./startBot.ps1 dev/prod"
    exit 1
}

if ($environment -eq "dev") {
    Start-Process -FilePath "npm" -ArgumentList "run", "dev"
} elseif ($environment -eq "prod") {
    Start-Process -FilePath "npm" -ArgumentList "run", "build"
    Start-Process -FilePath "npm" -ArgumentList "run", "start"
} else {
    Write-Error "Ungültiges Argument. Syntax: ./startBot.ps1 dev/prod"
}
