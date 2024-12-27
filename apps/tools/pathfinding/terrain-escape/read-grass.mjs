import sharp from 'sharp';

/**
 * @param {string} imagePath 
 */
async function readImage(imagePath) {
    const image = sharp(imagePath);

    const metadata = await image.metadata();
    const { width, height } = metadata;

    const { data } = await image.raw().toBuffer({ resolveWithObject: true });
    const colorArray = [];

    for (let x = 0; x < width; x++) {
        let row = [];
        for (let y = 0; y < height; y++) {
            const index = (x * width + y) * 3;

            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            row.push([r, g, b]);
        }
        colorArray.push(row);
    }

    //{
    //    // test
    //    colorArray.shift();
    //    colorArray.forEach(v => {
    //        v.unshift(0);
    //    });
    //}

    return colorArray;
}

async function main() {
    const image = await readImage('./AIPath.VisionPathing.jpg');

    const grass = image.map(v => v.map(v => v[1] > 0x50 && v[1] < 0xba ? 1 : 0));

    console.log(JSON.stringify(grass).replaceAll('],[', '],\n['));
}

main();
