#!/usr/bin/env node

/**
 * API Key Export Script
 * 
 * Tento skript exportuje vaše API kľúče do samostatného priečinka,
 * ktorý si môžete uložiť na bezpečné miesto (napr. USB kľúč, šifrovaný disk).
 * 
 * Použitie:
 * 1. Spustite: node export-api-keys.js
 * 2. Zadajte cestu, kam chcete uložiť API kľúče
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Vytvorenie rozhrania pre čítanie vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definícia súborov, ktoré obsahujú API kľúče
const ENV_JS_PATH = path.join(__dirname, 'allin', '.env.js');

// Objekt pre uloženie API kľúčov
const apiKeys = {
  FIREBASE: {
    API_KEY: '',
    AUTH_DOMAIN: '',
    PROJECT_ID: '',
    STORAGE_BUCKET: '',
    MESSAGING_SENDER_ID: '',
    APP_ID: '',
    MEASUREMENT_ID: ''
  },
  YOUTUBE_API_KEY: '',
  RAPID_API_KEY: '',
  GOOGLE_SIGNIN_CLIENT_ID: ''
};

// Funkcia pre načítanie API kľúčov z .env.js
function loadApiKeysFromEnvJs() {
  if (!fs.existsSync(ENV_JS_PATH)) {
    console.error(`❌ Súbor ${ENV_JS_PATH} nebol nájdený.`);
    console.log('Najprv musíte vytvoriť .env.js súbor pomocou setup-api-keys.js');
    return false;
  }

  try {
    // Načítanie obsahu .env.js
    const envJsContent = fs.readFileSync(ENV_JS_PATH, 'utf8');
    
    // Extrakcia Firebase API kľúčov pomocou regulárnych výrazov
    const firebaseApiKeyMatch = envJsContent.match(/API_KEY:\s*"([^"]*)"/);
    const firebaseAuthDomainMatch = envJsContent.match(/AUTH_DOMAIN:\s*"([^"]*)"/);
    const firebaseProjectIdMatch = envJsContent.match(/PROJECT_ID:\s*"([^"]*)"/);
    const firebaseStorageBucketMatch = envJsContent.match(/STORAGE_BUCKET:\s*"([^"]*)"/);
    const firebaseMessagingSenderIdMatch = envJsContent.match(/MESSAGING_SENDER_ID:\s*"([^"]*)"/);
    const firebaseAppIdMatch = envJsContent.match(/APP_ID:\s*"([^"]*)"/);
    const firebaseMeasurementIdMatch = envJsContent.match(/MEASUREMENT_ID:\s*"([^"]*)"/);
    
    // Extrakcia YouTube a RapidAPI kľúčov
    const youtubeApiKeyMatch = envJsContent.match(/YOUTUBE_API_KEY:\s*"([^"]*)"/);
    const rapidApiKeyMatch = envJsContent.match(/RAPID_API_KEY:\s*"([^"]*)"/);
    
    // Uloženie hodnôt do objektu
    if (firebaseApiKeyMatch) apiKeys.FIREBASE.API_KEY = firebaseApiKeyMatch[1];
    if (firebaseAuthDomainMatch) apiKeys.FIREBASE.AUTH_DOMAIN = firebaseAuthDomainMatch[1];
    if (firebaseProjectIdMatch) apiKeys.FIREBASE.PROJECT_ID = firebaseProjectIdMatch[1];
    if (firebaseStorageBucketMatch) apiKeys.FIREBASE.STORAGE_BUCKET = firebaseStorageBucketMatch[1];
    if (firebaseMessagingSenderIdMatch) apiKeys.FIREBASE.MESSAGING_SENDER_ID = firebaseMessagingSenderIdMatch[1];
    if (firebaseAppIdMatch) apiKeys.FIREBASE.APP_ID = firebaseAppIdMatch[1];
    if (firebaseMeasurementIdMatch) apiKeys.FIREBASE.MEASUREMENT_ID = firebaseMeasurementIdMatch[1];
    if (youtubeApiKeyMatch) apiKeys.YOUTUBE_API_KEY = youtubeApiKeyMatch[1];
    if (rapidApiKeyMatch) apiKeys.RAPID_API_KEY = rapidApiKeyMatch[1];
    
    // Načítanie Google Sign-In client ID z index.html
    const indexHtmlPath = path.join(__dirname, 'allin', 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
      const googleSignInClientIdMatch = indexHtmlContent.match(/<meta name="google-signin-client_id" content="([^"]*)"/);
      if (googleSignInClientIdMatch) {
        apiKeys.GOOGLE_SIGNIN_CLIENT_ID = googleSignInClientIdMatch[1];
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Chyba pri načítaní API kľúčov:', error.message);
    return false;
  }
}

// Funkcia pre export API kľúčov do súboru
function exportApiKeys(exportPath) {
  try {
    // Vytvorenie priečinka, ak neexistuje
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath, { recursive: true });
    }
    
    // Vytvorenie JSON súboru s API kľúčmi
    const apiKeysJsonPath = path.join(exportPath, 'api-keys.json');
    fs.writeFileSync(apiKeysJsonPath, JSON.stringify(apiKeys, null, 2));
    
    // Vytvorenie JavaScript súboru pre jednoduchšie importovanie
    const apiKeysJsPath = path.join(exportPath, 'api-keys.js');
    const apiKeysJsContent = `// API kľúče exportované ${new Date().toLocaleString()}
// TENTO SÚBOR OBSAHUJE CITLIVÉ ÚDAJE - UCHOVÁVAJTE HO NA BEZPEČNOM MIESTE!

const API_KEYS = ${JSON.stringify(apiKeys, null, 2)};

module.exports = API_KEYS;
`;
    fs.writeFileSync(apiKeysJsPath, apiKeysJsContent);
    
    // Vytvorenie .env súboru pre iné projekty
    const envFilePath = path.join(exportPath, '.env');
    const envFileContent = `# API kľúče exportované ${new Date().toLocaleString()}
# TENTO SÚBOR OBSAHUJE CITLIVÉ ÚDAJE - UCHOVÁVAJTE HO NA BEZPEČNOM MIESTE!

FIREBASE_API_KEY=${apiKeys.FIREBASE.API_KEY}
FIREBASE_AUTH_DOMAIN=${apiKeys.FIREBASE.AUTH_DOMAIN}
FIREBASE_PROJECT_ID=${apiKeys.FIREBASE.PROJECT_ID}
FIREBASE_STORAGE_BUCKET=${apiKeys.FIREBASE.STORAGE_BUCKET}
FIREBASE_MESSAGING_SENDER_ID=${apiKeys.FIREBASE.MESSAGING_SENDER_ID}
FIREBASE_APP_ID=${apiKeys.FIREBASE.APP_ID}
FIREBASE_MEASUREMENT_ID=${apiKeys.FIREBASE.MEASUREMENT_ID}
YOUTUBE_API_KEY=${apiKeys.YOUTUBE_API_KEY}
RAPID_API_KEY=${apiKeys.RAPID_API_KEY}
GOOGLE_SIGNIN_CLIENT_ID=${apiKeys.GOOGLE_SIGNIN_CLIENT_ID}
`;
    fs.writeFileSync(envFilePath, envFileContent);
    
    // Vytvorenie README súboru s inštrukciami
    const readmePath = path.join(exportPath, 'README.md');
    const readmeContent = `# Exportované API kľúče

Tento priečinok obsahuje exportované API kľúče pre váš projekt. Uchovávajte tieto súbory na bezpečnom mieste!

## Obsah priečinka

- **api-keys.json** - API kľúče vo formáte JSON
- **api-keys.js** - API kľúče ako JavaScript modul
- **.env** - API kľúče vo formáte .env súboru
- **import-api-keys.js** - Skript pre import API kľúčov späť do projektu

## Bezpečnostné odporúčania

1. **Nikdy nezdieľajte** tieto súbory s nikým
2. **Neuchovávajte** tieto súbory v cloudových službách bez šifrovania
3. **Pravidelne zálohujte** tieto súbory na bezpečné miesto
4. **Pravidelne regenerujte** vaše API kľúče pre zvýšenie bezpečnosti

## Ako importovať API kľúče späť do projektu

1. Skopírujte súbor \`import-api-keys.js\` do koreňového adresára vášho projektu
2. Spustite: \`node import-api-keys.js\`
3. Zadajte cestu k tomuto priečinku s API kľúčmi
`;
    fs.writeFileSync(readmePath, readmeContent);
    
    // Vytvorenie import skriptu
    const importScriptPath = path.join(exportPath, 'import-api-keys.js');
    const importScriptContent = `#!/usr/bin/env node

/**
 * API Key Import Script
 * 
 * Tento skript importuje vaše API kľúče z bezpečného úložiska späť do projektu.
 * 
 * Použitie:
 * 1. Skopírujte tento súbor do koreňového adresára vášho projektu
 * 2. Spustite: node import-api-keys.js
 * 3. Zadajte cestu k priečinku s API kľúčmi
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Vytvorenie rozhrania pre čítanie vstupu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hlavná funkcia
async function main() {
  console.log('🔑 API Key Import Script');
  
  // Získanie cesty k priečinku s API kľúčmi
  const keysPath = await new Promise((resolve) => {
    rl.question('Zadajte cestu k priečinku s API kľúčmi: ', (answer) => {
      resolve(answer.trim());
    });
  });
  
  // Kontrola existencie priečinka
  if (!fs.existsSync(keysPath)) {
    console.error(\`❌ Priečinok \${keysPath} nebol nájdený.\`);
    rl.close();
    return;
  }
  
  // Načítanie API kľúčov
  const apiKeysJsonPath = path.join(keysPath, 'api-keys.json');
  if (!fs.existsSync(apiKeysJsonPath)) {
    console.error(\`❌ Súbor \${apiKeysJsonPath} nebol nájdený.\`);
    rl.close();
    return;
  }
  
  try {
    // Načítanie API kľúčov z JSON súboru
    const apiKeysJson = fs.readFileSync(apiKeysJsonPath, 'utf8');
    const apiKeys = JSON.parse(apiKeysJson);
    
    // Vytvorenie .env.js súboru
    const envJsPath = path.join(__dirname, 'allin', '.env.js');
    const envJsContent = \`// Environment variables for API keys
// This file should not be committed to Git

// API keys for the application
window.ENV = {
  // Firebase configuration
  FIREBASE: {
    API_KEY: "\${apiKeys.FIREBASE.API_KEY}",
    AUTH_DOMAIN: "\${apiKeys.FIREBASE.AUTH_DOMAIN}",
    PROJECT_ID: "\${apiKeys.FIREBASE.PROJECT_ID}",
    STORAGE_BUCKET: "\${apiKeys.FIREBASE.STORAGE_BUCKET}",
    MESSAGING_SENDER_ID: "\${apiKeys.FIREBASE.MESSAGING_SENDER_ID}",
    APP_ID: "\${apiKeys.FIREBASE.APP_ID}",
    MEASUREMENT_ID: "\${apiKeys.FIREBASE.MEASUREMENT_ID}"
  },
  
  // YouTube API
  YOUTUBE_API_KEY: "\${apiKeys.YOUTUBE_API_KEY}",
  
  // RapidAPI
  RAPID_API_KEY: "\${apiKeys.RAPID_API_KEY}"
};

console.log("Environment variables loaded");\`;
    
    // Vytvorenie priečinka, ak neexistuje
    const envJsDir = path.dirname(envJsPath);
    if (!fs.existsSync(envJsDir)) {
      fs.mkdirSync(envJsDir, { recursive: true });
    }
    
    // Zápis do súboru
    fs.writeFileSync(envJsPath, envJsContent);
    console.log(\`✅ Súbor .env.js bol úspešne vytvorený v \${envJsPath}\`);
    
    // Aktualizácia Google Sign-In client ID v index.html
    if (apiKeys.GOOGLE_SIGNIN_CLIENT_ID) {
      const indexHtmlPath = path.join(__dirname, 'allin', 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
        
        // Nahradenie placeholder hodnoty skutočným client ID
        indexHtmlContent = indexHtmlContent.replace(
          /<meta name="google-signin-client_id" content="[^"]*">/,
          \`<meta name="google-signin-client_id" content="\${apiKeys.GOOGLE_SIGNIN_CLIENT_ID}">\`
        );
        
        fs.writeFileSync(indexHtmlPath, indexHtmlContent);
        console.log(\`✅ Google Sign-In client ID bol aktualizovaný v \${indexHtmlPath}\`);
      }
    }
    
    console.log('\\n✅ Import API kľúčov bol úspešne dokončený!');
  } catch (error) {
    console.error('❌ Chyba pri importe API kľúčov:', error.message);
  }
  
  rl.close();
}

// Spustenie hlavnej funkcie
main().catch(error => {
  console.error('❌ Nastala chyba:', error);
  process.exit(1);
});
`;
    fs.writeFileSync(importScriptPath, importScriptContent);
    
    console.log(`✅ API kľúče boli úspešne exportované do priečinka: ${exportPath}`);
    console.log('📁 Vytvorené súbory:');
    console.log(`   - ${apiKeysJsonPath} (JSON formát)`);
    console.log(`   - ${apiKeysJsPath} (JavaScript modul)`);
    console.log(`   - ${envFilePath} (.env formát)`);
    console.log(`   - ${readmePath} (inštrukcie)`);
    console.log(`   - ${importScriptPath} (import skript)`);
    
    return true;
  } catch (error) {
    console.error('❌ Chyba pri exporte API kľúčov:', error.message);
    return false;
  }
}

// Hlavná funkcia
async function main() {
  console.log('🔑 API Key Export Script');
  
  // Načítanie API kľúčov z .env.js
  if (!loadApiKeysFromEnvJs()) {
    rl.close();
    return;
  }
  
  // Získanie cesty pre export
  const exportPath = await new Promise((resolve) => {
    rl.question('Zadajte cestu, kam chcete exportovať API kľúče (napr. D:\\ApiKeys\\SoloLeveling): ', (answer) => {
      resolve(answer.trim());
    });
  });
  
  // Export API kľúčov
  exportApiKeys(exportPath);
  
  rl.close();
}

// Spustenie hlavnej funkcie
main().catch(error => {
  console.error('❌ Nastala chyba:', error);
  process.exit(1);
}); 