
WebSocket.prototype.sendJson = function(data){
	data = JSON.stringify(data);
	this.send(data);
};

const ws = new WebSocket('ws://127.0.0.1/ws');

ws.addEventListener('close', (event) => {
	var a = document.getElementById('top-header');
	a.style.setProperty('border-color', 'red', 'important');
});

ws.addEventListener('open', (event) => {
	Messages.loadreplaylist();
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

function strAtPos(str, pos, ins){
	return [str.slice(0, pos), ins, str.slice(pos)].join('');
}
function getPacketSel(element, packetId){
    var a = window.getSelection().toString();
	var b = element.parentElement.parentElement.querySelector('.Bytes_textarea');
	var c = offDEBUGobj[packetId][a] || 0;

	b.value = b.value.replace('>', '');
	if(c)
		b.value = strAtPos(b.value, c * 3, '>');

}
function collapsePacket(element){
	var b = element.parentElement.parentElement.parentElement.querySelector('.packetContentRow');
	b.style.display = b.style.display == 'none' ? null : 'none';
}
function highlightPacket(element){
	//var a = element.parentElement.parentElement.parentElement.querySelector('.packetContentRow .Bytes > *');
	//a.style.border = a.style.border ? null : '1px solid blue';
	//var b = element.parentElement.parentElement.parentElement.querySelector('.packetContentRow .Parsed > *');
	//b.style.border = b.style.border ? null : '1px solid blue';
	var a = element.parentElement.parentElement.parentElement;
	a.style.backgroundColor = a.style.backgroundColor ? null : 'rgba(43, 255, 0, 0.2)';
}

// Listen for messages
var offDEBUGobj = {};
ws.addEventListener('message', (event) => {
	//console.log('Message from server', event.data);
	var res = JSON.parse(event.data);
	if(res.cmd == 'newpacket'){
		//Controls.loadingspinnerTime();

		var parsedLines = parseInt((res.packet.Parsed || '').split('\n').length + (res.packet.Parsed || '').length / 100);
		parsedLines = parsedLines > 10 ? 10 : parsedLines;

		try{
			offDEBUGobj[res.packet.Id] = JSON.parse(res.packet.offDEBUG);
		}catch(e){
			console.error(e, res);
		}

		var newpacket = document.createElement('div');
		newpacket.className = 'Packet';
		newpacket.innerHTML = `
<div class="packetrow">
	<div class="row">
		<div class="Id col">Id:` + (res.packet.Id || 0) + `</div>
		<div class="Time col">Time:` + (res.packet.Time || '') + ' (' + (new Date(parseFloat(res.packet.Time || 0)).toISOString().slice(11, 19)) + `)</div>
		<div class="Channel col">` + res.packet.channelName + `.` + res.packet.cmdName + ` (size:` + (res.packet.Bytes || '').split(' ').length + `)</div>
		<div class="col text-end">
			<button class="btn btn-light btn-sm" style="border:0;line-height:10px" onclick="collapsePacket(this)">collapse</button>
			<button class="btn btn-light btn-sm" style="border:0;line-height:10px" onclick="highlightPacket(this)">highlight</button>
		</div>
	</div>
	<div class="row packetContentRow">
		<div class="Bytes col"><textarea class="Bytes_Parsed_textarea Bytes_textarea">` + (res.packet.Bytes || '') + `</textarea></div>
		<div class="Parsed col" ondblclick="getPacketSel(this.children[0], ` + (res.packet.Id || 0) + `)"></div>
	</div>
	<div class="row" style="display:none">
		<div class="col"><button class="btn btn-light" onclick="Messages.sendpacket(` + (res.packet.Id || 0) + `)">send packet</button></div>
	</div>
</div>`;

		newpacket.querySelector(".Bytes_Parsed_textarea").style.height = (parsedLines * 26) + 'px';

		var packetlist = document.getElementById('packetlist');
		packetlist.appendChild(newpacket);

		try{
			var jsonViewer = new JSONViewer();
			var jsonViewerContainer = jsonViewer.getContainer();
			jsonViewerContainer.style.height = (parsedLines * 26) + 'px';

			newpacket.querySelector(".Parsed").appendChild(jsonViewerContainer);
			jsonViewer.showJSON(JSON.parse(res.packet.Parsed));
		}catch(e){
			console.error(e);
		}

		//console.log(res.packet.Id, res.packet.channelName, res.packet.cmdName, JSON.parse(res.packet.Parsed));
	}
	else if(res.cmd == 'loadreplaylist'){
		let loadreplaylist = document.getElementById('loadreplaylist');

		for(let option in res.list){
			let optionEl = document.createElement('option');
			optionEl.value = optionEl.text = res.list[option];
			loadreplaylist.add(optionEl);
		}
	}
	else if(res.cmd == 'endloading'){
		Controls.loadingspinner(false);
	}
});

class Messages {
	static sendpacket_type(name, channel){
		ws.sendJson({
			cmd: 'sendpacket_type',
			name: name,
			channel: channel,
		});
	}
	static sendpacket(Id){
		ws.sendJson({
			cmd: 'sendpacket',
			Id: Id,
		});
	}
	static initialize_client(){
		ws.sendJson({
			cmd: 'initialize_client',
		});
		document.getElementById('send_handshake').disabled = false;
	}
	static loadpackets(offset = 0, limit = 2000, packetsearch = []){
		ws.sendJson({
			cmd: 'loadpackets',
			offset: offset,
			limit: limit,
			packetsearch: packetsearch,
		});
	}
	static loadreplaylist(){
		ws.sendJson({
			cmd: 'loadreplaylist',
		});
	}
	static loadreplayfile(name = '', offset = undefined, limit = undefined, packetsearch = []){
		Controls.loadingspinner(true);
		ws.sendJson({
			cmd: 'loadreplayfile',
			name: name,
		});
		Messages.loadpackets(offset, limit, packetsearch);
	}
	static addpacket(bytes, channel){
		ws.sendJson({
			cmd: 'addpacket',
			data: {
				bytes: bytes,
				channel: channel,
			}
		});
	}
}

class Controls {
	static loadingspinner(show){
		var el = document.getElementById('loadingspinner');
		if(show)
			el.classList.remove('d-none');
		else
			el.classList.add('d-none');
	}

	//static _loadingspinnerTime = false;
	//static loadingspinnerTime(ms = 250){
	//	if(this._loadingspinnerTime)
	//		return;
	//		
	//	this._loadingspinnerTime = true;
	//	this.loadingspinner(true);
	//	setTimeout(() => {
	//		this._loadingspinnerTime = false;
	//		this.loadingspinner(false);
	//	}, ms);
	//}

	static loadreplayfile(){
		var replayFile = document.getElementById('loadreplaylist').value;
		var offset = document.getElementById('loadreplay_offset').value;
		var limit = document.getElementById('loadreplay_limit').value;
		var packetsearch = document.getElementById('packetsearch').value;
		packetsearch = packetsearch.split('||').filter(Boolean);

		offset = parseInt(offset) || undefined;
		limit = parseInt(limit) || undefined;

		Messages.loadreplayfile(replayFile, offset, limit, packetsearch);
	}

	static addpacket(){
		var packet = document.getElementById('addpacket_packet').value;
		var channel = document.getElementById('addpacket_channel').value;

		Messages.addpacket(packet, channel);
	}
	
	static clear(){
		var packetlist = document.getElementById('packetlist');
		packetlist.innerHTML = '';
	}
}
