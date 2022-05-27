
const fs = require('fs');


module.exports = function(filePath) {
    var f = fs.readFileSync(filePath);
	var json = JSON.parse(f);

    return json;
};
