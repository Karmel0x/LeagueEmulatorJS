const enet = require('../enetcppjs/build/Release/enetcppjs.node');
const Handlers = require('./Handlers');
//module.exports = { enet };


function wait(ms){
	return new Promise(resolve => setTimeout(() => resolve(null), ms));
}

async function server_init(){
	var enet_initialize = Boolean(enet.initialize());
	console.log('enet_initialize: ' + enet_initialize.toString());
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
server_init();


//process.on('uncaughtException', function (err) {
//	console.log(err);
//	console.log(err.stack);
//});
