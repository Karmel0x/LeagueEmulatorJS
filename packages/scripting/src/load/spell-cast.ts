import GameObjectList from "@repo/gameserver/src/app/game-object-list";
import { delay } from "@repo/gameserver/src/core/utils";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import { sendMissileReplication, sendSpellCast } from "@repo/gameserver/src/packet-helpers/spell-cast";
import { Vector2WithZ } from "@repo/geometry";
import { defaultHeight } from "@repo/geometry/vector2-with-z";
import { HitResult } from "@repo/packets/shared/SCastInfo";
import type Spell from "../base/spell";
import type { CastData } from "../base/spell";


export type CastVars = any;

export class SpellCast {

	spell: Spell;
	owner: AttackableUnit;
	castData: CastData;
	castVars: CastVars = {};

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

	async castSpell(onSuccessCast = () => { }) {
		const { spell, owner, castData, castVars } = this;
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

		onSuccessCast();

		castData.targetPosition = castData.packet.endPosition;
		owner.eventEmitter.emit('spellCast', castData);

		const targets: AttackableUnit[] = [];
		if (packet.targetNetId) {
			const target = GameObjectList.unitByNetId(packet.targetNetId);
			if (target) {
				targets.push(target);
				castData.targetPosition = target.position;
				castData.target = target;
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

		owner.eventEmitter.emit('preCastSpell', castData, targets, e);
		spell.preCast(owner, castData, castVars);

		castTime = e.castTime;
		totalTime = e.totalTime;

		const windupTime = Math.min(castTime / totalTime, castTime);
		const lastOrderId = owner.lastOrderId;

		await delay(windupTime * 1000);

		if (spell.canCancel) {
			if (lastOrderId !== owner.lastOrderId) {
				owner.eventEmitter.emit('cancelSpellCast', castData);
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

		spell.onCast(owner, castData, castVars);

		if (e.sendMissileReplication && castVars.missile) {
			const missile = castVars.missile;

			const startPoint = {
				x: missile.position.x,
				y: missile.position.y,
				z: defaultHeight,
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

		await spell.postCast(owner, castData, castVars);
	}

}
