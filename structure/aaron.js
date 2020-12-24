const { Client, Collection } = require("discord.js");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");

const readdir = util.promisify(fs.readdir);

class AaronBot extends Client {

    constructor(option) {
        super(option);

        this.cfg = require("../config.js");
        this.logger = require("../helpers/logger.js");
        this.permLevel = require("../helpers/permissions.js");
        this.translate = require("../helpers/language.js");
        this.emotes = require("../emojis.json");

        this.cmds = new Collection();
        this.aliases = new Collection();
    };  

    async init() {

        // Separator
        await this.logger.log("separator");

        // Extenders
        require("../helpers/extenders.js");

        // Commands
        const cmdFile = await readdir("./commands/");
        await cmdFile.forEach(async (dir) => {
            const commands = await readdir("./commands/" + dir + "/");
            commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
                this.loadCommand("./commands/" + dir, cmd);
            });
        });
        
        // Events
        const evtFile = await readdir("./events/");
        await this.logger.log("separator");
        await evtFile.forEach((file) => {
            const eventName = file.split(".")[0];
            const event = new (require(`../events/${file}`))(this);
            this.logger.log("event", eventName)
            this.on(eventName, (...args) => event.run(...args));
            delete require.cache[require.resolve(`../events/${file}`)];
        }); 

        // Separator
        await this.logger.log("separator");

        // Connection
        this.login(this.cfg.token);
    };

    async loadCommand(commandPath, commandName) {
		try {
			const props = new(require(`.${commandPath}/${commandName}`))(this);
			this.logger.log("command", commandName)
			this.cmds.set(props.help.name, props);
			props.help.aliases.forEach((alias) => {
				this.aliases.set(alias, props.help.name);
			});
		} catch (error) {
			return console.log((chalk.red`Command: '${chalk.bold(commandName)}' can't be load: ${error}`));
		};
    };
    
    async getPermLevel(message) {
        return this.permLevel.check(message.guild, message.author.id, this.cfg);
    };
};

module.exports = AaronBot;