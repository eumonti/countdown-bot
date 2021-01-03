require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.TOKEN;

var countDownDate = new Date("Jan 1, 2021 00:00:00").getTime();
var sentMessage;
var activated = false;


client.on('message', msg => {
    if (msg.author != client.user) {
        if (msg.content == '!start' && activated == false) {
            activated = true;
            msg.channel.send('Timer partito!');
            var x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                var f_seconds = ('0' + seconds).slice(-2);
                var f_minutes = ('0' + minutes).slice(-2);
                if (distance <= 0) {
                    msg.channel.send("@everyone Buon anno!🎉");
                    //document.getElementById("demo").innerHTML = "EXPIRED";
                }
                else if (minutes == 0 && seconds < 10) {
                    msg.channel.send(`@everyone ${f_minutes}:${f_seconds}`);
                } else {
                    sentMessage.edit(`${f_minutes}:${f_seconds}`);
                }
                // If the count down is over, write some text 

            }, 1000);
            msg.channel.send('00:00').then(sent => {
                sentMessage = sent;
            });
        }
    }
});

client.on('ready', () => {
    console.log('Ready!');
});

client.login(token);