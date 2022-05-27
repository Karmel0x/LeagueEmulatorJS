
module.exports = function(filePath){
	console.log('_replayreaders', filePath);

	var replayUnpacked = null;
	if(filePath.endsWith('.json')) {
		replayUnpacked = require('../_replayreaders/json.js')(filePath);
	}
	else if(filePath.endsWith('.lrpkt')) {
		replayUnpacked = require('../_replayreaders/lrpkt.js')(filePath);
	}

	return replayUnpacked;
};
