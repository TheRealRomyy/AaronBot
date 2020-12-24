const chalk = require("chalk");

module.exports = class Logger {
    static log(type, msg) {

        if(!type) return console.log(chalk.red("Veuillez spécifier un type d'événement a logger"));

        switch(type) {
            case "warn":
                console.log(chalk.yellow(chalk.bold("Warn: ") + msg))
                break;
            case "error":
                console.log(chalk.red(chalk.bold("Error: ") + msg))
                break;
            case "info":
                console.log(chalk.blueBright(chalk.bold("[!] ") + msg))
                break;
            case "event":
                console.log(chalk.magenta("Event: '"+ chalk.bold(msg) +  "' was succesfully loaded !"));
                break;
            case "separator":
                console.log(chalk.white("----------------------------------------------"));
                break;
            case "command":
                console.log(chalk.cyan("Command: '" + chalk.bold(msg) + "' was successfully loaded !"));
                break;
            default:
                return console.log(chalk.red("Type d'événement a logger invalide !"));
        };
    };
};
