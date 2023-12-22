
import fs from 'fs';
import '../../src/core/init_utilities';
import channels from '../../src/packets/channels';

const usePacketIdsForRegister = true;

let packets = [];

for (let channelId in channels) {
	let channelName = channels[channelId];

	let packetDir = __dirname + '/../../src/packets/' + channelName + '/';
	if (!fs.existsSync(packetDir))
		continue;

	fs.readdirSync(packetDir).forEach(function (file) {
		if (!file.endsWith('.js') || file === 'index.js')
			return;

		let packetHexId = file.between('0x', '-');
		let packetId = parseInt(packetHexId, 16);
		let packetName = file.between('-', '.');

		packets.push({
			channel: channelId,
			channelName: channelName,
			id: packetId,
			name: packetName,
			file: `./${channelName}/${file.replace('.js', '')}`,
			primary: packetId == 0 || channelId == channels.COMMUNICATION || channelId == channels.LOADING_SCREEN,
		});
	});
}

packets.sort((a, b) => {
	return a.id - b.id;
});

packets.sort((a, b) => {
	if (a.primary && b.primary || !a.primary && !b.primary)
		return 0;

	return a.primary ? -1 : 1;
});

for (let i in packets) {
	let packet = packets[i];

	for (let j in packets)
		if (i != j && packets[j].name == packet.name)
			packets[j].name += packets[j].channelName;
}

//console.log(packets);

for (let i in packets) {
	let packet = packets[i];
	console.log(`import ${packet.name} from '${packet.file}');`;
}

console.log('');

console.log(`import registerPacket from './register');`;
console.log(`import channels from './channels');`;
if (usePacketIdsForRegister)
	console.log(`import packetIds from './ids');`;

console.log('');

for (let i in packets) {
	let packet = packets[i];
	let packetId = packet.primary ? packet.id : (usePacketIdsForRegister ? `packetIds.${packet.name}` : 'undefined');
	console.log(`registerPacket(channels.${packet.channelName}, ${packetId}, ${packet.name});`);
}

console.log('');

console.log(`const packets = {`);
for (let i in packets) {
	let packet = packets[i];
	console.log(`\t${packet.name},`);
}
console.log(`};`);

console.log('');
console.log(`export default packets;`);
