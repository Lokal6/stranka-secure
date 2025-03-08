#!/bin/bash

echo "==================================="
echo "API Key Setup Script - Linux/Mac"
echo "==================================="
echo ""
echo "Tento skript spustí nastavenie API kľúčov pre vašu aplikáciu."
echo ""

# Kontrola, či je Node.js nainštalovaný
if ! command -v node &> /dev/null; then
  echo "[CHYBA] Node.js nie je nainštalovaný."
  echo "Prosím, nainštalujte Node.js z https://nodejs.org/"
  echo ""
  exit 1
fi

# Nastavenie práv na spustenie pre hlavný skript
chmod +x setup-api-keys.js

# Spustenie Node.js skriptu
echo "Spúšťam nastavenie API kľúčov..."
echo ""
node setup-api-keys.js

if [ $? -ne 0 ]; then
  echo ""
  echo "[CHYBA] Nastala chyba pri nastavovaní API kľúčov."
  echo ""
  exit 1
fi

echo ""
echo "Nastavenie API kľúčov bolo úspešne dokončené!"
echo "" 