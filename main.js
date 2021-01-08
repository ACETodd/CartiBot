const Discord = require('discord.js');
require('dotenv-flow').config();
const client = new Discord.Client();
var randomCase = require('random-case');
const fs = require('fs');

const config = {
    token: process.env.TOKEN, 
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
}


client.once('ready', () => {
    console.log('CartiBot online');
});

client.login(config.token);




const prefix = config.prefix;



client.on('message', message => {
    
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !==0) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //creating arrays for randomizing emojis and symobls
    var emojis = [":kiss:", ":vampire:", ":heart:", ":butterfly:", ":black_heart:", ":broken_heart:", ":red_circle:", ":knife:" ];
    const random = Math.floor(Math.random() * emojis.length);
    
    var symbols = ["! >", "++", "+**", "*!", " ! ", " > ", "_ ", "*", "slATT*!", "_!", "x0!", "*ok!"];
    const symRandom = Math.floor(Math.random() * symbols.length);
    var symbolsTwo = ["! >", "++", "+**", "*!", " ! ", " > ", "_", "*", "!+", "_!", "x0!", "*ok!"];
    const symRandomTwo = Math.floor(Math.random() * symbolsTwo.length);

  
    switch (command) {
        case 'help': {
            const embed = new Discord.MessageEmbed().setTitle(":vampire: CartiBot Help:")
            .setDescription(`  **!help** - Displays the help menu
            **!carti** - Replies with a random lyric
            **!iggy** - Replies with She Bad
            **!say** - translates what you say to Cartinese`)
            .setFooter(`Created by Todd `).setColor('#991616');
            message.channel.send(embed);
            break;
        }
        case 'iggy': {
            message.channel.send("she bad");
            break;
        }
        case 'carti': {
            const path = "./lyrics.txt";

            function getRandomLine(path) {
                fs.readFile(path, function(err, data){
                    if(err) throw err;
                    var lines = data.toString().split('\n');
                    message.channel.send(lines[Math.floor(Math.random()*lines.length)]);
                }); 

            }

            getRandomLine(path);

            break;

        }
        case 'say': {
            try {

                var response = "";
                for (i = 0; i < args.length; i++) {
                     response += " " + randomCase(args[i]);

                }
                message.channel.send(symbolsTwo[symRandomTwo] + response + symbols[symRandom] + emojis[random]);
            }
            catch(error) {
                console.log("Something Ain't right");
            }
            break;
        }
        default:
            message.channel.send("This command is unknown");
            break;
     }



});

