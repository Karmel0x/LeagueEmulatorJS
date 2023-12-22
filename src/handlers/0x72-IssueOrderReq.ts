
import { Vector2 } from 'three';
import IssueOrderReq from '../packets/C2S/0x72-IssueOrderReq';
import Server from '../app/Server';
import Player from '../gameobjects/units/Player';

let waypointsDrawer: WaypointsDrawer | undefined = undefined;
//async function initWaypointsDrawer() {
//	try {
//		import('canvas');
//		const WaypointsDrawer = (await import('../../tools/pathfinding/WaypointsDrawer.js')).default;
//		waypointsDrawer = new WaypointsDrawer();
//	} catch (e) {
//		//console.log(e);
//	}
//}
//initWaypointsDrawer();


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x72-IssueOrderReq.js').struct} packet 
 */
export default (player: Player, packet: typeof IssueOrderReq.struct) => {
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
