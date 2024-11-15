const readline = require('readline');

// Hilfsfunktion zur Eingabeaufforderung
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Sprach- und Geräteeinstellungen basierend auf der Auswahl des Benutzers
const languageOptions = {
  1: {
    WELCOME_MSG: "Willkommen zum Root-Tool.",
    CHOOSE_DEVICE_MSG: "Wähle dein Gerät aus:",
    SAMSUNG_OPTION: "Samsung-Geräte nutzen oft Odin und spezifische CF-Root-Dateien.",
    HUAWEI_OPTION: "Huawei-Geräte benötigen entsperrten Bootloader und spezielle Methoden wie DC-Unlocker.",
    PIXEL_OPTION: "Google Pixel unterstützt Fastboot-Methoden; Magisk kann verwendet werden.",
    FIRE_OPTION: "Amazon Fire erfordert spezielle FireOS-Exploits, meist über Fastboot oder ADB.",
    ROOT_CONFIRMATION: "Bist du sicher, dass du fortfahren willst? (j/n): "
  },
  2: {
    WELCOME_MSG: "Welcome to the Root Tool.",
    CHOOSE_DEVICE_MSG: "Select your device:",
    SAMSUNG_OPTION: "Samsung devices often use Odin with specific CF-Root files.",
    HUAWEI_OPTION: "Huawei devices need an unlocked bootloader and specific tools like DC-Unlocker.",
    PIXEL_OPTION: "Google Pixel supports Fastboot methods; Magisk can be used.",
    FIRE_OPTION: "Amazon Fire requires specific FireOS exploits, typically through Fastboot or ADB.",
    ROOT_CONFIRMATION: "Are you sure you want to proceed? (y/n): "
  },
  3: {
    WELCOME_MSG: "रूट टूल में आपका स्वागत है।",
    CHOOSE_DEVICE_MSG: "अपना डिवाइस चुनें:",
    SAMSUNG_OPTION: "Samsung डिवाइस में अक्सर Odin और CF-Root फाइलें प्रयोग की जाती हैं।",
    HUAWEI_OPTION: "Huawei डिवाइस में अनलॉक बूटलोडर और DC-Unlocker जैसे टूल्स की आवश्यकता होती है।",
    PIXEL_OPTION: "Google Pixel में Fastboot की सहायता ली जा सकती है; Magisk का उपयोग किया जा सकता है।",
    FIRE_OPTION: "Amazon Fire में विशेष FireOS exploits की आवश्यकता होती है, आमतौर पर Fastboot या ADB से।",
    ROOT_CONFIRMATION: "क्या आप आगे बढ़ना चाहते हैं? (हां/नहीं): "
  }
};

// Hauptfunktion
const main = async () => {
  // Sprachauswahl
  console.log("Wähle deine Sprache / Select your language / अपनी भाषा चुनें:");
  console.log("1) Deutsch");
  console.log("2) English");
  console.log("3) हिंदी");

  const lang = await ask("Eingabe / Input / दर्ज करें: ");
  const selectedLanguage = languageOptions[lang];

  if (!selectedLanguage) {
    console.log("Ungültige Auswahl / Invalid selection / अमान्य चयन");
    rl.close();
    return;
  }

  // Begrüßungsnachricht und Geräteauswahl
  console.log(selectedLanguage.WELCOME_MSG);
  console.log(selectedLanguage.CHOOSE_DEVICE_MSG);
  console.log("1) Samsung");
  console.log("2) Huawei");
  console.log("3) Google Pixel");
  console.log("4) Amazon Fire");

  const device = await ask("Eingabe / Input / दर्ज करें: ");

  // Gerätespezifische Root-Optionen anzeigen
  switch (device) {
    case '1':
      console.log(selectedLanguage.SAMSUNG_OPTION);
      console.log("1. Odin herunterladen: Odin ist für Windows verfügbar und wird benötigt, um CF-Root oder ähnliche Dateien zu flashen.");
      console.log("2. Verbinde das Gerät und führe 'heimdall flash --RECOVERY recovery.img' oder einen passenden Befehl aus.");
      break;
    case '2':
      console.log(selectedLanguage.HUAWEI_OPTION);
      console.log("1. Entsperre den Bootloader mit einem Code von Huawei oder Tools wie DC-Unlocker.");
      console.log("2. Verwende spezielle Tools wie KingRoot (mit Vorsicht).");
      break;
    case '3':
      console.log(selectedLanguage.PIXEL_OPTION);
      console.log("1. Entsperre den Bootloader mit 'fastboot flashing unlock'.");
      console.log("2. Flashe das gepatchte Boot-Image mit 'fastboot flash boot magisk_patched.img'.");
      break;
    case '4':
      console.log(selectedLanguage.FIRE_OPTION);
      console.log("1. Setze das Gerät in den Fastboot-Modus (häufig mit speziellen Tastenkombinationen).");
      console.log("2. Verwende 'adb' und 'fastboot', um Root-Dateien zu übertragen und zu flashen.");
      break;
    default:
      console.log("Ungültige Auswahl / Invalid selection / अमान्य चयन");
      rl.close();
      return;
  }

  // Bestätigung für Root-Vorgang
  const confirmation = await ask(selectedLanguage.ROOT_CONFIRMATION);
  if (confirmation.toLowerCase() === 'j' || confirmation.toLowerCase() === 'y' || confirmation.toLowerCase() === 'हां') {
    console.log("Rooting wird eingeleitet... (dies ist nur ein Beispiel und führt kein echtes Rooting durch)");
  } else {
    console.log("Vorgang abgebrochen.");
  }

  // Hinweis
  console.log("Hinweis: Dies ist nur ein Informations-Skript und rootet das Gerät nicht tatsächlich. Rooting muss spezifisch je nach Gerät und Betriebssystem durchgeführt werden.");

  rl.close();
};

// Eingabeaufforderung für Benutzerabfragen
function ask(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Skript starten
main();
