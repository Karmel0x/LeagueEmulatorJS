
const enet = require('../../../enetcppjs/build/Release/enetcppjs.node');
//const Handlers = require('./Handlers');


async function init_network(){
	var enet_initialize = Boolean(enet.initialize_client());
	console.log('enet_initialize:', enet_initialize);
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
			//Handlers(q);
		}
	}
}

module.exports = init_network;
