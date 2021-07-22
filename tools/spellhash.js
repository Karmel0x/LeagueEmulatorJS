const { HashString } = require("../Functions/HashString");


var strings = ['SummonerHeal', 'SummonerFlash', 'EzrealMysticShot', 'EzrealMysticShotMissile'];
for(let i in strings){
	var hash = HashString(strings[i]);
	console.log(strings[i], hash, hash.toString(16));
}
