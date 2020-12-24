const Command = require("../../structure/commands.js");

module.exports = class Eval extends Command {

    constructor(client) {
        super(client, {
            name: "eval",
            aliases: [],
            enabled: true,
            userPerms: [],
            permLevel: 6
        });
    };

    async run(message, args) {

        const content = args.join(" ");

        const result = new Promise((resolve, reject) => resolve(eval(content)));
        return result.then((output) => {

        if(typeof output !== "string") output = require("util").inspect(output, { depth: 0 });
        if(output.includes(message.client.token)) output = output.replace(message.client.token, "Enculé va");
        
        message.channel.send(output, {
            code: "js"
        })}).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)) err = err.replace(message.client.token, "Enculé va");
            message.channel.send(err, {
                code: "js"
            });
        });
    };
};