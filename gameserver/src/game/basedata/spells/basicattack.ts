
import _Spell, { SpellData, SpellOptions } from './spell';
import Targetedshot, { TargetedshotOptions } from '../../../gameobjects/missiles/targetedshot';
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../../constants/slot-id';
import * as Measure from '../../../gameobjects/extensions/measure';
import type GameObject from '../../../gameobjects/game-object';


export type BasicAttackOptions = SpellOptions & {
	//windupPercent?: number;
	//attackSlot?: number;
	//missile?: Targetedshot;
};

export default class _Basicattack extends _Spell {
	spellSlot = SlotId.A;
	windupPercent = 20;
	castRange = 0;
	missileSpeed = 2000;

	measure = Measure.edgeToEdge;

	constructor(options: BasicAttackOptions) {
		super(options);

		this.owner.eventEmitter.on('changeStats', () => {
			this.castRange = this.owner.stats.attackRange.total;
			this.cooldown = 1 / this.owner.stats.attackSpeed.total;
		});
	}

	// attacking
	attackProcess(target: GameObject) {
		if (!this.owner.isAbleForAttacking())
			return;

		let basicattack = this.process({
			stats: { speed: this.missileSpeed },
			spawner: this.owner,
			target,
		});

		return basicattack;
	}

	beginAttackAns(missile: Targetedshot) {
		let targetPosition = {
			x: missile.target.position.x,
			y: missile.target.position.y,
			z: 10,
		};

		const packet1 = packets.Basic_Attack_Pos.create({
			netId: this.owner.netId,
			targetNetId: missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: this.spellSlot,
			missileNextId: missile.netId,
			extraTime: 127,
			position: {
				x: this.owner.position.x,
				y: this.owner.position.y,
			},
		});

		this.owner.packets.toVision(packet1);
	}

	nextAttackAns(missile: Targetedshot) {
		let targetPosition = {
			x: missile.target.position.x,
			y: missile.target.position.y,
			z: 10,
		};

		const packet1 = packets.Basic_Attack.create({
			netId: this.owner.netId,
			targetNetId: missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: this.spellSlot,
			missileNextId: missile.netId,
			extraTime: 127,
		});

		this.owner.packets.toVision(packet1);
	}

	attackAnsCurrentUnit = 0;//@todo reset it on move?

	attackAns(missile: Targetedshot) {
		if (this.attackAnsCurrentUnit != missile.target.netId) {
			this.attackAnsCurrentUnit = missile.target.netId;
			this.beginAttackAns(missile);
		}
		else
			this.nextAttackAns(missile);
	}

	process(targetedshotOptions: TargetedshotOptions) {
		let missile = Targetedshot.initialize(targetedshotOptions);

		this.attackAns(missile);
		missile.doFire();

		return missile;
	}

	onCast(spellData: SpellData) {
		if (!spellData.target)
			return;

		super.onCast(spellData);

		spellData.spellChain.missile = this.attackProcess(spellData.target);
	}

	async afterCast(spellData: SpellData) {
		if (!spellData.spellCast)
			return;

		this.owner.eventEmitter.emit('spellCastingEnd', spellData);

		if (this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.castInfo);
	}
}
