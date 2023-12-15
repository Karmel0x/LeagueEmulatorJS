// note that these functions are just for development, mostly used for hash spell names
// it's not heavy but for better optimization we should pre generate all possible hashes
import fs from 'fs';


export default class HashString {
	/**
	 * Hash string with sdbm hash algorithm
	 * @param {string} path 
	 * @returns {number}
	 */
	static HashString(path) {
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

	/**
	 * 
	 * @param {string} section 
	 * @param {string} name 
	 * @returns 
	 */
	static HashStringSdbm(section, name) {
		return HashString.HashStringNorm(section + '*' + name);
	}

	/**
	 * 
	 * @param {string} str 
	 * @returns 
	 */
	static HashStringNorm(str) {
		str = str.toLowerCase();

		let hash = 0;
		const magic = 65599;

		for (let i = 0; i < str.length; i++)
			hash = (str.charCodeAt(i) + magic * hash) >>> 0;

		return hash;
	}

	/** @type {Object.<string, number>} */
	static HashStringObject_cache = {};

	/**
	 * 
	 * @param {Object.<string, number>} obj 
	 * @param {boolean} norm 
	 */
	static HashStringObject(obj, norm = false) {
		for (let i in obj) {
			if (obj[i])
				continue;

			if (this.HashStringObject_cache[i]) {
				obj[i] == this.HashStringObject_cache[i];
				continue;
			}

			if (norm)
				obj[i] = this.HashStringNorm(i);
			else
				obj[i] = this.HashString(i);

			this.HashStringObject_cache[i] = obj[i];

			let fd = i + ': ' + obj[i] + ',\n';
			let fn = '../HashString.txt';
			let data = fs.existsSync(fn) ? fs.readFileSync(fn) : '';
			if (!data.includes(fd))
				fs.appendFileSync(fn, fd);

		}
	}
}
