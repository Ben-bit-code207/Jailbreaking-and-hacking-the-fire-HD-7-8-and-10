const readline = require('readline');

// Sprachoptionen
const languages = {
    de: {
        welcome: "Willkommen zum Root-Tool.",
        chooseDevice: "Wähle dein Gerät aus:",
        chooseOS: "Wähle dein Betriebssystem aus:",
        samsungOption: "Samsung-Geräte nutzen oft Odin und spezifische CF-Root-Dateien.",
        huaweiOption: "Huawei-Geräte benötigen entsperrten Bootloader und spezielle Methoden wie DC-Unlocker.",
        pixelOption: "Google Pixel unterstützt Fastboot-Methoden; Magisk kann verwendet werden.",
        fireOption: "Amazon Fire erfordert spezielle FireOS-Exploits, meist über Fastboot oder ADB.",
        rootConfirmation: "Bist du sicher, dass du fortfahren willst? (j/n): ",
        abort: "Vorgang abgebrochen.",
        startRoot: "Rooting wird eingeleitet...",
        invalidSelection: "Ungültige Auswahl",
    },
    en: {
        welcome: "Welcome to the Root Tool.",
        chooseDevice: "Select your device:",
        chooseOS: "Select your operating system:",
        samsungOption: "Samsung devices often use Odin with specific CF-Root files.",
        huaweiOption: "Huawei devices need an unlocked bootloader and specific tools like DC-Unlocker.",
        pixelOption: "Google Pixel supports Fastboot methods; Magisk can be used.",
        fireOption: "Amazon Fire requires specific FireOS exploits, typically through Fastboot or ADB.",
        rootConfirmation: "Are you sure you want to proceed? (y/n): ",
        abort: "Operation aborted.",
        startRoot: "Rooting process starting...",
        invalidSelection: "Invalid selection",
    },
    hi: {
        welcome: "रूट टूल में आपका स्वागत है।",
        chooseDevice: "अपना डिवाइस चुनें:",
        chooseOS: "अपना ऑपरेटिंग सिस्टम चुनें:",
        samsungOption: "Samsung डिवाइस में अक्सर Odin और CF-Root फाइलें प्रयोग की जाती हैं।",
        huaweiOption: "Huawei डिवाइस में अनलॉक बूटलोडर और DC-Unlocker जैसे टूल्स की आवश्यकता होती है।",
        pixelOption: "Google Pixel में Fastboot की सहायता ली जा सकती है; Magisk का उपयोग किया जा सकता है।",
        fireOption: "Amazon Fire में विशेष FireOS exploits की आवश्यकता होती है, आमतौर पर Fastboot या ADB से।",
        rootConfirmation: "क्या आप आगे बढ़ना चाहते हैं? (हां/नहीं): ",
        abort: "प्रक्रिया रद्द कर दी गई।",
        startRoot: "रूटिंग प्रक्रिया शुरू हो रही है...",
        invalidSelection: "अमान्य चयन",
    },
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Funktion zur Sprachwahl
function chooseLanguage() {
    console.log("1) Deutsch");
    console.log("2) English");
    console.log("3) हिंदी");
    return new Promise((resolve) => {
        rl.question("Wähle deine Sprache / Select your language / अपनी भाषा चुनें: ", (lang) => {
            if (lang === "1") resolve("de");
            else if (lang === "2") resolve("en");
            else if (lang === "3") resolve("hi");
            else {
                console.log("Invalid selection");
                process.exit();
            }
        });
    });
}

// Funktion zur Geräteeingabe
function chooseDevice(lang) {
    console.log(languages[lang].chooseDevice);
    console.log("1) Samsung");
    console.log("2) Huawei");
    console.log("3) Google Pixel");
    console.log("4) Amazon Fire");
    return new Promise((resolve) => {
        rl.question("Enter your choice: ", (device) => {
            resolve(device);
        });
    });
}

// Funktion zur Betriebssystemeingabe
function chooseOS(lang) {
    console.log(languages[lang].chooseOS);
    console.log("1) Android 9 (Pie)");
    console.log("2) Android 10");
    console.log("3) Android 11");
    console.log("4) Fire OS 7");
    return new Promise((resolve) => {
        rl.question("Enter your choice: ", (os) => {
            resolve(os);
        });
    });
}

// Root-Optionen anzeigen
function displayRootOptions(lang, device, os) {
    switch (device) {
        case "1":
            console.log(languages[lang].samsungOption);
            console.log("OS: Android " + os);
            break;
        case "2":
            console.log(languages[lang].huaweiOption);
            console.log("OS: Android " + os);
            break;
        case "3":
            console.log(languages[lang].pixelOption);
            console.log("OS: Android " + os);
            break;
        case "4":
            console.log(languages[lang].fireOption);
            console.log("OS: Fire OS " + os);
            break;
        default:
            console.log(languages[lang].invalidSelection);
            process.exit();
    }
}

// Bestätigung abfragen
function confirmRoot(lang) {
    return new Promise((resolve) => {
        rl.question(languages[lang].rootConfirmation, (confirmation) => {
            if (confirmation.toLowerCase() === "j" || confirmation.toLowerCase() === "y" || confirmation === "हां") {
                resolve(true);
            } else {
                console.log(languages[lang].abort);
                process.exit();
            }
        });
    });
}

// Hauptfunktion
async function main() {
    const lang = await chooseLanguage();
    console.log(languages[lang].welcome);

    const device = await chooseDevice(lang);
    const os = await chooseOS(lang);

    displayRootOptions(lang, device, os);

    const proceed = await confirmRoot(lang);
    if (proceed) {
        console.log(languages[lang].startRoot);
    }

    rl.close();
}

main();
