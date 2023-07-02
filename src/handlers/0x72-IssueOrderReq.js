
const { Vector2 } = require('three');
const IssueOrderReq = require('../packets/C2S/0x72-IssueOrderReq');
const Server = require('../app/Server');


let waypointsDrawer = null;
try {
	require('canvas');
	const WaypointsDrawer = require('../tools/pathfinding/WaypointsDrawer');
	waypointsDrawer = new WaypointsDrawer();
} catch (e) {
	//console.log(e);
}


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	//console.log('handle: C2S.IssueOrderReq');
	//console.log(packet);
	//console.log('position', packet.position, 'waypoints', packet.movementData.waypoints);

	player.combat.attackTarget = null;
	player.combat.acquisitionManual = null;
	player.combat.autoAttackSoftToggle = false;

	if (packet.orderType == IssueOrderReq.types.MOVETO) {

		if (Server.doNotUsePathfinding)
			waypointsDrawer?.drawWaypoints(packet.movementData.waypoints);

		player.moving.move0(packet);
		//player.once('reachDestination', () => {
		//	player.autoAttackSoftToggle = true;
		//});
	}
	else if (packet.orderType == IssueOrderReq.types.ATTACKTO) {
		player.combat.castAttack(packet);
	}
	else if (packet.orderType == IssueOrderReq.types.STOP) {
		//@todo move to client position ?
		let clientPosition = new Vector2(packet.position.x, packet.position.y);
		console.log('IssueOrderReq STOP client->server distanceTo:', clientPosition.distanceTo(player.position));

		player.moving.moveClear();
	}
};
