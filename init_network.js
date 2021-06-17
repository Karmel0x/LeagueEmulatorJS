const enet = require('../enetcppjs/build/Release/enetcppjs.node');
const Handlers = require('./Handlers');


function wait(ms){
	return new Promise(resolve => setTimeout(() => resolve(null), ms));
}

async function init_network(){
	var enet_initialize = Boolean(enet.initialize());
	console.log('enet_initialize:', enet_initialize);
	var q = {};
	while(true){
		q = enet.netLoop();
		if(typeof q.type === 'undefined'){//no packets atm
			await wait(1);//don't overload cpu
			continue;
		}

		if(q.type == enet.ENET_EVENT_TYPE_RECEIVE){
			Handlers(q);
		}
	}
}

module.exports = init_network;