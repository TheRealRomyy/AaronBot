const Command = require("../../structure/commands.js");
const { exec } = require("child_process");

module.exports = class Exec extends Command {

    constructor(client) {
        super(client, {
            name: "exec",
            aliases: [],
            enabled: true,
            userPerms: [],
            permLevel: 6
        })
    };

    async run(message, args) {

        const content = args.join(" ");

        if(!content) return message.error("NOT_CORRECT", {
            usage: ";exec <content>"
        });

	    exec(content, (error, data, getter) => {

            if(!data) return message.channel.send('>', {
                code: "none"
            });

            if(data.length >= 2000) return message.channel.send('> Must be 2000 or fewer in length.', {
                code: "none"
            });

            if(error) return message.channel.send(error, {
                code: "none"
            });
            
            if(getter) return message.channel.send(getter, {
                code: "none"
            });

            message.channel.send(data, {
                    code: "none"
            });
	    });
    };
};