
const slotId = require('../../../Constants/slotId');
const _Spell = require("./_Spell");
const Targetedshot = require("../../../GameObjects/Missiles/Targetedshot");


module.exports = class _Basicattack extends _Spell {
	spellSlot = slotId.A;
	windupPercent = 20;
	castRange = 0;
	missileSpeed = 2000;

	distanceCalc = 'EDGE_TO_EDGE';

	constructor(options) {
		super(options);

		this.owner.on('changeStats', () => {
			this.castRange = this.owner.attackRange.total;
			this.cooldown = 1 / this.owner.attackSpeed.total;
		});
	}

	// attacking
	attackProcess(target) {
		if (!this.owner.isAbleForAttacking())
			return;

		var bassicattack = this.process(this.owner, target, { speed: this.missileSpeed });

		if (this.owner.moveClear)
			this.owner.moveClear();

		return bassicattack;
	}

	beginAttackAns(options) {
		var Basic_Attack_Pos = global.Network.createPacket('Basic_Attack_Pos', 'S2C');
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

		this.owner.sendTo_vision(Basic_Attack_Pos);
	}

	nextAttackAns(options) {
		var Basic_Attack = global.Network.createPacket('Basic_Attack', 'S2C');
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

		this.owner.sendTo_vision(Basic_Attack);
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
	 * @param {Unit} owner
	 * @param {Unit} target
	 * @param {Object} options
	 * @returns {Targetedshot}
	 */
	process(owner, target, options = {}) {
		options.windupPercent = options.windupPercent || this.windupPercent;
		var missile = new Targetedshot({ owner, target, options });
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
