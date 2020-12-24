module.exports = class Command {
	constructor(client, {
		name = null,
		aliases = new Array(),
		enabled = true,
		userPerms = new Array(),
		permLevel = 1,
	})
	{
		this.client = client;
		this.settings = { enabled, userPerms, permLevel};
		this.help = { name, aliases };
	}
};