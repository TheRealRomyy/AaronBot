const chalk = require("chalk");

module.exports = class Permissions {
    static check(guild, id, cfg) {

        if(!guild || !id || !cfg) return "Error: paramètres manquant ( permLevel )";

        let permLevel = 1;

        /* 
        1 => Utilisateur
        2 => Modérateur Chat
        3 => Modérateur
        4 => Administrateur
        5 => Bot modérateur
        6 => Bot owner    
        */

        if(guild.member(id).hasPermission("MANAGE_MESSAGES")) permLevel = 2;

        if(guild.member(id).hasPermission("KICK_MEMBERS")) permLevel = 3;
        
        if(guild.member(id).hasPermission("ADMINISTRATOR")) permLevel = 4;

        if(cfg.staff.moderators.includes(id)) permLevel = 5;

        if(cfg.staff.owners.includes(id)) permLevel = 6;

        return permLevel;
    };

    static convert(permLevel) {

        let permName = "Utilisateur";

        if(permLevel == 2) permName = "Modérateur Chat";
        if(permLevel == 3) permName = "Modérateur";
        if(permLevel == 4) permName = "Administrateur";
        if(permLevel == 5) permName = "Bot modérateur";
        if(permLevel == 6) permName = "Bot owner";

        return permName;
    };
};