
const fs = require('fs');

let Channels = {
	0: 'HANDSHAKE',
	1: 'C2S',
	2: 'GAMEPLAY',
	3: 'S2C',
	4: 'LOW_PRIORITY',
	5: 'COMMUNICATION',
	7: 'LOADING_SCREEN',
};

let packets = {};
for (let channelId in Channels) {
	let channelName = Channels[channelId];

	packets[channelId] = {};
	packets[channelId].name = channelName;

	let packetDir = __dirname + '/../packets/' + channelName + '/';
	fs.readdirSync(packetDir).forEach(function (file) {
		if (file.endsWith('.js') && file !== 'index.js')
			packets[channelId]['0x' + file.between('0x', '-')] = `./${channelName}/${file.replace('.js', '')}`;
	});

	packets[channelId] = Object.keys(packets[channelId]).sort((a, b) => parseInt(a, 16) - parseInt(b, 16)).reduce(
		(obj, key) => {
			obj[key] = packets[channelId][key];
			return obj;
		}, {}
	);
}

console.log(`module.exports = {`);
for (let channelId in packets) {
	let channelName = packets[channelId].name;

	console.log(`\t${channelId}: {`);
	console.log(`\t\tname: '${channelName}',`);
	for (let packetId in packets[channelId]) {
		if (packetId != 'name')
			console.log(`\t\t${packetId}: require('${packets[channelId][packetId]}'),`);
	}
	console.log(`\t},`);
}
console.log(`};\n`);
