const socket = new WebSocket('ws://127.0.0.1:80/ws');

// Connection opened
socket.addEventListener('open', (event) => {
	loadpackets();
});

/*var Channels = {
	"0": "HANDSHAKE",
	"1": "C2S",
	"2": "GAMEPLAY",
	"3": "S2C",
	"4": "LOW_PRIORITY",
	"5": "COMMUNICATION",
	"7": "LOADING_SCREEN",
};*/

// Listen for messages
socket.addEventListener('message', (event) => {
	//console.log('Message from server', event.data);
	var res = JSON.parse(event.data);
	if(res.cmd == 'newpacket'){

		var parsedLines = parseInt((res.packet.Parsed || '').split('\n').length + (res.packet.Parsed || '').length / 100);
		parsedLines = parsedLines > 10 ? 10 : parsedLines;

		var newpacket = document.createElement('div');
		newpacket.className = 'Packet';
		newpacket.innerHTML = `
<div class="packetrow">
	<div class="row">
		<div class="Id col">Id:` + (res.packet.Id || 0) + `</div>
		<div class="Time col">Time:` + (res.packet.Time || '') + `</div>
		<div class="Channel col">` + res.packet.channelName + `.` + res.packet.cmdName + `</div>
	</div>
	<div class="row">
		<div class="Bytes col"><textarea class="Bytes_Parsed_textarea" rows="` + parsedLines + `">` + (res.packet.Bytes || '') + `</textarea></div>
		<div class="Parsed col"><textarea class="Bytes_Parsed_textarea" rows="` + parsedLines + `">` + (res.packet.Parsed || '') + `</textarea></div>
	</div>
	<div class="row">
		<div class="col"><button class="btn btn-light" onclick="sendpacket(` + (res.packet.Id || 0) + `)">send packet</button></div>
	</div>
</div>`;

		var packetlist = document.getElementById('packetlist');
		packetlist.appendChild(newpacket);
		console.log(res.packet.Id, res.packet.channelName, res.packet.cmdName, JSON.parse(res.packet.Parsed));
	}
});

function sendpacket_type(name, channel){
	socket.send(JSON.stringify({
		cmd: 'sendpacket_type',
		name: name,
		channel: channel,
	}));
}
function sendpacket(Id){
	socket.send(JSON.stringify({
		cmd: 'sendpacket',
		Id: Id,
	}));
}
function initialize_client(){
	socket.send(JSON.stringify({
		cmd: 'initialize_client',
	}));
	document.getElementById('send_handshake').disabled = false;
}
function loadpackets(limit = 5000){
	socket.send(JSON.stringify({
		cmd: 'loadpackets',
		limit: limit,
	}));
}
