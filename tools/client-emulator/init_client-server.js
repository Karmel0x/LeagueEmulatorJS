
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');


var server = http.createServer((req, res) => {
	console.log(req.url);
	if(req.url == '/')
		req.url = '/index.html';

	if(req.url == '/index.html' || req.url == '/index.js' || req.url == '/style.css' || req.url == '/favicon.ico'){
		fs.readFile(__dirname + '/public' + req.url, (err, data) => {
			if(err){
				res.writeHead(404);
				res.end(JSON.stringify(err));
				return;
			}
			res.writeHead(200);
			res.end(data);
		});
		return;
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({
			data: 'Hello World!'
	}));
});


var wss = new WebSocket.Server({ noServer: true });

wss.clients.sendToAll = (data) => {
	for(var client of wss.clients){
		//if(client === ws || client.readyState !== WebSocket.OPEN)
		//	continue;

		client.send(data);
	};
}

wss.on('connection', (ws) => {
	ws.on('message', wss.onMessage);
});


server.on('upgrade', function upgrade(request, socket, head) {
	console.log(request.url);

	if(request.url === '/ws'){
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request);
		});
	} else {
		//socket.destroy();
	}
});

server.listen(80);

module.exports = {server, wss};
