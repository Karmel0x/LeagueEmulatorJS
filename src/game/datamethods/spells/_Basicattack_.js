
const slotId = require('../../../constants/slotId');
const _Spell = require("./_Spell");
const Targetedshot = require("../../../gameobjects/missiles/Targetedshot");
const Server = require('../../../app/Server');

/**
 * @typedef {import('../../../gameobjects/units/Unit')} Unit
 */

module.exports = class _Basicattack extends _Spell {
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
		const Basic_Attack_Pos = Server.network.createPacket('Basic_Attack_Pos', 'S2C');
		Basic_Attack_Pos.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		Basic_Attack_Pos.attack = {
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
		};
		Basic_Attack_Pos.position = {
			x: this.owner.position.x,
			y: this.owner.position.y,
		};

		this.owner.packets.toVision(Basic_Attack_Pos);
	}

	nextAttackAns(options) {
		const Basic_Attack = Server.network.createPacket('Basic_Attack', 'S2C');
		Basic_Attack.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		Basic_Attack.attack = {
			targetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			attackSlot: options.attackSlot,
			missileNextId: options.missile.netId,
			extraTime: 127,
		};

		this.owner.packets.toVision(Basic_Attack);
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

	/**
	 * 
	 * @param {import('../../../gameobjects/GameObjects').AttackableUnit} spawner
	 * @param {import('../../../gameobjects/GameObjects').DefendableUnit} target
	 * @param {Object} options
	 * @returns {Targetedshot}
	 */
	process(spawner, target, options = {}) {
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
};
