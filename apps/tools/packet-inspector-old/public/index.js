
WebSocket.prototype.sendJson = function (data) {
	data = JSON.stringify(data);
	this.send(data);
};

const ws = new WebSocket('ws://127.0.0.1/ws');

ws.addEventListener('close', (event) => {
	let a = document.getElementById('top-header');
	if (a)
		a.style.setProperty('border-color', 'red', 'important');
});

ws.addEventListener('open', (event) => {
	Messages.loadreplaylist();
});

/**
 * @param {string} str 
 * @param {number} pos 
 * @param {string} ins 
 * @returns 
 */
function strAtPos(str, pos, ins) {
	return [str.slice(0, pos), ins, str.slice(pos)].join('');
}

/**
 * @param {number} index 
 * @param {string} replacement 
 * @returns 
 */
String.prototype.replaceAt = function (index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

/**
 * @param {MouseEvent} event
 * @param {HTMLElement} element 
 * @param {number} packetNum 
 */
function getPacketSel(event, element, packetNum) {
	let a = (/** @type {HTMLElement} */(event.target)).dataset.parsedKey;
	console.log(a, debugOffsets[packetNum]);
	//let a = window.getSelection()?.toString();
	if (!a)
		return;

	/** @type {HTMLTextAreaElement | null | undefined} */
	let b = element.parentElement?.parentElement?.querySelector('.Bytes_textarea');
	if (!b)
		return;

	let offsets = (debugOffsets[packetNum][a] || '0-0').split('-');
	let [startOffset, endOffset] = offsets.map(x => parseInt(x));

	b.value = b.value.replace('>', ' ');
	b.value = b.value.replace('<', ' ');
	if (startOffset || endOffset) {
		//b.value = strAtPos(b.value, c * 3, '>');

		let s = startOffset * 3 - 1;
		if (s > 0)
			b.value = b.value.replaceAt(s, '>');

		let e = endOffset * 3 - 1;
		if (e > 0)
			b.value = b.value.replaceAt(e, '<');

		console.log(s, e);
		b.value = b.value.trim();

		b.focus();
		b.setSelectionRange(s + 1, e);
	}

}

/**
 * @param {HTMLElement} element 
 */
function collapsePacket(element) {
	let b = element.parentElement?.parentElement?.parentElement?.querySelector('.packetContentRow');
	if (b)
		b.style.display = b.style.display === 'none' ? null : 'none';
}

/**
 * @param {HTMLElement} element 
 */
function highlightPacket(element) {
	//let a = element.parentElement.parentElement.parentElement.querySelector('.packetContentRow .Bytes > *');
	//a.style.border = a.style.border ? null : '1px solid blue';
	//let b = element.parentElement.parentElement.parentElement.querySelector('.packetContentRow .Parsed > *');
	//b.style.border = b.style.border ? null : '1px solid blue';
	let a = element.parentElement?.parentElement?.parentElement;
	if (a)
		a.style.backgroundColor = a.style.backgroundColor ? null : 'rgba(43, 255, 0, 0.2)';
}

/** @type {{[id: number]: {[prop: string]: string}}} */
let debugOffsets = {};

ws.addEventListener('message', (event) => {
	//console.log('Message from server', event.data);
	let res = JSON.parse(event.data);
	if (res.cmd === 'newpacket') {
		//Controls.loadingspinnerTime();

		/** @type {{
			num: number;
			time: number;
			packetId: number;
			packetChannel: number;
			bytes: string;
			parsedJson: string;
			debugOffsetsJson: string;
			channelName: string;
			packetName: string | undefined;
		}} */
		let packet = res.packet;

		let parsedLines = Math.round((packet.parsedJson || '').split('\n').length + (packet.parsedJson || '').length / 100);
		parsedLines = parsedLines > 10 ? 10 : parsedLines;
		let peerNums = packet.peerNums?.join(', ');

		try {
			debugOffsets[packet.num] = JSON.parse(packet.debugOffsetsJson);
		} catch (e) {
			console.error(e, res);
		}

		let newpacket = document.createElement('div');
		newpacket.className = 'Packet';
		newpacket.innerHTML = /* html */ `
			<div class="packetrow">
				<div class="row">
					<div class="Id col">
						Id:${packet.num || 0}
						<button class="btn btn-sm btn-secondary d-none" style="padding: 0 5px" onclick="Messages.sendpacket(${JSON.stringify(packet.peerNums ?? [])}, '${packet.bytes || ''}', ${packet.packetChannel})">send packet</button>
					</div>
					<div class="Time col">
						Time:${packet.time || ''} (${(new Date(parseFloat(packet.time || 0)).toISOString().slice(11, 19))})
						${peerNums ? ` | PeerNums: ${peerNums}` : ''}
					</div>
					<div class="Channel col">${packet.channelName}.${packet.packetName} (size:${packet.bytes.length / 2}) ${packet.parsedJson ? '' : 'error parsing'}</div>
					<div class="col text-end">
						<button class="btn btn-sm btn-secondary" style="border:0;line-height:10px" onclick="collapsePacket(this)">collapse</button>
						<button class="btn btn-sm btn-secondary" style="border:0;line-height:10px" onclick="highlightPacket(this)">highlight</button>
					</div>
				</div>
				<div class="row packetContentRow">
					<div class="Bytes col"><textarea class="Bytes_Parsed_textarea Bytes_textarea">${(packet.bytes || '').match(/../g)?.join(' ')}</textarea></div>
					<div class="Parsed col" ondblclick="getPacketSel(event, this.children[0], ${packet.num || 0})"></div>
				</div>
			</div>`;

		let bytesParsedEl = /** @type {?HTMLTextAreaElement} */(newpacket.querySelector(".Bytes_Parsed_textarea"));
		if (bytesParsedEl)
			bytesParsedEl.style.height = (parsedLines * 26) + 'px';

		let packetlist = document.getElementById('packetlist');
		if (packetlist)
			packetlist.appendChild(newpacket);

		try {
			let jsonViewer = new JSONViewer();
			let jsonViewerContainer = jsonViewer.getContainer();
			jsonViewerContainer.style.height = (parsedLines * 26) + 'px';

			let parsedEl = newpacket.querySelector(".Parsed");
			if (parsedEl)
				parsedEl.appendChild(jsonViewerContainer);

			jsonViewer.showJSON(JSON.parse(packet.parsedJson));
		} catch (e) {
			console.error(e);
		}

		//console.log(packet.num, packet.packetId, packet.packetChannel, JSON.parse(packet.parsedJson));
	}
	else if (res.cmd === 'loadreplaylist') {
		let loadreplaylist = document.getElementById('loadreplaylist');

		for (let option in res.list) {
			let optionEl = document.createElement('option');
			optionEl.value = optionEl.text = res.list[option];

			if (loadreplaylist)
				loadreplaylist.add(optionEl);
		}
	}
	else if (res.cmd === 'endloading') {
		Controls.loadingspinner(false);
	}
});

class Messages {
	static sendpacket_type(name, channel) {
		ws.sendJson({
			cmd: 'sendpacket_type',
			name,
			channel,
		});
	}

	static sendpacket(peerNums, data, channel) {
		ws.sendJson({
			cmd: 'sendpacket',
			peerNums: peerNums?.length ? peerNums : [0],
			data,
			channel,
		});
	}

	static initialize_client() {
		ws.sendJson({
			cmd: 'initialize_client',
		});
		document.getElementById('send_handshake').disabled = false;
	}

	static loadpackets(offset = 0, limit = 2000, packetsearch = []) {
		ws.sendJson({
			cmd: 'loadpackets',
			offset,
			limit,
			packetsearch,
		});
	}

	static loadpackets2(start = 0, end = 2000, packetsearch = []) {
		ws.sendJson({
			cmd: 'loadpackets2',
			start,
			end,
			packetsearch,
		});
	}

	static loadreplaylist() {
		ws.sendJson({
			cmd: 'loadreplaylist',
		});
	}

	static loadreplayfile(name = '', offset = undefined, limit = undefined, packetsearch = []) {
		Controls.loadingspinner(true);
		ws.sendJson({
			cmd: 'loadreplayfile',
			name: name,
		});
		Messages.loadpackets(offset, limit, packetsearch);
	}

	static loadreplayinfo(name = '') {
		Controls.loadingspinner(true);
		ws.sendJson({
			cmd: 'loadreplayfile',
			name: name,
		});

		Messages.loadpackets2(0, 200, ['RequestReskin']);
	}

	static replayinfo(name = '', offset = undefined, limit = undefined, packetsearch = []) {
		Controls.loadingspinner(true);
		ws.sendJson({
			cmd: 'loadreplayinfo',
			name: name,
		});
		Messages.loadpackets(offset, limit, packetsearch);
	}

	static channels = {
		default: 0,
		c2s: 1,
		synchClock: 2,
		s2c: 3,
		s2cUnreliable: 4,
		chat: 5,
		quickChat: 6,
		loading: 7,
	};

	/**
	 * 
	 * @param {string} packetInputList 
	 * @param {number} packetInputChannel 
	 */
	static addpacket(packetInputList, packetInputChannel) {
		let packets = packetInputList.split(' ').join('').split('\n').map(v => v.trim()).filter(Boolean);

		let packets2 = packets.map(v => {
			let packetChannel = packetInputChannel;

			let packetInput = v.replace('sent:', 's2c:').replace('recv:', 'c2s:');
			let packetData = packetInput;

			if (packetInput.includes(':')) {
				let [channelName, data] = packetInput.split(':');
				packetData = data;

				if (channelName) {
					for (let channel in this.channels) {
						let channelId = this.channels[/** @type {keyof typeof this.channels} */(channel)];
						if (channelName.toLowerCase() === channel.toLowerCase() || channelName === `${channelId}`) {
							packetChannel = channelId;
							break;
						}
					}
				}
			}
			return {
				channel: packetChannel,
				data: packetData,
			};
		});

		ws.sendJson({
			cmd: 'addpacket',
			data: packets2,
		});
	}
}

class Controls {
	/**
	 * @param {boolean} show 
	 */
	static loadingspinner(show) {
		let el = document.getElementById('loadingspinner');

		if (show)
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

	static loadreplayfile() {
		let replayFile = document.getElementById('loadreplaylist').value;
		let offset = document.getElementById('loadreplay_offset').value;
		let limit = document.getElementById('loadreplay_limit').value;
		let packetsearch = document.getElementById('packetsearch').value;
		packetsearch = packetsearch.split('||').filter(Boolean);

		offset = parseInt(offset) || undefined;
		limit = parseInt(limit) || undefined;

		Messages.loadreplayfile(replayFile, offset, limit, packetsearch);
	}

	static loadreplayinfo() {
		let replayFile = document.getElementById('loadreplaylist').value;
		Messages.loadreplayinfo(replayFile);
	}

	static addpacket() {
		let packetData = document.getElementById('addpacket_packet').value;
		let channel = document.getElementById('addpacket_channel').value;

		Messages.addpacket(packetData, channel);
	}

	static sendpacket() {
		let packetData = document.getElementById('addpacket_packet').value;
		let channel = document.getElementById('addpacket_channel').value;

		Messages.sendpacket([0], packetData, parseInt(channel));
	}

	static clear() {
		let packetlist = document.getElementById('packetlist');
		if (packetlist)
			packetlist.innerHTML = '';
	}
}

function HashString(path) {
	path = path.toLowerCase();

	let hash = 0;
	const magic = 16;
	const mask = 0xF0000000;

	for (let i = 0; i < path.length; i++) {
		hash = path.charCodeAt(i) + magic * hash;

		let hm = (hash & mask) >>> 0;
		if (hm > 0)
			hash ^= hm ^ hm >>> 24;
	}

	return hash;
}
