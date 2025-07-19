import GameObjectList from "@repo/gameserver/src/app/game-object-list";
import { delay } from "@repo/gameserver/src/core/utils";
import type { Player } from "@repo/gameserver/src/gameobjects/unit-ai";
import { AiSubType } from "@repo/gameserver/src/gameobjects/unit-ai/types";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import { sendMissileReplication, sendSpellCast } from "@repo/gameserver/src/packet-helpers/spell-cast";
import { Vector2WithZ } from "@repo/geometry";
import { HitResult } from "@repo/packets/shared/SCastInfo";
import type Spell from "../base/spell";
import type { CastData } from "../base/spell";


export function pinCastEvents(spell: Spell) {
	spell.eventEmitter.on('cast', async (owner, castData) => {
		const haltedMovement = owner.moving.haltMovement();
		(owner.ai as Player)?.packets?.chatBoxDebugMessage(`waypointsHalt`, owner.moving.waypointsHalt);
		owner.moving.sendWaypoints();

		try {
			//console.log('spell cast', spell.name, '(', HashString.HashString(spell.name), ')', 'at', Math.round(performance.now()));
			const spellCast = new SpellCast(spell, owner, castData);
			await spellCast.castSpell();
		}
		catch (e) {
			if (e instanceof Error) {
				console.error('spell.cast.error', e);
				const ai = owner.ai;
				if (ai && ai.subType === AiSubType.Player) {
					const stackMsg = e.stack?.split('\n')[1];
					(owner.ai as Player)?.packets?.chatBoxDebugMessage(`cast error: ${e.message} ${stackMsg}`);
				}
			}
		}
		finally {
			owner.moving.unhaltMovement(haltedMovement);
			(owner.ai as Player)?.packets?.chatBoxDebugMessage(`waypointsHalt`, owner.moving.waypointsHalt);
		}
	});
}

export class SpellCast {

	spell: Spell;
	owner: AttackableUnit;
	castData: CastData;

	constructor(spell: Spell, owner: AttackableUnit, castData: CastData) {
		this.spell = spell;
		this.owner = owner;
		this.castData = castData;
	}

	targetsToCastTargets(targets: AttackableUnit[]) {
		return targets.map(t => ({
			unitNetId: t.netId,
			hitResult: HitResult.normal,
		}));
	}

	async castSpell(spellVars: any = {}) {
		const { spell, owner, castData } = this;
		const { packet } = castData;

		/**
		 * @todo implement logic for spell cast
		 * - check if owner can cast spell
		 * - get position and targets depending on spell targeting type
		 * - check spell flags (e.g. instant cast, self cast)
		 * - delay for spell windup, cast time, channel duration
		 * - emit events in correct order
		 * - etc.
		 */

		castData.targetPosition = castData.packet.endPosition;
		owner.eventEmitter.emit('spellCast', castData);

		const targets: AttackableUnit[] = [];
		if (packet.targetNetId) {
			const target = GameObjectList.unitByNetId(packet.targetNetId);
			if (target) {
				targets.push(target);
				castData.targetPosition = target.position;
			}
		}

		let castTime = 0;
		let totalTime = 1;

		const e = {
			sendSpellCast: !spell.isMissile,
			sendMissileReplication: spell.isMissile,
			castTime,
			totalTime,
		};

		owner.eventEmitter.emit('preCastSpell', spell, targets, e);
		spell.preCast(owner, castData, spellVars);

		castTime = e.castTime;
		totalTime = e.totalTime;

		const windupTime = castTime / totalTime;
		const lastOrderId = owner.lastOrderId;

		await delay(windupTime * 1000);

		if (spell.canCancel) {
			if (lastOrderId !== owner.lastOrderId) {
				owner.eventEmitter.emit('cancelSpellCast', spell);
				return;
			}
		}

		const castingTime = castTime - windupTime;
		await delay(castingTime * 1000);

		let castNetId = ++GameObjectList.lastNetId;

		const channelDuration = 0;
		const designerTotalTime = channelDuration > 0 ? (castTime + channelDuration) : totalTime;

		const targetPosition = packet.position;
		const targetPositionEnd = packet.endPosition;

		if (e.sendSpellCast) {
			sendSpellCast(owner, {
				packageHash: spell.packageHash,
				spellHash: spell.name,
				castNetId,
				targetPosition,
				targetPositionEnd,
				targets: this.targetsToCastTargets(targets),
				//startCastTime: 0,
				designerCastTime: castTime,
				//extraCastTime: 0,
				designerTotalTime,
				cooldown: 0.01,
				spellSlot: castData.packet.slot,
			});
		}

		spell.onCast(owner, castData, spellVars);

		if (e.sendMissileReplication && spellVars.missile) {
			const missile = spellVars.missile;

			const startPoint = {
				x: missile.position.x,
				y: missile.position.y,
				z: 60,
			};

			sendMissileReplication(owner, {
				packageHash: spell.packageHash,
				spellHash: spell.name,
				castNetId,
				targetPosition,
				targetPositionEnd,
				targets: this.targetsToCastTargets(targets),
				//startCastTime: 0,
				designerCastTime: -1,//castTime,
				//extraCastTime: 0,
				designerTotalTime,
				cooldown: 0.01,
				spellSlot: castData.packet.slot,
				//isOverrideCastPosition: true,
				missileNetId: missile.netId,
			}, {
				position: startPoint,
				direction: Vector2WithZ.from(missile.direction, 0),
				startPoint: startPoint,
				endPoint: targetPositionEnd,
				unitPosition: owner.position,
				speed: 1200,
			});
		}

		await spell.postCast(owner, castData, spellVars);
	}

}
