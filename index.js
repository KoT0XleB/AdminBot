const fs = require('node:fs');
const path = require('node:path');
const appdataPath = require('appdata-path');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Loading configs
// Creating a new config %AppData%/discordbot/config.json
const configPath = loadConfig('config.json', './configs/config.json', 'discordbot');
const config = require(configPath);

// Creating a new config %AppData%/discordbot/translation.json
const transPath = loadConfig('translation.json', './configs/translation.json', 'discordbot');
const translation = require(transPath);

// Check that the token is specified in the config
if (!(config.token === 'your-token-goes-here')) {
    client.login(config.token);
}
else {
    console.error(`Error: Token is not defined in ${configPath}`);
    process.exit(1);
}

const loadersDir = path.join(__dirname, 'loaders');
// Wait until the configs are loaded, after which we load all the files
setTimeout(() => {
    const loaderFiles = fs.readdirSync(loadersDir).filter(file => file.endsWith('.js'));
    for (const file of loaderFiles) {
        const loader = require(path.join(loadersDir, file));
        if (typeof loader === 'function') {
            loader(client);
        } 
        else {
            console.error(`Error: Loader in file ${file} is not a function.`);
        }
    }
}, 3000);

function loadConfig(filename, defaultPath, folder) {
    // Creating a new foldier %AppData%/discordbot
    const folderPath = appdataPath(folder);
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log('New folder has been created:', folderPath);
        }
    }
    catch (error) {
        console.error(`Error reading folder ${folderPath}:`, error);
    }

    // Creating a new file %AppData%/discordbot/file.json
    const filePath = path.join(folderPath, filename);
    try {
        if (!fs.existsSync(filePath)) {
            fs.copyFileSync(defaultPath, filePath);
            console.log('New config has been created:', filePath);
        }
    }
    catch (error) {
        console.error('Error reading JSON file:', error);
    }

    return filePath;
}

module.exports = { config, translation };