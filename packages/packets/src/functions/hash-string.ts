
import fs from 'fs';

/**
 * Hash string with sdbm hash algorithm
 * these functions are just for development, mostly used for hash spell names
 * it's not heavy but for better optimization all possible hashes should be pre generated
 */
export default class HashString {
	static debug = true;

	static saveToFile(id: string, hash: number, hashTyp: number) {
		if (!this.debug)
			return;

		const tempDir = '../../temp/';
		if (!fs.existsSync(tempDir))
			return;

		let fn = 'HashString.txt';
		let fp = tempDir + fn;

		let fd = id + ': [' + hashTyp + '] ' + hash + ',\n';
		let data = fs.existsSync(fp) ? fs.readFileSync(fp) : '';
		if (!data.includes(fd)) {
			try {
				fs.appendFileSync(fp, fd);
			}
			catch (err) {
				console.log(err);
			}
		}
	}

	/**
	 * Hash string with sdbm hash algorithm
	 */
	static HashString(path: string): number {
		if (!path)
			return 0;

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

		this.saveToFile(path, hash, 1);
		return hash;
	}

	static HashString2(path: string): number {
		if (!path)
			return 0;

		path = path.toLowerCase();

		let hash = 0;
		const magic = 4;
		const mask = 0xF0000000;

		for (let i = 0; i < path.length; i++) {
			hash = (hash << magic) + path.charCodeAt(i);

			let hm = (hash & mask) >>> 0;
			if (hm > 0)
				hash ^= hm ^ hm >>> 24;
		}

		this.saveToFile(path, hash, 3);
		return hash;
	}

	static HashStringSdbm(section: string, name: string) {
		if (!section && !name)
			return 0;

		return HashString.HashStringNorm(section + '*' + name);
	}

	static HashStringNorm(str: string) {
		if (!str)
			return 0;

		str = str.toLowerCase();

		let hash = 0;
		const magic = 65599;

		for (let i = 0; i < str.length; i++)
			hash = (str.charCodeAt(i) + magic * hash) >>> 0;

		this.saveToFile(str, hash, 2);
		return hash;
	}

	static HashStringObject_cache: { [s: string]: number; } = {};

	static HashStringObject(obj: { [s: string]: number; }, norm = false) {
		for (const i in obj) {
			if (obj[i])
				continue;

			if (this.HashStringObject_cache[i]) {
				obj[i] === this.HashStringObject_cache[i];
				continue;
			}

			if (norm)
				obj[i] = this.HashStringNorm(i);
			else
				obj[i] = this.HashString(i);

			this.HashStringObject_cache[i] = obj[i];
		}
	}
}
