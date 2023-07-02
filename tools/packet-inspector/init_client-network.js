
const enet = require('../../../enetcppjs');
//const handlers = require('../../src/core/handlers');


async function init_network(handlers = null) {
	let enetInitialize = Boolean(enet.initialize_client(5119, "127.0.0.1", "17BLOhi6KZsTtldTsizvHg=="));
	console.log('enetInitialize:', enetInitialize);
	if (!enetInitialize)
		return false;

	let q = {};
	for (; ;) {
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
