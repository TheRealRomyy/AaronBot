module.exports = async (path, option) => {

    let directory = "";
    let stop = false;

    for(let i = 0; i < path.length; i++) {
        if(path[i] == ":") stop = true;
        if(stop == false) directory += path[i]
    }

    let toSay = path.slice(path.indexOf(":")+1);

    let file = new require("../languages/" + directory);

    let message = file[toSay];
    if(message === undefined) message = "Message non trouvé !"; 

    for(const [key, value] of Object.entries(option)) {
        message = message.replace("{{" + key + "}}", value);
    };

    return message;
};