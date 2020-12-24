const { Message } = require("discord.js");

Message.prototype.error = async function(content, option) {
    const translation = await this.client.translate("errors:" + content, option);
    const string = this.client.emotes["error"] + "** " + translation + "**";

	return this.channel.send(string);
};

Message.prototype.succes = async function(content, option) {
    const translation = await this.client.translate(content, option);
    const string = this.client.emotes["succes"] + " " + translation;

	return this.channel.send(string);
};

Message.prototype.translate = async function(content, option) {
    const string = await this.client.translate(content, option);
    if(option && option.emoji) string = this.client.emotes[option.emoji] + " " + string;

	return string;
};