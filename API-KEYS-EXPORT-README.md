# Export API kľúčov do bezpečného úložiska

Tento súbor obsahuje inštrukcie pre export vašich API kľúčov do samostatného priečinka, ktorý môžete uložiť na bezpečné miesto (napr. USB kľúč, šifrovaný disk, trezor).

## Prečo exportovať API kľúče?

- **Bezpečnosť**: Uchovávanie API kľúčov mimo repozitára znižuje riziko ich úniku
- **Záloha**: Máte zálohu vašich kľúčov v prípade straty alebo poškodenia pracovného prostredia
- **Prenosnosť**: Jednoducho prenesiete kľúče medzi zariadeniami bez nutnosti ich znovu generovať
- **Konzistencia**: Používate rovnaké kľúče na všetkých vašich zariadeniach

## Požiadavky

- [Node.js](https://nodejs.org/) (verzia 12 alebo novšia)
- Existujúci súbor `.env.js` s vašimi API kľúčmi

## Spôsoby exportu API kľúčov

Vyberte si jeden z nasledujúcich spôsobov exportu API kľúčov:

### Windows
1. Dvakrát kliknite na súbor `export-api-keys.bat`
2. Postupujte podľa pokynov na obrazovke a zadajte cestu, kam chcete exportovať API kľúče

### macOS / Linux
1. Otvorte terminál v adresári projektu
2. Spustite príkaz: `chmod +x export-api-keys.sh`
3. Spustite skript: `./export-api-keys.sh`
4. Postupujte podľa pokynov na obrazovke a zadajte cestu, kam chcete exportovať API kľúče

### Priame spustenie Node.js skriptu
1. Otvorte terminál v adresári projektu
2. Spustite príkaz: `node export-api-keys.js`
3. Postupujte podľa pokynov na obrazovke a zadajte cestu, kam chcete exportovať API kľúče

## Čo obsahuje exportovaný priečinok?

Exportovaný priečinok bude obsahovať nasledujúce súbory:

- **api-keys.json** - API kľúče vo formáte JSON
- **api-keys.js** - API kľúče ako JavaScript modul
- **.env** - API kľúče vo formáte .env súboru
- **import-api-keys.js** - Skript pre import API kľúčov späť do projektu
- **README.md** - Inštrukcie pre používanie exportovaných kľúčov

## Ako importovať API kľúče späť do projektu

Keď potrebujete importovať API kľúče späť do projektu (napr. na novom zariadení):

1. Skopírujte súbor `import-api-keys.js` z exportovaného priečinka do koreňového adresára vášho projektu
2. Spustite: `node import-api-keys.js`
3. Zadajte cestu k priečinku s exportovanými API kľúčmi
4. Skript automaticky vytvorí potrebné súbory s vašimi API kľúčmi

## Bezpečnostné odporúčania

- **Šifrujte** priečinok s API kľúčmi pomocou nástrojov ako VeraCrypt, BitLocker alebo FileVault
- **Uchovávajte** priečinok na fyzicky bezpečnom mieste (USB kľúč v trezore, šifrovaný disk)
- **Neuchovávajte** priečinok v cloudových službách bez dodatočného šifrovania
- **Pravidelne zálohujte** priečinok na viacero bezpečných miest
- **Pravidelne regenerujte** vaše API kľúče pre zvýšenie bezpečnosti

## Riešenie problémov

Ak sa vyskytnú problémy pri exporte API kľúčov:

1. Uistite sa, že máte nainštalovaný Node.js
2. Skontrolujte, či existuje súbor `.env.js` s vašimi API kľúčmi
3. Skontrolujte, či máte správne práva na zápis do cieľového priečinka
4. Skúste spustiť skript s administrátorskými právami

V prípade pretrvávajúcich problémov vytvorte issue v repozitári projektu. 