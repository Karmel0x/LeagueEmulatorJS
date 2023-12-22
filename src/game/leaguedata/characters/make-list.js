
import fs from 'fs';

async function main() {
    let dir = './src/game/leaguedata/characters';
    if (fs.existsSync('make-list.js'))
        dir = '.';

    let files = fs.readdirSync(dir);
    files = files.filter(file => fs.lstatSync(dir + '/' + file).isDirectory());
    files = files.filter(file => !file.startsWith('_'));

    let exports = files.map(file => `export { default as ${file} } from './${file}/index';`).join('\n');

    let index = '\n' + exports + '\n';
    fs.writeFileSync(dir + '/index.ts', index);
}

main();
