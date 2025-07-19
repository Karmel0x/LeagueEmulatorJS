
import { Vector2 } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';

//import WaypointsDrawer from '@repo/tools/pathfinding/waypoints-drawer.js';
//let waypointsDrawer = new WaypointsDrawer();
//let waypointsDrawer: any = undefined;

export default (player: Player, packet: packets.IssueOrderReqModel) => {
	//console.log('handle: c2s.IssueOrderReq');
	//console.log(packet);
	//console.log('position', packet.position, 'waypoints', packet.movementData.waypoints);

	const orderType = packet.orderType;

	const owner = player.owner;
	owner.lastOrderId++;
	owner.issuedOrder = orderType;
	owner.eventEmitter.emit('changeOrder');
	player.packets.chatBoxDebugMessage('c2s.IssueOrderReq', orderType);

	if (orderType === IssueOrderType.moveTo || orderType === IssueOrderType.attackMove) {

		//if (!Server.usePathFinding)
		//	waypointsDrawer?.drawWaypoints(packet.movementData?.waypoints);

		owner.moving.moveTo(packet);
	}
	else if (orderType === IssueOrderType.attackTo) {
		owner.combat.startAttack({
			targetNetId: packet.targetNetId,
			position: packet.position,
		});
	}
	else if (orderType === IssueOrderType.stop || orderType === IssueOrderType.hold) {
		//@todo move to client position ?
		let clientPosition = new Vector2(packet.position.x, packet.position.y);
		console.log('IssueOrderReq STOP client->server distanceTo:', clientPosition.distanceTo(owner.position));

		owner.moving.moveClear();
	}
};
