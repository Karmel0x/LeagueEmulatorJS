
const fs = require('fs');

var Handlers = {};

var packetDir = __dirname + '/../Handlers/';
fs.readdirSync(packetDir).forEach(function(file){
	if(file.endsWith('.js') && file !== 'index.js')
		Handlers['0x' + file.between('0x', '-')] = `./${file.replace('.js', '')}`;
});

Handlers = Object.keys(Handlers).sort((a, b) => parseInt(a, 16) - parseInt(b, 16)).reduce(
	(obj, key) => {
		obj[key] = Handlers[key];
		return obj;
	}, {}
);

console.log(`module.exports = {`);
for(var packetId in Handlers){
	console.log(`\t${packetId}: require('${Handlers[packetId]}'),`);
}
console.log(`};\n`);
