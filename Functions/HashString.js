// note that these functions are just for development, mostly used for hash spell names
// it's not heavy but for better optimization we should pre generate all possible hashes
const fs = require('fs');


module.exports = class HashString {
	static HashString(path){
		path = path.toLowerCase();

		var hash = 0;
		const magic = 16;
		const mask = 0xF0000000;

		for(var i = 0; i < path.length; i++){
			hash = path.charCodeAt(i) + magic * hash;
			
			let hm = (hash & mask) >>> 0;
			if(hm > 0)
				hash ^= hm ^ hm >>> 24;
		}

		return hash;
	}
	static HashStringSdbm(section, name){
		return HashString.HashStringNorm(section + '*' + name);
	}

	static HashStringNorm(str){
		str = str.toLowerCase();

		var hash = 0;
		const magic = 65599;

		for (var i = 0; i < str.length; i++)
			hash = (str.charCodeAt(i) + magic * hash) >>> 0;

		return hash;
	}

	static HashStringObject_cache = {};
	static HashStringObject(obj, norm = false){
		for(let i in obj){
			if(obj[i])
				continue;

			if(HashString.HashStringObject_cache[i]){
				obj[i] == HashString.HashStringObject_cache[i];
				continue;
			}

			obj[i] = (norm ? HashString.HashStringNorm : HashString.HashString)(i);
			HashString.HashStringObject_cache[i] = obj[i];

			var fd = i + ': ' + obj[i] + ',\n';
			var fn = '../HashString.txt';
			var data = fs.existsSync(fn) ? fs.readFileSync(fn) : '';
			if(!data.includes(fd))
				fs.appendFileSync(fn, fd);

		}
	}
};
