
const requestSender = require('request');

module.exports.send = function (channelAccessToken, replyToken, messages) {

	console.log('reply.channelAccessToken : ' + channelAccessToken);
	console.log('reply.replyToken : ' + replyToken);
	console.log('reply.messages : ' + messages);

    var headers = {
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + channelAccessToken
    };

    // LINE Bot Reply Server URL
    var options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        method: 'POST',
        headers: headers,
        json: {
            replyToken : replyToken,
            messages : messages
        }
    };

    // LINE Bot Reploy Request/Response
    requestSender(options, function (error, response, body) {

		console.log('req.Sender.options : ' + options);
		console.log('req.Sender.body : ' + body);
        console.log('response', response.statusCode);

        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        else{
            console.log('requestSender', error);
        }
    })

};
