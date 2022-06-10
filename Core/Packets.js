
//const fs = require('fs');
//
//var Channels = {
//	0: 'HANDSHAKE',
//	1: 'C2S',
//	2: 'GAMEPLAY',
//	3: 'S2C',
//	4: 'LOW_PRIORITY',
//	5: 'COMMUNICATION',
//	7: 'LOADING_SCREEN',
//};
//
//var Packets = {};
//for(var channelId in Channels){
//	var channelName = Channels[channelId];
//
//	Packets[channelId] = {};
//	Packets[channelId].name = channelName;
//
//	var packetDir = __dirname + '/../Packets/' + channelName + '/';
//	fs.readdirSync(packetDir).forEach(function(file){
//		if(file.endsWith('.js') && file !== 'index.js')
//			Packets[channelId]['0x' + file.between('0x', '-')] = `./${channelName}/${file.replace('.js', '')}`;
//	});
//
//	Packets[channelId] = Object.keys(Packets[channelId]).sort((a, b) => parseInt(a, 16) - parseInt(b, 16)).reduce(
//		(obj, key) => {
//			obj[key] = Packets[channelId][key];
//			return obj;
//		}, {}
//	);
//}
//
//console.log(`module.exports = {`);
//for(var channelId in Packets){
//	var channelName = Packets[channelId].name;
//
//	console.log(`\t${channelId}: {`);
//	console.log(`\t\tname: '${channelName}',`);
//	for(var packetId in Packets[channelId]){
//		if(packetId != 'name')
//			console.log(`\t\t${packetId}: require('${Packets[channelId][packetId]}'),`);
//	}
//	console.log(`\t},`);
//}
//console.log(`};\n`);


var Packets = require('../Packets');

for(var channelId in Packets){
	if(!Packets[channelId].name)
		continue;

	var channelName = Packets[channelId].name;

	Packets[channelId].id = parseInt(channelId);
	Packets[channelName] = Packets[channelId];
		
	for(var packetId in Packets[channelId]){
		if(!Packets[channelId][packetId].name)
			continue;

		var packetName = Packets[channelId][packetId].name;

		Packets[channelId][packetId].id = parseInt(packetId);
		Packets[channelId][packetId].channel = parseInt(channelId);
		Packets[channelId][packetId].channelName = channelName;
		Packets[channelId][packetName] = Packets[channelId][packetId];
	}
}


module.exports = Packets;
