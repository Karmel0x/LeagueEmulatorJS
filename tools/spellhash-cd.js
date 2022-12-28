const { HashStringObject } = require("../Functions/HashString");
const fs = require('fs');

const clientPath = 'LOL_CLIENT_PATH';
var spellHash = {};

const path = clientPath + '\\DATA\\Characters';
if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
	const files = fs.readdirSync(path);
	for (const file of files) {
		const path2 = path + '\\' + file + '\\Spells';
		if (fs.existsSync(path2) && fs.lstatSync(path2).isDirectory()) {
			const files2 = fs.readdirSync(path2);
			for (const file2 of files2) {
				if (file2.includes('.inibin'))
					spellHash[file2.replace('.inibin', '')] = 0;
			}
		}
	}
}

const path2 = clientPath + '\\DATA\\Spells';
if (fs.existsSync(path2) && fs.lstatSync(path2).isDirectory()) {
	const files2 = fs.readdirSync(path2);
	for (const file2 of files2) {
		if (file2.includes('.inibin'))
			spellHash[file2.replace('.inibin', '')] = 0;
	}
}

HashStringObject(spellHash);
console.log(spellHash);
