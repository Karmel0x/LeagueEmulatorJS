
import _Spell, { SpellOptions } from './_Spell';
import Targetedshot, { TargetedshotOptions } from '../../../gameobjects/missiles/targetedshot';
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../../constants/slot-id';
import { IAttackable } from '../../../gameobjects/extensions/combat/attackable';
import * as Measure from '../../../gameobjects/extensions/measure';


export type BasicAttackOptions = SpellOptions & {
	owner: IAttackable;
	windupPercent?: number;
	attackSlot?: number;
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
	attackProcess(target) {
		if (!this.owner.isAbleForAttacking())
			return;

		let basicattack = this.process({}, {
			stats: { speed: this.missileSpeed },
			spawner: this.owner,
			target,
		});

		if (this.owner.moving)
			this.owner.moving.moveClear();

		return basicattack;
	}

	beginAttackAns(options) {
		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		const packet1 = packets.Basic_Attack_Pos.create({
			netId: this.owner.netId,
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
			position: {
				x: this.owner.position.x,
				y: this.owner.position.y,
			},
		});

		this.owner.packets.toVision(packet1);
	}

	nextAttackAns(options) {
		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		const packet1 = packets.Basic_Attack.create({
			netId: this.owner.netId,
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
		});

		this.owner.packets.toVision(packet1);
	}

	attackAnsCurrentUnit = 0;//@todo reset it on move?

	attackAns(options) {
		if (this.attackAnsCurrentUnit != options.missile.target.netId) {
			this.attackAnsCurrentUnit = options.missile.target.netId;
			this.beginAttackAns(options);
		}
		else
			this.nextAttackAns(options);
	}

	process(options: Partial<BasicAttackOptions> = {}, targetedshotOptions: Partial<TargetedshotOptions> = {}) {
		options.windupPercent = options.windupPercent || this.windupPercent;
		let missile = new Targetedshot(targetedshotOptions);
		missile.loader();

		this.attackAns({
			missile,
			attackSlot: options.attackSlot ?? 64,
		});
		missile.doFire();
		return missile;
	}

	onCast(spellData) {
		super.onCast(spellData);

		spellData.missile = this.attackProcess(spellData.target);
	}

	async afterCast(spellData) {
		this.owner.eventEmitter.emit('spellCastingEnd', spellData);

		if (this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.castInfo);
	}
}
