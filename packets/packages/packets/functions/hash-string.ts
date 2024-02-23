
import fs from 'fs';

/**
 * Hash string with sdbm hash algorithm
 * these functions are just for development, mostly used for hash spell names
 * it's not heavy but for better optimization all possible hashes should be pre generated
 */
export default class HashString {
	static debug = true;

	/**
	 * Hash string with sdbm hash algorithm
	 */
	static HashString(path: string): number {
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

	static HashStringSdbm(section: string, name: string) {
		return HashString.HashStringNorm(section + '*' + name);
	}

	static HashStringNorm(str: string) {
		str = str.toLowerCase();

		let hash = 0;
		const magic = 65599;

		for (let i = 0; i < str.length; i++)
			hash = (str.charCodeAt(i) + magic * hash) >>> 0;

		return hash;
	}

	static HashStringObject_cache: { [s: string]: number; } = {};

	static HashStringObject(obj: { [s: string]: number; }, norm = false) {
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

			if (this.debug) {
				let fd = i + ': ' + obj[i] + ',\n';
				let fn = '../temp/HashString.txt';
				let data = fs.existsSync(fn) ? fs.readFileSync(fn) : '';
				if (!data.includes(fd))
					fs.appendFileSync(fn, fd);
			}
		}
	}
}
