// On importe la structure
const AaronBot = require("./structure/aaron.js");
const Aaron = require("./structure/aaron.js");

const client = new AaronBot({
    partials: ["MESSAGE", "USER", "REACTION", "GUILD_MEMBER"]   
});

client.init();