// On importe la structure
const AaronBot = require("./structure/aaron.js");
const Aaron = require("./structure/aaron.js");

const client = new AaronBot({
    partials: ["MESSAGE", "USER", "REACTION", "GUILD_MEMBER"]   
});

client.init();

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} Je suis co pd.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
}); 


" Rome.🌵16/01/2021
:hapcool:
" Fαɳ.xyz16/01/2021
Je commence :slight_smile:
" Rome.🌵16/01/2021
Ok nice ^^
" Fαɳ.xyz16/01/2021
Tu peut faire la db stp
" Rome.🌵16/01/2021
Ouaip
J'vais faire du postgresql
" Fαɳ.xyz16/01/2021
Oe
Je fait le système dans l'index ou dans un fichier ?
" Rome.🌵16/01/2021
Dans un fichier
L'index doit être archi propre
:pepeCheck:
" Fαɳ.xyz16/01/2021
Nan pour sa jpp :/
Je vais metre comme sa tu essayera de voir pour patch
" Fαɳ.xyz16/01/2021
@" Rome.🌵 check index.js
" Rome.🌵16/01/2021
Bas t'a rien mit
Sur Hisoka ou Aaron ?
" Fαɳ.xyz16/01/2021
Si
Aarob
Aaron
Oo
Je viens d'avoir un Pb de wifi
J'espère que sa à save
Tn
" Rome.🌵16/01/2021
Justement non
" Fαɳ.xyz16/01/2021
Ptn sa à pas save
Nik omok
" Rome.🌵16/01/2021
:PasDeChance:
" Fαɳ.xyz16/01/2021
Fait la db svp :sob:
Mais sa
client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    console.log(`${client.user.tag} Je suis co pd.`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});
Car trop peur que sa s'elneve encore
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
