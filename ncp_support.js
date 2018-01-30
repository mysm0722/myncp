// Node Module 
const https = require('https');
const express = require('express');
// JSON Parser
const bodyParser = require('body-parser');

const fs = require('fs');
// LINE Bot Message Reply Module
const reply = require('./reply');

// Create Express Server 
var app = express();

// SSL File Settings
var https_options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/bot.mycloud1.ga/chain.pem', 'utf8'),
    key: fs.readFileSync('/etc/letsencrypt/live/bot.mycloud1.ga/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/bot.mycloud1.ga/fullchain.pem', 'utf8')
};

app.use(bodyParser.json());

// BOT Hooking API Setting
app.get('/webhook', function (reqeust, response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>Changhwan - mysm0722@naver.com<h1>');
});

// @help message
var helpText =
    "[ NCP Bot Help ] \n" +
    "@ncp : call hello ncp \n" +
    "@guide || @g : view NCP User Guide \n" +
    "@portal || @p : view NCP Portal Site \n" +
    "@help || @h : view action list of momo \n" +
    "[ NCP Bot Help ]";

var helpArrayText = [
    {
        "type": "text",
        "text": helpText
    }
];

// @guide message
var guideUrlText =
    "[ NCP User Guide ]\n" +
    "NCP User Guide : http://docs.ncloud.com/ko/\n"; 

var guideUrlArrayText = [
    {
        "type": "text",
        "text": guideUrlText
    }
];

// @portal message
var portalUrlText =
    "[ NCP Portal Site ]\n" +
    "NCP Portal Site : http://www.ncloud.com/\n"; 

var portalUrlArrayText = [
    {
        "type": "text",
        "text": portalUrlText
    }
];

// error message
var errorText =
    "Hi~ This NCP LINE Bot.\nThis Command is not supported.\n";

var errorArrayText = [
    {
        "type": "text",
        "text": errorText 
    }
];

// Send Bot Web Hooking Message 
app.post('/webhook', function (request, response) {

    var eventObj = request.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    var CHANNEL_ACCESS_TOKEN = '{YOUR_CHANNEL_TOKEN}';

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', request.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);	
    
    // Message Switcher
    if(message.type = "text" && message.text.indexOf("@ncp") != -1){
        reply.send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, errorArrayText );
    } else {
        var cmd = message.text.split('@')[1];
        console.log('[command]', cmd);

        if(typeof cmd !== "undefined" && cmd != ""){
            if(cmd == "h" || cmd == "help"){
                reply.send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, helpArrayText);
            }
            else if(cmd == "guide" || cmd == "g"){
                reply.send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, guideUrlArrayText);
            }
            else if(cmd == "portal" || cmd == "p"){
                reply.send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, portalUrlArrayText);
            }
        } else {

			console.log('reply tok : ' + eventObj.replyToken);
			console.log('ch tok : ' + CHANNEL_ACCESS_TOKEN);

			reply.send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, errorArrayText);
		}
    }
    
    response.sendStatus(200);
});

https.createServer(https_options, app).listen(443, function(){
    console.log("@NCP Support Bot Server is Running");
});
