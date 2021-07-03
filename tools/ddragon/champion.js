// downloading champion stats from riot api: https://developer.riotgames.com/docs/lol#data-dragon
// run with `node ddragon/champion > ../../LeagueEmulatorJS_ExternalData/Champion_Stats.json`

const http = require('http');

var url = 'http://ddragon.leagueoflegends.com/cdn/4.20.2/data/en_US/champion.json';

function callback(json){
	var obj = {};
	for(var i in json.data){
		obj[i] = json.data[i].stats;
	}
	obj = JSON.stringify(obj, null, 2);
	console.log(obj);
}

const req = http.request(url, res => {
	var data = '';
	res.on('data', (chunk) => {
		data += chunk;
	});
	res.on('end', () => {
		data = JSON.parse(data);
		//console.log(data);
		callback(data);
	});
});
req.end();
