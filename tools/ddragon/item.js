// downloading item stats from riot api: https://developer.riotgames.com/docs/lol#data-dragon
// run with `node tools/ddragon/item > ../LeagueEmulatorJS_ExternalData/item.json`

const http = require('http');

let url = 'http://ddragon.leagueoflegends.com/cdn/4.20.2/data/en_US/item.json';

function callback(json) {
	let obj = {};
	//for(let i in json.data){
	//	obj[i] = json.data[i].stats;
	//}
	obj = json.data;
	obj = JSON.stringify(obj, null, 2);
	console.log(obj);
}

const req = http.request(url, res => {
	let data = '';
	res.on('data', (chunk) => {
		data += chunk;
	});
	res.on('end', () => {
		//console.log(data);
		data = JSON.parse(data);
		callback(data);
	});
});
req.end();
