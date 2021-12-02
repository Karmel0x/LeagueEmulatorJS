const socket = new WebSocket('ws://127.0.0.1:80/ws');

// Connection opened
socket.addEventListener('open', (event) => {
	loadreplaylist();
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
function getSel(element){
    var txtarea = element;
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);
	return sel;
}
function strAtPos(str, pos, ins){
	return [str.slice(0, pos), ins, str.slice(pos)].join('');
}
function getPacketSel(element, packetId){
    var a = getSel(element);
	var b = element.parentElement.parentElement.querySelector('.Bytes_textarea');
	var c = offDEBUGobj[packetId][a] || 0;

	b.value = b.value.replace('>', '');
	if(c)
		b.value = strAtPos(b.value, c * 3, '>');

}
// Listen for messages
var offDEBUGobj = {};
socket.addEventListener('message', (event) => {
	//console.log('Message from server', event.data);
	var res = JSON.parse(event.data);
	if(res.cmd == 'newpacket'){

		var parsedLines = parseInt((res.packet.Parsed || '').split('\n').length + (res.packet.Parsed || '').length / 100);
		parsedLines = parsedLines > 10 ? 10 : parsedLines;

		offDEBUGobj[res.packet.Id] = JSON.parse(res.packet.offDEBUG);

		var newpacket = document.createElement('div');
		newpacket.className = 'Packet';
		newpacket.innerHTML = `
<div class="packetrow">
	<div class="row">
		<div class="Id col">Id:` + (res.packet.Id || 0) + `</div>
		<div class="Time col">Time:` + (res.packet.Time || '') + ' (' + (new Date(res.packet.Time).toISOString().slice(11, 19)) + `)</div>
		<div class="Channel col">` + res.packet.channelName + `.` + res.packet.cmdName + ` (Size:` + ((res.packet.Bytes || '').split(' ').length + 1) + `)</div>
	</div>
	<div class="row">
		<div class="Bytes col"><textarea class="Bytes_Parsed_textarea Bytes_textarea" rows="` + parsedLines + `">` + (res.packet.Bytes || '') + `</textarea></div>
		<div class="Parsed col"><textarea onclick="getPacketSel(this, ` + (res.packet.Id || 0) + `)" class="Bytes_Parsed_textarea" rows="` + parsedLines + `">` + (res.packet.Parsed || '') + `</textarea></div>
	</div>
	<div class="row">
		<div class="col"><button class="btn btn-light" onclick="sendpacket(` + (res.packet.Id || 0) + `)">send packet</button></div>
	</div>
</div>`;

		var packetlist = document.getElementById('packetlist');
		packetlist.appendChild(newpacket);
		console.log(res.packet.Id, res.packet.channelName, res.packet.cmdName, JSON.parse(res.packet.Parsed));
	}
	else if(res.cmd == 'loadreplaylist'){
		let loadreplaylist = document.getElementById('loadreplaylist');

		for(let option in res.list){
			let optionEl = document.createElement('option');
			optionEl.value = optionEl.text = res.list[option];
			loadreplaylist.add(optionEl);
		}
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
function loadpackets(offset = 0, limit = 5000, packetnames = []){
	socket.send(JSON.stringify({
		cmd: 'loadpackets',
		offset: offset,
		limit: limit,
		packetnames: packetnames,
	}));
}
function loadreplaylist(){
	socket.send(JSON.stringify({
		cmd: 'loadreplaylist',
	}));
}
function loadreplayfile(name = '', offset = undefined, limit = undefined, packetnames = []){
	socket.send(JSON.stringify({
		cmd: 'loadreplayfile',
		name: name,
	}));
	loadpackets(offset, limit, packetnames);
}
function loadreplayfileDOM(){
	var replayFile = document.getElementById('loadreplaylist').value;
	var offset_limit = document.getElementById('loadreplay_limit').value;
	var packetnames = document.getElementById('loadreplay_packetnames').value;

	offset_limit = offset_limit.split(' ').join('').split(',').filter(n => n);
	packetnames = packetnames.split(' ').join('').split(',').filter(n => n);

	var offset = parseInt(offset_limit[0]) || undefined;
	var limit = parseInt(offset_limit[1]) || undefined;

	loadreplayfile(replayFile, offset, limit, packetnames);
}
