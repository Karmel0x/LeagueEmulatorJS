// note that these functions are just for development, mostly used for hash spell names
// it's not heavy but for better optimization we should pre generate all possible hashes
const fs = require('fs');

function HashString(path){
	path = path.toLowerCase();

	var hash = 0;
	var mask = 0xF0000000;
	for(var i = 0; i < path.length; i++){
		hash = path.charCodeAt(i) + 0x10 * hash;
		if((hm = (hash & mask) >>> 0) > 0)
			hash ^= hm ^ hm >>> 24;
	}

	return hash;
}
function HashStringSdbm(section, name){
	return HashStringNorm(section + '*' + name);
}

function HashStringNorm(str){
	str = str.toLowerCase();

	var hash = 0;

	for (var i = 0; i < str.length; i++)
		hash = (str.charCodeAt(i) + 65599 * hash) >>> 0;

	return hash;
}

var HashStringObject_cache = {};
function HashStringObject(obj, norm = false){
	for(let i in obj){
		if(obj[i])
			continue;

		if(HashStringObject_cache[i]){
			obj[i] == HashStringObject_cache[i];
			continue;
		}

		obj[i] = (norm ? HashStringNorm : HashString)(i);
		HashStringObject_cache[i] = obj[i];

		var fd = i + ': ' + obj[i] + ',\n';
		var fn = '../HashString.txt';
		var data = fs.existsSync(fn) ? fs.readFileSync(fn) : '';
		if(!data.includes(fd))
			fs.appendFileSync(fn, fd);

	}
}

module.exports = {HashString, HashStringSdbm, HashStringNorm, HashStringObject};