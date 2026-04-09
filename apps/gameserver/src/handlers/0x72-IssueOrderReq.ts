
import { Vector2 } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import { humanizeDecimal } from '../core/utils';
import type Player from '../gameobjects/unit-ai/player';

//import WaypointsDrawer from '@repo/tools/pathfinding/waypoints-drawer.js';
//let waypointsDrawer = new WaypointsDrawer();
//let waypointsDrawer: any = undefined;

export default (player: Player, packet: packets.IssueOrderReqModel) => {
	//console.log('handle: c2s.IssueOrderReq');
	//console.log(packet);
	//console.log('position', packet.position, 'waypoints', packet.movementData?.waypoints);

	const owner = player.owner;
	const orderType = packet.orderType;
	//player.packets.chatBoxDebugMessage('c2s.IssueOrderReq', orderType);

	const characterState = owner.characterState;
	if (characterState.halted)
		return;
	if (characterState.taunted || characterState.feared || characterState.charmed)
		return;

	if (owner.issuedOrder !== orderType) {
		owner.issueOrder(orderType);
	}

	if (orderType === IssueOrderType.moveTo || orderType === IssueOrderType.attackMove) {
		//if (config.debugging.enabled && config.debugging.noPathFinding)
		//	waypointsDrawer?.drawWaypoints(packet.movementData?.waypoints);

		owner.moving.moveTo(packet);
	}
	else if (orderType === IssueOrderType.attackTo) {
		const target = GameObjectList.unitByNetId(packet.targetNetId);
		if (!target) {
			//throw new Error('target does not exists');
			console.log('target does not exists', packet.targetNetId);
			return;
		}

		const waypoints = packet.movementData?.waypoints;
		if (!waypoints) {
			owner.combat.startAttackAndFollow(target, {
				targetNetId: packet.targetNetId,
				position: packet.position,
			});
			return;
		}

		const attackRange = owner.stats.attackRange.total || 400;
		const attackRange2E = attackRange + target.collisionRadius;

		if (owner.distanceTo(target) < attackRange2E) {
			owner.combat.startAttackAndFollow(target, {
				targetNetId: packet.targetNetId,
				position: packet.position,
			});
			return;
		}

		const lastWaypoint = waypoints[waypoints.length - 1]!;
		const distanceToLastWaypoint = target.distanceTo(lastWaypoint);
		if (distanceToLastWaypoint > attackRange2E) {
			owner.combat.startAttackAndFollow(target, {
				targetNetId: packet.targetNetId,
				position: packet.position,
			});
			return;
		}

		owner.moving.moveTo2(waypoints);

		owner.moving.onceWhenInRange(target, attackRange2E, () => {
			owner.combat.startAttackAndFollow(target, {
				targetNetId: packet.targetNetId,
				position: packet.position,
			});
		});
	}
	else if (orderType === IssueOrderType.stop || orderType === IssueOrderType.hold) {
		//@todo move to client position ?
		let clientPosition = new Vector2(packet.position.x, packet.position.y);
		player.packets.chatBoxDebugMessage('IssueOrderReq STOP client->server distanceTo:', humanizeDecimal(clientPosition.distanceTo(owner.position)));

		owner.moving.moveClear();
	}
};
