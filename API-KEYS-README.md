# Nastavenie API kľúčov

Tento projekt vyžaduje niekoľko API kľúčov pre správne fungovanie. Pre zjednodušenie procesu nastavenia API kľúčov po stiahnutí repozitára na nové zariadenie sme pripravili automatizované skripty.

## Požiadavky

- [Node.js](https://nodejs.org/) (verzia 12 alebo novšia)

## Spôsoby nastavenia API kľúčov

Vyberte si jeden z nasledujúcich spôsobov nastavenia API kľúčov:

### 1. Automatické nastavenie pomocou skriptu

#### Windows
1. Dvakrát kliknite na súbor `setup-api-keys.bat`
2. Postupujte podľa pokynov na obrazovke a zadajte vaše API kľúče

#### macOS / Linux
1. Otvorte terminál v adresári projektu
2. Spustite príkaz: `chmod +x setup-api-keys.sh`
3. Spustite skript: `./setup-api-keys.sh`
4. Postupujte podľa pokynov na obrazovke a zadajte vaše API kľúče

#### Priame spustenie Node.js skriptu
1. Otvorte terminál v adresári projektu
2. Spustite príkaz: `node setup-api-keys.js`
3. Postupujte podľa pokynov na obrazovke a zadajte vaše API kľúče

### 2. Manuálne nastavenie

Ak preferujete manuálne nastavenie, postupujte takto:

1. Skopírujte súbor `allin/.env.js.example` a premenujte ho na `allin/.env.js`
2. Otvorte súbor `allin/.env.js` v textovom editore
3. Nahraďte zástupné hodnoty (YOUR_API_KEY, atď.) vašimi skutočnými API kľúčmi
4. Uložte súbor

## Potrebné API kľúče

Pre správne fungovanie aplikácie potrebujete nasledujúce API kľúče:

### Firebase
- **API Key**: Hlavný API kľúč pre Firebase
- **Auth Domain**: Autentifikačná doména (napr. projekt-id.firebaseapp.com)
- **Project ID**: ID vášho Firebase projektu
- **Storage Bucket**: Úložisko (napr. projekt-id.appspot.com)
- **Messaging Sender ID**: ID odosielateľa správ
- **App ID**: ID aplikácie
- **Measurement ID**: ID merania (napr. G-XXXXXXXX)

### YouTube
- **YouTube API Key**: API kľúč pre YouTube Data API v3

### RapidAPI
- **RapidAPI Key**: API kľúč pre RapidAPI služby

## Bezpečnostné odporúčania

- **Nikdy necommitujte** súbor `.env.js` do Git repozitára
- Pravidelne **regenerujte vaše API kľúče** pre zvýšenie bezpečnosti
- Nastavte **obmedzenia domén** pre vaše API kľúče v príslušných konzolách (Firebase, Google Cloud, RapidAPI)
- Používajte **rôzne API kľúče** pre vývojové a produkčné prostredie

## Riešenie problémov

Ak sa vyskytnú problémy pri nastavovaní API kľúčov:

1. Uistite sa, že máte nainštalovaný Node.js
2. Skontrolujte, či máte správne práva na spustenie skriptov
3. Skontrolujte, či sú všetky potrebné súbory v správnych adresároch
4. Skúste manuálne nastavenie API kľúčov podľa pokynov vyššie

V prípade pretrvávajúcich problémov vytvorte issue v repozitári projektu. 