
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

WebSocket.prototype.sendJson = function(data){
	data = JSON.stringify(data);
	this.send(data);
};

var server = http.createServer((req, res) => {
	console.log(req.url);
	if(req.url == '/')
		req.url = '/index.html';

	// do not allow access to files outside of the public directory
	// allow only alphanumeric, dots, slashes, underscores, dashes
	if(req.url.indexOf('..') != -1 || !req.url.match(/^\/[a-zA-Z0-9\.\/_-]+$/)){
		res.writeHead(403);
		res.end('403 Forbidden');
		return;
	}
	if(!fs.existsSync(__dirname + '/public' + req.url)){
		res.writeHead(404);
		res.end('404 Not Found');
		return;
	}

	fs.readFile(__dirname + '/public' + req.url, (err, data) => {
		if(err){
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		
		// mimetype
		var mime = 'text/plain';
		if(req.url.match(/\.html$/))
			mime = 'text/html';
		else if(req.url.match(/\.css$/))
			mime = 'text/css';
		else if(req.url.match(/\.js$/))
			mime = 'text/javascript';

		res.writeHead(200, {'Content-Type': mime});
		res.end(data);
	});
});


var wss = new WebSocket.Server({ noServer: true });

wss.sendToAll = function(data){
	for(var client of wss.clients){
		//if(client === ws || client.readyState !== WebSocket.OPEN)
		//	continue;

		client.send(data);
	};
}
wss.sendJsonToAll = function(data){
	for(var client of wss.clients){
		//if(client === ws || client.readyState !== WebSocket.OPEN)
		//	continue;

		client.sendJson(data);
	};
}

wss.on('connection', (ws) => {
	ws.on('message', (data) => wss.onMessage(ws, data));
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

server.listen(80, '127.0.0.1');
console.log('To start inspecting packets open your browser at: http://127.0.0.1/');

module.exports = {server, wss};
