const enet = require('./enet');
//const Handlers = require('./Handlers');


global.PlayerPeers = global.PlayerPeers || {};


/**
 * Start enet server
 * @param {Object} config {port, host, blowfishKey}
 * @param {Function} handlers 
 */
async function init_network(config = {port: 5119, host: "127.0.0.1", blowfishKey: "17BLOhi6KZsTtldTsizvHg=="}, handlers = require('./Handlers')){
	var enet_initialize = Boolean(enet.initialize(config.port, config.host, config.blowfishKey));
	console.log('enet_initialize:', enet_initialize, config);
	if(!enet_initialize)
		return false;
		
	var q = {};
	while(true){
		q = enet.netLoop();
		if(typeof q.type === 'undefined'){//no packets atm
			await global.Utilities.wait(1);//don't overload cpu
			continue;
		}

		if(q.type == enet.ENET_EVENT_TYPE_RECEIVE){
			handlers(q);
		}
	}
}

module.exports = init_network;
