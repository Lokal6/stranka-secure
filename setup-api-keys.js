#!/usr/bin/env node

/**
 * API Key Setup Script
 * 
 * Tento skript automaticky doplní vaše API kľúče do príslušných súborov
 * po stiahnutí repozitára na nové zariadenie.
 * 
 * Použitie:
 * 1. Uložte tento súbor do koreňového adresára projektu
 * 2. Spustite: node setup-api-keys.js
 * 3. Zadajte vaše API kľúče podľa výzvy
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Vytvorenie rozhrania pre čítanie vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definícia súborov, ktoré potrebujú API kľúče
const ENV_JS_PATH = path.join(__dirname, 'allin', '.env.js');
const ENV_JS_EXAMPLE_PATH = path.join(__dirname, 'allin', '.env.js.example');
const FIREBASE_CONFIG_PATH = path.join(__dirname, 'allin', 'firebase-config-v2.js');

// Objekt pre uloženie API kľúčov
const apiKeys = {
  FIREBASE_API_KEY: '',
  FIREBASE_AUTH_DOMAIN: '',
  FIREBASE_PROJECT_ID: '',
  FIREBASE_STORAGE_BUCKET: '',
  FIREBASE_MESSAGING_SENDER_ID: '',
  FIREBASE_APP_ID: '',
  FIREBASE_MEASUREMENT_ID: '',
  YOUTUBE_API_KEY: '',
  RAPID_API_KEY: ''
};

// Funkcia pre získanie API kľúčov od používateľa
function promptForApiKeys() {
  return new Promise((resolve) => {
    console.log('\n=== Nastavenie API kľúčov ===');
    console.log('Zadajte vaše API kľúče pre správne fungovanie aplikácie.\n');

    // Firebase kľúče
    rl.question('Firebase API Key: ', (answer) => {
      apiKeys.FIREBASE_API_KEY = answer;
      
      rl.question('Firebase Auth Domain (napr. projekt-id.firebaseapp.com): ', (answer) => {
        apiKeys.FIREBASE_AUTH_DOMAIN = answer;
        
        rl.question('Firebase Project ID: ', (answer) => {
          apiKeys.FIREBASE_PROJECT_ID = answer;
          
          rl.question('Firebase Storage Bucket (napr. projekt-id.appspot.com): ', (answer) => {
            apiKeys.FIREBASE_STORAGE_BUCKET = answer;
            
            rl.question('Firebase Messaging Sender ID: ', (answer) => {
              apiKeys.FIREBASE_MESSAGING_SENDER_ID = answer;
              
              rl.question('Firebase App ID: ', (answer) => {
                apiKeys.FIREBASE_APP_ID = answer;
                
                rl.question('Firebase Measurement ID (napr. G-XXXXXXXX): ', (answer) => {
                  apiKeys.FIREBASE_MEASUREMENT_ID = answer;
                  
                  // YouTube API kľúč
                  rl.question('YouTube API Key: ', (answer) => {
                    apiKeys.YOUTUBE_API_KEY = answer;
                    
                    // RapidAPI kľúč
                    rl.question('RapidAPI Key: ', (answer) => {
                      apiKeys.RAPID_API_KEY = answer;
                      rl.close();
                      resolve();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// Funkcia pre vytvorenie .env.js súboru
function createEnvJsFile() {
  const envJsContent = `// Environment variables for API keys
// This file should not be committed to Git

// API keys for the application
window.ENV = {
  // Firebase configuration
  FIREBASE: {
    API_KEY: "${apiKeys.FIREBASE_API_KEY}",
    AUTH_DOMAIN: "${apiKeys.FIREBASE_AUTH_DOMAIN}",
    PROJECT_ID: "${apiKeys.FIREBASE_PROJECT_ID}",
    STORAGE_BUCKET: "${apiKeys.FIREBASE_STORAGE_BUCKET}",
    MESSAGING_SENDER_ID: "${apiKeys.FIREBASE_MESSAGING_SENDER_ID}",
    APP_ID: "${apiKeys.FIREBASE_APP_ID}",
    MEASUREMENT_ID: "${apiKeys.FIREBASE_MEASUREMENT_ID}"
  },
  
  // YouTube API
  YOUTUBE_API_KEY: "${apiKeys.YOUTUBE_API_KEY}",
  
  // RapidAPI
  RAPID_API_KEY: "${apiKeys.RAPID_API_KEY}"
};

console.log("Environment variables loaded");`;

  fs.writeFileSync(ENV_JS_PATH, envJsContent);
  console.log(`✅ Súbor .env.js bol úspešne vytvorený v ${ENV_JS_PATH}`);
}

// Funkcia pre kontrolu existencie potrebných súborov
function checkRequiredFiles() {
  // Kontrola .env.js.example
  if (!fs.existsSync(ENV_JS_EXAMPLE_PATH)) {
    console.error(`❌ Chyba: Súbor ${ENV_JS_EXAMPLE_PATH} nebol nájdený.`);
    return false;
  }
  
  // Kontrola firebase-config-v2.js
  if (!fs.existsSync(FIREBASE_CONFIG_PATH)) {
    console.error(`❌ Chyba: Súbor ${FIREBASE_CONFIG_PATH} nebol nájdený.`);
    return false;
  }
  
  return true;
}

// Funkcia pre vytvorenie Google Sign-In client ID v index.html
function updateGoogleSignInClientId() {
  const indexHtmlPath = path.join(__dirname, 'allin', 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ Chyba: Súbor ${indexHtmlPath} nebol nájdený.`);
    return;
  }
  
  let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Vytvorenie Google Sign-In client ID z Firebase Messaging Sender ID
  const clientId = `${apiKeys.FIREBASE_MESSAGING_SENDER_ID}-someclientid.apps.googleusercontent.com`;
  
  // Nahradenie placeholder hodnoty skutočným client ID
  indexHtmlContent = indexHtmlContent.replace(
    /<meta name="google-signin-client_id" content="[^"]*">/,
    `<meta name="google-signin-client_id" content="${clientId}">`
  );
  
  fs.writeFileSync(indexHtmlPath, indexHtmlContent);
  console.log(`✅ Google Sign-In client ID bol aktualizovaný v ${indexHtmlPath}`);
}

// Hlavná funkcia
async function main() {
  console.log('🔑 API Key Setup Script');
  
  // Kontrola existencie potrebných súborov
  if (!checkRequiredFiles()) {
    console.error('❌ Skript bol ukončený kvôli chýbajúcim súborom.');
    process.exit(1);
  }
  
  // Získanie API kľúčov od používateľa
  await promptForApiKeys();
  
  // Vytvorenie .env.js súboru
  createEnvJsFile();
  
  // Aktualizácia Google Sign-In client ID
  updateGoogleSignInClientId();
  
  console.log('\n✅ Nastavenie API kľúčov bolo úspešne dokončené!');
  console.log('🚀 Teraz môžete spustiť aplikáciu.');
}

// Spustenie hlavnej funkcie
main().catch(error => {
  console.error('❌ Nastala chyba:', error);
  process.exit(1);
}); 