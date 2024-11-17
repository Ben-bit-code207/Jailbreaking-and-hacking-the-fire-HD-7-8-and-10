const readline = require('readline');
const { execSync, exec } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Automatische Installation der Abhängigkeiten
function installDependencies() {
    try {
        console.log("Installing required modules...");
        execSync('npm install tar unzipper', { stdio: 'inherit' });
        console.log("All required modules installed successfully.");
    } catch (error) {
        console.error("Error installing dependencies:", error);
        process.exit(1);
    }
}

// Abhängigkeiten installieren
installDependencies();

// Module laden
const { extract } = require('tar');
const unzipper = require('unzipper');

// Sprachoptionen
const languages = {
    en: {
        welcome: "Welcome to the ADB Installer!",
        downloadingADB: "Downloading ADB...",
        installingADB: "Installing ADB...",
        adbInstalled: "ADB has been successfully installed.",
        adbTestFailed: "ADB test failed:",
        adbTestSuccess: "ADB is working:",
    },
};

// ADB-Download-URLs
const ADB_URLS = {
    win: "https://dl.google.com/android/repository/platform-tools-latest-windows.zip",
    mac: "https://dl.google.com/android/repository/platform-tools-latest-darwin.zip",
    linux: "https://dl.google.com/android/repository/platform-tools-latest-linux.zip",
};

// Temporäres Verzeichnis
const TEMP_DIR = os.tmpdir();
const ADB_DIR = path.join(TEMP_DIR, "adb-tools");

// ADB herunterladen und installieren
async function installADB(lang) {
    console.log(languages[lang].downloadingADB);
    const platform = os.platform();
    const url = platform === "win32" ? ADB_URLS.win : platform === "darwin" ? ADB_URLS.mac : ADB_URLS.linux;

    const zipPath = path.join(TEMP_DIR, `adb-tools.zip`);
    const file = fs.createWriteStream(zipPath);

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => {
                file.close(async () => {
                    console.log(languages[lang].installingADB);
                    try {
                        if (platform === "win32" || platform === "darwin") {
                            await fs.createReadStream(zipPath)
                                .pipe(unzipper.Extract({ path: ADB_DIR }))
                                .promise();
                        } else {
                            await extract({ file: zipPath, cwd: ADB_DIR });
                        }
                        console.log(languages[lang].adbInstalled);

                        // ADB-Ordner nach der Installation löschen
                        fs.rmSync(ADB_DIR, { recursive: true, force: true });
                        console.log("ADB directory has been deleted successfully.");

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        }).on("error", (err) => {
            fs.unlinkSync(zipPath);
            reject(err);
        });
    });
}

// ADB-Befehl ausführen
function executeADBCommand(command, lang) {
    const adbPath = os.platform() === "win32"
        ? path.join(ADB_DIR, "platform-tools", "adb.exe")
        : path.join(ADB_DIR, "platform-tools", "adb");

    return new Promise((resolve, reject) => {
        exec(`${adbPath} ${command}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`${languages[lang].adbTestFailed} ${stderr}`);
                reject(stderr);
            } else {
                console.log(`${languages[lang].adbTestSuccess} ${stdout}`);
                resolve(stdout);
            }
        });
    });
}

// Hauptfunktion
async function main() {
    const lang = "en"; // Standard-Sprache ist Englisch
    console.log(languages[lang].welcome);

    // ADB installieren
    try {
        await installADB(lang);
    } catch (error) {
        console.error("Error installing ADB:", error);
        process.exit(1);
    }

    // Beispiel: ADB-Befehl ausführen
    try {
        await executeADBCommand("devices", lang);
    } catch (error) {
        console.error("Error during ADB test:", error);
    }
}

main();
