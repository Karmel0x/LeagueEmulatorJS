
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';

import { Vector2 } from 'three';
//import IssueOrderReq from '../packets/c2s/0x72-IssueOrderReq';
import Server from '../app/server';
import { IssueOrderType } from '@workspace/packets/packages/packets/base/c2s/0x72-IssueOrderReq';

//import WaypointsDrawer from '@workspace/tools/pathfinding/waypoints-drawer.js';
//let waypointsDrawer = new WaypointsDrawer();
let waypointsDrawer: any = undefined;

export default (player: Player, packet: packets.IssueOrderReqModel) => {
	console.log('handle: c2s.IssueOrderReq');
	//console.log(packet);
	//console.log('position', packet.position, 'waypoints', packet.movementData.waypoints);

	player.eventEmitter.emit('cancelOrder');
	player.combat.autoAttackSoftToggle = false;

	if (packet.orderType == IssueOrderType.moveTo) {

		if (Server.doNotUsePathfinding)
			waypointsDrawer?.drawWaypoints(packet.movementData?.waypoints);

		player.moving.move0(packet);
		//player.eventEmitter.once('reachDestination', () => {
		//	player.autoAttackSoftToggle = true;
		//});
	}
	else if (packet.orderType == IssueOrderType.attackTo) {
		player.combat.castAttack(packet);
	}
	else if (packet.orderType == IssueOrderType.stop) {
		//@todo move to client position ?
		let clientPosition = new Vector2(packet.position.x, packet.position.y);
		console.log('IssueOrderReq STOP client->server distanceTo:', clientPosition.distanceTo(player.position));

		player.moving.moveClear();
	}
};
