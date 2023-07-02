
const fs = require('fs');


module.exports = function (filePath) {
    let f = fs.readFileSync(filePath);
    let json = JSON.parse(f);

    return json;
};
