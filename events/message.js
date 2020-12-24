module.exports = class Message {
    constructor(client) {
        this.client = client;
    }

    async run(message) {

        const client = this.client;

        if(message.author.bot) return;
        if(message.channel.type !== "text") return;
        if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

        const prefix = ";";

        if(message.content === "<@!" + client.user.id + ">") return message.channel.send(await client.translate("misc:HELLO_SERVER", {
            user: message.author,
            prefix: prefix
        }));

        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const cmd = client.cmds.get(commandName) || client.cmds.get(client.aliases.get(commandName));
        const permLevel = await client.getPermLevel(message);

        if(!cmd) return;
        if(message.content == prefix) return;

        // Check les permLevel
        if(cmd.settings.permLevel > permLevel) return message.error("MISSING_PERMISSION", {
            permission: "`" + await client.permLevel.convert(cmd.settings.permLevel) + "`"
        });

        // Check les userPerms
        if(cmd.settings.userPerms) {
            let neededPerms = [];

            await cmd.settings.userPerms.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm) && !client.cfg.staff.owners.includes(message.author.id)) neededPerms.push(perm);
            });

            if(neededPerms.length > 1) return message.error("MISSING_PERMISSIONS", {
                    permissions: neededPerms.map((p) => `\`${p}\``).join(", ")
            });
            else if(neededPerms.length == 1) return message.error("MISSING_PERMISSION", {
                    permission: "`" + neededPerms[0] + "`"
                });
            };

        try {
            
            cmd.run(message, args);

        } catch(error) {
            client.logger.log("error", error)
        };
    };
};