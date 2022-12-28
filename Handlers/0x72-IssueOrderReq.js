
const { Vector2 } = require('three');
const IssueOrderReq = require('../Packets/C2S/0x72-IssueOrderReq');


var waypointsDrawer = null;
try {
	require('canvas');
	const WaypointsDrawer = require('../tools/pathfinding/WaypointsDrawer');
	waypointsDrawer = new WaypointsDrawer();
} catch (e) {
	//console.log(e);
}


module.exports = (player, packet) => {
	//console.log('handle: C2S.IssueOrderReq');
	//console.log(packet);
	//console.log('position', packet.position, 'waypoints', packet.movementData.waypoints);

	player.attackTarget = null;
	player.acquisitionManual = null;
	player.autoAttackSoftToggle = false;

	if (packet.orderType == IssueOrderReq.types.MOVETO) {

		if (global.doNotUsePathfinding)
			waypointsDrawer?.drawWaypoints(packet.movementData.waypoints);

		player.move0(packet);
		//player.once('reachDestination', () => {
		//	player.autoAttackSoftToggle = true;
		//});
	}
	else if (packet.orderType == IssueOrderReq.types.ATTACKTO) {
		player.acquisitionManual = packet.targetNetId;
		player.autoAttackSoftToggle = true;
	}
	else if (packet.orderType == IssueOrderReq.types.STOP) {
		//@todo move to client position ?
		var clientPosition = new Vector2(packet.position.x, packet.position.y);
		console.log('IssueOrderReq STOP client->server distanceTo:', clientPosition.distanceTo(player.position));

		player.moveClear();
	}
};
