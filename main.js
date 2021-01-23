// On importe la structure
const AaronBot = require("./structure/aaron.js");
const Aaron = require("./structure/aaron.js");

const client = new AaronBot({
    partials: ["MESSAGE", "USER", "REACTION", "GUILD_MEMBER"]   
});

client.init();

const guildInvites = new Map();

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} Je suis co pd.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
}); 



client.on('guildMemberAdd', async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
            .setDescription(`${member.user.tag} est le  ${member.guild.memberCount} membre.\nInviter par ${usedInvite.inviter.tag}\nil à  ${usedInvite.uses}`)
            .setTimestamp()
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '789166270951194644');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});
