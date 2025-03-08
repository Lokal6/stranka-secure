@echo off
echo ===================================
echo API Key Setup Script - Windows
echo ===================================
echo.
echo Tento skript spustí nastavenie API kľúčov pre vašu aplikáciu.
echo.

REM Kontrola, či je Node.js nainštalovaný
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [CHYBA] Node.js nie je nainštalovaný alebo nie je v PATH.
  echo Prosím, nainštalujte Node.js z https://nodejs.org/
  echo.
  pause
  exit /b 1
)

REM Spustenie Node.js skriptu
echo Spúšťam nastavenie API kľúčov...
echo.
node setup-api-keys.js

if %ERRORLEVEL% neq 0 (
  echo.
  echo [CHYBA] Nastala chyba pri nastavovaní API kľúčov.
  echo.
  pause
  exit /b 1
)

echo.
echo Nastavenie API kľúčov bolo úspešne dokončené!
echo.
pause 