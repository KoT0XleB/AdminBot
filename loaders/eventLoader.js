const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, '../events');

console.log('Loading events...');

module.exports = (client) => {
    const eventFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(foldersPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
};