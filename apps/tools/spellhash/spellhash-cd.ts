import HashString from '@repo/packets/functions/hash-string';
import { glob } from 'glob';

const clientPath = process.argv[2] || 'LOL_CLIENT_PATH';
const extensions = process.argv[3] || '.{inibin,luaobj,troybin}';

async function main() {
	let files = await glob(`${clientPath}/**/*${extensions}`);
	let spellHash: Record<string, number> = {};

	for (let i = 0; i < files.length; i++) {
		let file = files[i]!;
		const path = file.split('\\');
		let last = path[path.length - 1];
		if (!last)
			continue;

		const name = last.split('.')[0]!;
		spellHash[name] = 0;
	}

	HashString.HashStringObject(spellHash);
	console.log(spellHash);
}

main();
