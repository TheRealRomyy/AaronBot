const chalk = require("chalk");

module.exports = class Ready {

    constructor(client) {
        this.client = client;
    }

    async run() {
        
        console.log(chalk.green(this.client.user.tag + " is ready ! \nOn " + chalk.bold(this.client.guilds.cache.size) + " guilds"));
        this.client.logger.log("separator");
    };
};