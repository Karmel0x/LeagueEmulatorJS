
import slotId from '../../../constants/slotId';
import _Spell from './_Spell';
import Targetedshot from '../../../gameobjects/missiles/Targetedshot';
import packets from '../../../packets/index';

import Unit from '../../../gameobjects/units/Unit';
import { AttackableUnit, BasicAttackOptions, DefendableUnit } from '../../../gameobjects/GameObjects';

export default class _Basicattack extends _Spell {
	spellSlot = slotId.A;
	windupPercent = 20;
	castRange = 0;
	missileSpeed = 2000;

	distanceCalc = 'EDGE_TO_EDGE';

	constructor(options) {
		super(options);

		this.owner.on('changeStats', () => {
			this.castRange = this.owner.stats.attackRange.total;
			this.cooldown = 1 / this.owner.stats.attackSpeed.total;
		});
	}

	// attacking
	attackProcess(target) {
		if (!this.owner.isAbleForAttacking())
			return;

		let basicattack = this.process(this.owner, target, { speed: this.missileSpeed });

		if (this.owner.moving)
			this.owner.moving.moveClear();

		return basicattack;
	}

	beginAttackAns(options) {
		const packet1 = new packets.Basic_Attack_Pos();
		packet1.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		packet1.attack = {
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
		};
		packet1.position = {
			x: this.owner.position.x,
			y: this.owner.position.y,
		};

		this.owner.packets.toVision(packet1);
	}

	nextAttackAns(options) {
		const packet1 = new packets.Basic_Attack();
		packet1.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		packet1.attack = {
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
		};

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

	process(spawner: AttackableUnit, target: DefendableUnit, options: BasicAttackOptions = {}) {
		options.windupPercent = options.windupPercent || this.windupPercent;
		let missile = new Targetedshot({ spawner, target, options });
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
		this.owner.emit('spellCastingEnd', spellData);

		if (this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.castInfo);
	}
}
