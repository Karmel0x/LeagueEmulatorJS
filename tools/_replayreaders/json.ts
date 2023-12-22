
import fs from 'fs';


export default function (filePath) {
    let f = fs.readFileSync(filePath);
    let json = JSON.parse(f);

    return json;
}
