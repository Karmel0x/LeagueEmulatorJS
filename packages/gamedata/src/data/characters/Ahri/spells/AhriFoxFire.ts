
import GameObjectList from '@repo/gameserver/src/app/game-object-list';
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import * as Measure from '@repo/gameserver/src/gameobjectextensions/measure';
import { BuffAddType, type BuffInstance, type BuffStackInstance } from '@repo/gameserver/src/gameobjectextensions/traits/buff-manager';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { sendUnitParticle, sendUnitParticleRemove } from '@repo/gameserver/src/packet-helpers';
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import type { CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import AhriFoxFireMissile from './AhriFoxFireMissile';


const ORB_COUNT = 3;
const ORB_RANGE = 500;
const DURATION_MS = 5000;
const TICK_RATE_S = 0.25;

export default class AhriFoxFire extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.w;
	canMoveWhenCast = true;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0,
		designerTotalTime: 0,
	};

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		// Cast effects on Ahri
		sendUnitParticle(owner, [
			{
				packageHash: package1.packageHash,
				effectNameHash: 'Ahri_FoxFire_cas.troy',
				flags: 32,
				boneNameHash: 'root',
				createData: [{
					casterNetId: owner.netId,
					positionNCC: owner.position,
					ownerPositionNCC: owner.position,
					targetPositionNCC: owner.position,
				}],
			},
			{
				packageHash: package1.packageHash,
				effectNameHash: 'Ahri_FoxFire_weapon_cas.troy',
				flags: 32,
				boneNameHash: 'root',
				createData: [{
					casterNetId: owner.netId,
					positionNCC: owner.position,
					ownerPositionNCC: owner.position,
					targetPositionNCC: owner.position,
				}],
			},
		]);

		const buffSpell = new AhriFoxFireMissile();

		// Spawn one orbiting orb particle per stack
		buffSpell.eventEmitter.on('buffActivate', (buffOwner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => {
			const effectIds = sendUnitParticle(buffOwner, [{
				packageHash: package1.packageHash,
				effectNameHash: 'Ahri_FoxFire_mis.troy',
				flags: 32,
				boneNameHash: 'root',
				createData: [{
					casterNetId: owner.netId,
					positionNCC: buffOwner.position,
					ownerPositionNCC: buffOwner.position,
					targetPositionNCC: buffOwner.position,
				}],
			}]);

			stack.instanceVars.effectId = effectIds[0]?.[0];
		});

		// Each orb independently looks for nearest enemy to fire at
		buffSpell.eventEmitter.on('buffUpdateActions', (buffOwner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => {
			const ownerTeamId = buffOwner.team.id;

			const enemies = GameObjectList.aliveUnits.filter(u =>
				u.team.id !== ownerTeamId &&
				u.combat.canBeAttacked() &&
				u.characterState.targetable,
			);

			const inRange = Measure.edgeToEdge.filterByRange(buffOwner, enemies, ORB_RANGE);
			if (!inRange.length)
				return;

			Measure.centerToCenter.sortByDistance(buffOwner, inRange);
			const target = inRange[0]!;

			target.combat.damage(owner, {
				damageAmount: 60,
				damageType: DamageType.magic,
				damageSource: DamageSource.spell,
			});

			// Hit effect on target
			sendUnitParticle(target, [{
				packageHash: package1.packageHash,
				effectNameHash: 'Ahri_FoxFire_tar.troy',
				flags: 32,
				boneNameHash: 'root',
				createData: [{
					casterNetId: owner.netId,
					positionNCC: target.position,
					ownerPositionNCC: buffOwner.position,
					targetPositionNCC: target.position,
				}],
			}]);

			buff.removeStack(stack);
		});

		// Kill orb particle on fire or expiry (removeStack always triggers buffDeactivate)
		buffSpell.eventEmitter.on('buffDeactivate', (buffOwner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => {
			const effectId = stack.instanceVars.effectId as number | undefined;
			if (effectId)
				sendUnitParticleRemove(buffOwner, effectId);
		});

		owner.buffManager.addBuff(buffSpell, owner, {
			addType: BuffAddType.stacksAndRenews,
			buffType: BuffType.combatEnchancer,
			maxStack: ORB_COUNT,
			numberOfStacks: ORB_COUNT,
			duration: DURATION_MS,
			tickRate: TICK_RATE_S,
		});
	}

}
