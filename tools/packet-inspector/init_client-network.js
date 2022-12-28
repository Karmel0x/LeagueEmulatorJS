
const enet = require('../../Core/enet');
//const Handlers = require('../../Core/Handlers');


async function init_network(handlers = null) {
	var enet_initialize = Boolean(enet.initialize_client(5119, "127.0.0.1", "17BLOhi6KZsTtldTsizvHg=="));
	console.log('enet_initialize:', enet_initialize);
	if (!enet_initialize)
		return false;

	var q = {};
	while (true) {
		q = enet.netLoop();
		if (typeof q.type == 'undefined') {//no packets atm
			await Promise.wait(1);//don't overload cpu
			continue;
		}

		if (q.type == enet.ENET_EVENT_TYPE_RECEIVE) {
			handlers(q);
		}
	}
}

module.exports = init_network;
