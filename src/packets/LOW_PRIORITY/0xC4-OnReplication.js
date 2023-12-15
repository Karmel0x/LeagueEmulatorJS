import BasePacket from '../BasePacket.js';

class ReplicantBase {
	static types = {
		bool: /** @type {boolean} */ (/** @type {any} */ (1)),
		int: 2,
		float: 3,
	};

	static one = {
		gold: ReplicantBase.types.float,
		totalGold: ReplicantBase.types.float,
		spellsEnabled: ReplicantBase.types.int,
		spellsEnabled_: ReplicantBase.types.int,
		summonerSpellsEnabled: ReplicantBase.types.int,
		summonerSpellsEnabled_: ReplicantBase.types.int,
		evolvePoints: ReplicantBase.types.int,
		evolveFlags: ReplicantBase.types.int,
		manaCost4a: ReplicantBase.types.float,
		manaCost4b: ReplicantBase.types.float,
		manaCost4c: ReplicantBase.types.float,
		manaCost4d: ReplicantBase.types.float,
		manaCost16a: ReplicantBase.types.float,
		manaCost16b: ReplicantBase.types.float,
		manaCost16c: ReplicantBase.types.float,
		manaCost16d: ReplicantBase.types.float,
		manaCost16e: ReplicantBase.types.float,
		manaCost16f: ReplicantBase.types.float,
		manaCost16g: ReplicantBase.types.float,
		manaCost16h: ReplicantBase.types.float,
		manaCost16i: ReplicantBase.types.float,
		manaCost16j: ReplicantBase.types.float,
		manaCost16k: ReplicantBase.types.float,
		manaCost16l: ReplicantBase.types.float,
		manaCost16m: ReplicantBase.types.float,
		manaCost16n: ReplicantBase.types.float,
		manaCost16o: ReplicantBase.types.float,
		manaCost16p: ReplicantBase.types.float,
	};

	static two = {};

	static three = {
		armor_percentBonus: ReplicantBase.types.float,
		magicPenetration_percentBonus: ReplicantBase.types.float,
		healthRegen: ReplicantBase.types.float,
		manaRegen: ReplicantBase.types.float,
	};

	static four = {};

	static five = {};

	static six = {
		isTargetable: ReplicantBase.types.bool,
		isTargetableToTeam: ReplicantBase.types.int,
	};

	static namesArray() {
		let constructor = this;///** @type {typeof ReplicantBase} */ (this.constructor);

		return [
			Object.keys(constructor.one),
			Object.keys(constructor.two),
			Object.keys(constructor.three),
			Object.keys(constructor.four),
			Object.keys(constructor.five),
			Object.keys(constructor.six),
		];
	}

	static valuesArray() {
		let constructor = this;///** @type {typeof ReplicantBase} */ (this.constructor);

		return [
			Object.values(constructor.one),
			Object.values(constructor.two),
			Object.values(constructor.three),
			Object.values(constructor.four),
			Object.values(constructor.five),
			Object.values(constructor.six),
		];
	}
}

class ReplicantPlayer extends ReplicantBase {
	static two = {
		actionState: ReplicantBase.types.int,
		isMagicImmune: ReplicantBase.types.bool,
		isInvulnerable: ReplicantBase.types.bool,
		isPhysicalImmune: ReplicantBase.types.bool,
		isLifestealImmune: ReplicantBase.types.bool,
		attackDamage_baseValue: ReplicantBase.types.float,
		abilityPower_baseValue: ReplicantBase.types.float,
		crit: ReplicantBase.types.float,
		armor: ReplicantBase.types.float,
		resist: ReplicantBase.types.float,
		healthRegen: ReplicantBase.types.float,
		manaRegen: ReplicantBase.types.float,
		attackRange: ReplicantBase.types.float,
		attackDamage_flatBonus: ReplicantBase.types.float,
		attackDamage_percentBonus: ReplicantBase.types.float,
		abilityPower_flatBonus: ReplicantBase.types.float,
		magicResist_flatBonus: ReplicantBase.types.float,
		magicResist_percentBonus: ReplicantBase.types.float,
		attackSpeedMultiplier: ReplicantBase.types.float,
		range_flatBonus: ReplicantBase.types.float,
		cooldownReduction: ReplicantBase.types.float,
		passiveCooldownEndTime: ReplicantBase.types.float,
		passiveCooldownTotalTime: ReplicantBase.types.float,
		armorPenetration_flatBonus: ReplicantBase.types.float,
		armorPenetration_percentBonus: ReplicantBase.types.float,
		magicPenetration_flatBonus: ReplicantBase.types.float,
		magicPenetration_percentBonus: ReplicantBase.types.float,
		lifeSteal: ReplicantBase.types.float,
		spellVamp: ReplicantBase.types.float,
		tenacity: ReplicantBase.types.float,
	};

	static four = {
		health_current: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,
		health: ReplicantBase.types.float,
		mana: ReplicantBase.types.float,
		experience: ReplicantBase.types.float,
		lifeTime: ReplicantBase.types.float,
		maxLifeTime: ReplicantBase.types.float,
		lifeTimeTicks: ReplicantBase.types.float,
		perceptionRange_flatMod: ReplicantBase.types.float,
		perceptionRange_percentMod: ReplicantBase.types.float,
		moveSpeed: ReplicantBase.types.float,
		size: ReplicantBase.types.float,
		flatPathfindingRadiusMod: ReplicantBase.types.float,
		level: ReplicantBase.types.int,
		minionCounter: ReplicantBase.types.int,
		isTargetable: ReplicantBase.types.bool,
		isTargetableToTeam: ReplicantBase.types.int,
	};
}

class ReplicantTurret extends ReplicantBase {
	static two = {
		mana: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,
		actionState: ReplicantBase.types.int,
		isMagicImmune: ReplicantBase.types.bool,
		isInvulnerable: ReplicantBase.types.bool,
		attackDamage_baseValue: ReplicantBase.types.float,
		armor: ReplicantBase.types.float,
		resist: ReplicantBase.types.float,
		attackSpeedMultiplier: ReplicantBase.types.float,
		attackDamage_flatBonus: ReplicantBase.types.float,
		attackDamage_percentBonus: ReplicantBase.types.float,
		abilityPower: ReplicantBase.types.float,
		healthRegen: ReplicantBase.types.float,
	};

	static four = {
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		perceptionRange_flatBonus: ReplicantBase.types.float,
		perceptionRange_percentBonus: ReplicantBase.types.float,
		moveSpeed_total: ReplicantBase.types.float,
		size_total: ReplicantBase.types.float,
	};
}

class ReplicantAnimatedBuilding extends ReplicantBase {
	static two = {
		health_current: ReplicantBase.types.float,
		isInvulnerable: ReplicantBase.types.bool,
		isTargetable: ReplicantBase.types.bool,
		isTargetableToTeam: ReplicantBase.types.int,
	};

	static four = {
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		perceptionRange_flatBonus: ReplicantBase.types.float,
		perceptionRange_percentBonus: ReplicantBase.types.float,
		moveSpeed_total: ReplicantBase.types.float,
		size_total: ReplicantBase.types.float,
	};
}

class ReplicantMinion extends ReplicantBase {
	static two = {
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		lifeTime: ReplicantBase.types.float,
		maxLifeTime: ReplicantBase.types.float,
		lifeTimeTicks: ReplicantBase.types.float,
		mana_total: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,
		actionState: ReplicantBase.types.int,
		isMagicImmune: ReplicantBase.types.bool,
		isInvulnerable: ReplicantBase.types.bool,
		isPhysicalImmune: ReplicantBase.types.bool,
		isLifestealImmune: ReplicantBase.types.bool,
		attackDamage_baseValue: ReplicantBase.types.float,
		armor: ReplicantBase.types.float,
		resist: ReplicantBase.types.float,
		attackSpeedMultiplier: ReplicantBase.types.float,
		attackDamage_flatBonus: ReplicantBase.types.float,
		attackDamage_percentBonus: ReplicantBase.types.float,
		abilityPower: ReplicantBase.types.float,
		healthRegen: ReplicantBase.types.float,
		manaRegen: ReplicantBase.types.float,
		resist_flatBonus: ReplicantBase.types.float,
		resist_percentBonus: ReplicantBase.types.float,
	};

	static four = {
		perceptionRange_flatBonus: ReplicantBase.types.float,
		perceptionRange_percentBonus: ReplicantBase.types.float,
		size_total: ReplicantBase.types.float,
		isTargetable: ReplicantBase.types.bool,
		isTargetableToTeam: ReplicantBase.types.int,
		moveSpeed_total: ReplicantBase.types.float,
		size2_total: ReplicantBase.types.float,
	};
}

// @todo replicantList and replicantTypes is definitely wrong
const replicantListNames = {
	Player: ReplicantPlayer.namesArray(),
	Turret: ReplicantTurret.namesArray(),
	AnimatedBuilding: ReplicantAnimatedBuilding.namesArray(),
	Minion: ReplicantMinion.namesArray(),
};

const replicantListTypes = {
	Player: ReplicantPlayer.valuesArray(),
	Turret: ReplicantTurret.valuesArray(),
	AnimatedBuilding: ReplicantAnimatedBuilding.valuesArray(),
	Minion: ReplicantMinion.valuesArray(),
};

export default class OnReplication extends BasePacket {
	static struct = {
		syncId: 'int32',
		count: 'uint8',
	};

	/**
	 * 
	 * @param {import('../../gameobjects/units/Player.js').default} unit 
	 */
	Replicant_PLAYER(unit) {//todo: some values may be wrong

		this.UpdateReplicant(unit, unit.progress.gold, 0, 0);//ok
		//this.UpdateReplicant(unit, unit.progress.goldTotal, 0, 1);

		let spellsEnabled = 0;
		for (let i in unit.progress.spellLevel)
			if (unit.progress.spellLevel[i])
				spellsEnabled |= 1 << Number(i);

		this.UpdateReplicant(unit, spellsEnabled, 0, 2);//ok?
		this.UpdateReplicant(unit, spellsEnabled ? (spellsEnabled >> 32) : undefined, 0, 3);//ok?

		let summonerSpellsEnabled = 0;
		for (let i in unit.progress.summonerSpellsEnabled)
			if (unit.progress.summonerSpellsEnabled[i])
				summonerSpellsEnabled |= 16 << Number(i);

		this.UpdateReplicant(unit, summonerSpellsEnabled, 0, 4);
		this.UpdateReplicant(unit, summonerSpellsEnabled ? (summonerSpellsEnabled >> 32) : undefined, 0, 5);
		this.UpdateReplicant(unit, unit.progress.evolvePoints, 0, 6);//ok?
		//this.UpdateReplicant(unit, unit.progress.evolvePointsF, 0, 7);
		for (let i = 0; i < 4; i++)
			this.UpdateReplicant(unit, unit.manaCost?.[i], 0, 8 + i);
		for (let i = 0; i < 16; i++)
			this.UpdateReplicant(unit, unit.manaCost?.[45 + i], 0, 12 + i);

		this.UpdateReplicant(unit, unit.stats.actionState, 1, 0);
		this.UpdateReplicant(unit, unit.stats.isMagicImmune, 1, 1);
		this.UpdateReplicant(unit, unit.stats.isInvulnerable, 1, 2);
		this.UpdateReplicant(unit, unit.stats.isPhysicalImmune, 1, 3);
		this.UpdateReplicant(unit, unit.stats.isLifestealImmune, 1, 4);
		this.UpdateReplicant(unit, unit.stats.attackDamage?.baseValue, 1, 5);//ok ? in Champion Info
		this.UpdateReplicant(unit, unit.stats.abilityPower?.baseValue, 1, 6);//ok
		this.UpdateReplicant(unit, unit.stats.dodge, 1, 7);
		this.UpdateReplicant(unit, unit.stats.crit?.total, 1, 8);//ok
		this.UpdateReplicant(unit, unit.stats.armor?.total, 1, 9);//ok
		this.UpdateReplicant(unit, unit.stats.resist?.total, 1, 10);//ok
		this.UpdateReplicant(unit, unit.stats.healthRegen?.total, 1, 11);//ok
		this.UpdateReplicant(unit, unit.stats.manaRegen?.total, 1, 12);//ok
		this.UpdateReplicant(unit, unit.stats.attackRange?.total, 1, 13);//ok
		this.UpdateReplicant(unit, unit.stats.attackDamage?.flatBonus, 1, 14);//ok
		this.UpdateReplicant(unit, unit.stats.attackDamage?.percentBonus, 1, 15);//ok
		this.UpdateReplicant(unit, unit.stats.abilityPower?.flatBonus, 1, 16);//ok
		this.UpdateReplicant(unit, unit.stats.resist?.flatBonus, 1, 17);//not working?
		this.UpdateReplicant(unit, unit.stats.resist?.percentBonus, 1, 18);//not working?
		this.UpdateReplicant(unit, unit.stats.attackSpeedMultiplier?.total, 1, 19);//ok
		this.UpdateReplicant(unit, unit.stats.attackRange?.flatBonus, 1, 20);//not working?
		this.UpdateReplicant(unit, unit.stats.cooldownReduction?.total ? -unit.stats.cooldownReduction?.total : undefined, 1, 21);//ok//-
		this.UpdateReplicant(unit, unit.stats.passiveCooldownEndTime, 1, 22);//ok
		this.UpdateReplicant(unit, unit.stats.passiveCooldownTotalTime, 1, 23);
		this.UpdateReplicant(unit, unit.stats.armorPenetration?.flatBonus, 1, 24);//ok
		this.UpdateReplicant(unit, unit.stats.armorPenetration?.percentBonus, 1, 25);//ok
		this.UpdateReplicant(unit, unit.stats.magicPenetration?.flatBonus, 1, 26);//ok
		this.UpdateReplicant(unit, unit.stats.magicPenetration?.percentBonus, 1, 27);//ok
		this.UpdateReplicant(unit, unit.stats.lifeSteal?.total, 1, 28);//ok
		this.UpdateReplicant(unit, unit.stats.spellVamp?.total, 1, 29);//ok
		this.UpdateReplicant(unit, unit.stats.tenacity?.total, 1, 30);//ok

		this.UpdateReplicant(unit, unit.stats.armor?.percentBonus, 2, 0);//not working?
		this.UpdateReplicant(unit, unit.stats.magicPenetration?.PercentBonus, 2, 1);
		this.UpdateReplicant(unit, unit.stats.healthRegen?.baseValue, 2, 2);
		this.UpdateReplicant(unit, unit.stats.manaRegen?.baseValue, 2, 3);

		this.UpdateReplicant(unit, unit.stats.health?.current, 3, 0);//ok
		this.UpdateReplicant(unit, unit.stats.mana?.current, 3, 1);//ok
		this.UpdateReplicant(unit, unit.stats.health?.total, 3, 2);//ok
		this.UpdateReplicant(unit, unit.stats.mana?.total, 3, 3);//ok
		this.UpdateReplicant(unit, unit.progress.expTotal, 3, 4);//ok
		this.UpdateReplicant(unit, unit.scoreboard.lifeTime, 3, 5);
		this.UpdateReplicant(unit, unit.scoreboard.maxLifeTime, 3, 6);
		this.UpdateReplicant(unit, unit.scoreboard.lifeTimeTicks, 3, 7);
		this.UpdateReplicant(unit, unit.stats.perceptionRange?.flatMod, 3, 8);//ok
		this.UpdateReplicant(unit, unit.stats.perceptionRange?.percentMod, 3, 9);//ok
		this.UpdateReplicant(unit, unit.stats.moveSpeed?.total, 3, 10);//ok
		this.UpdateReplicant(unit, unit.stats.size?.total, 3, 11);//ok
		this.UpdateReplicant(unit, unit.character.flatPathfindingRadiusMod, 3, 12);//not working?
		this.UpdateReplicant(unit, unit.progress.level, 3, 13);//ok
		this.UpdateReplicant(unit, unit.scoreboard.minionCounter, 3, 14);//ok ? in Scoreboard
		this.UpdateReplicant(unit, unit.isTargetable, 3, 15);//ok
		this.UpdateReplicant(unit, unit.isTargetableToTeam, 3, 16);
	}

	/**
	 * 
	 * @param {Unit} unit 
	 * @param {number | undefined} value 
	 * @param {number} primaryId 
	 * @param {number} secondaryId 
	 * @returns 
	 */
	UpdateReplicant(unit, value, primaryId, secondaryId) {
		if (typeof value === 'undefined' || unit.replicant[primaryId][secondaryId] === value)
			return;

		unit.primaryIdArray |= 1 << primaryId;
		unit.seconadaryIdArray[primaryId] |= 1 << secondaryId;

		unit.replicant[primaryId][secondaryId] = value;
	}

	/**
	 * 
	 * @param {PacketReaderWriter} buffer 
	 */
	writer(buffer) {
		if (!this.units || this.units.length == 0)
			return;

		this.syncId = this.syncId || performance.now();
		this.count = this.count ?? this.units.length;
		super.writer(buffer);

		for (let i = 0; i < this.count; i++) {
			let unit = this.units[i];

			unit.replicant = unit.replicant || [{}, {}, {}, {}, {}, {}];
			unit.primaryIdArray = 0;
			unit.seconadaryIdArray = [0, 0, 0, 0, 0, 0];

			//console.log(unit);
			this.Replicant_PLAYER(unit);

			buffer.write('uint8', unit.primaryIdArray);
			buffer.write('uint32', unit.netId);

			let unitType = /** @type {keyof typeof replicantListNames} */(unit.type || 'Player');

			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) == 0)
					continue;

				let replicantTypesUnit = replicantListTypes[unitType];
				if (!replicantTypesUnit)
					continue;

				let replicantTypesPrimary = replicantTypesUnit[primaryId];
				if (!replicantTypesPrimary)
					continue;

				let seconadaryIdVal = unit.seconadaryIdArray[primaryId];
				buffer.write('uint32', seconadaryIdVal);
				let sizeOffset = buffer.offset++;

				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((seconadaryIdVal & (1 << secondaryId)) == 0)
						continue;

					let replicantTypeSecondary = replicantTypesPrimary[secondaryId];
					let val = unit.replicant[primaryId][secondaryId];

					if (replicantTypeSecondary == ReplicantBase.types.bool) {
						buffer.write('uint8', val);
					} else if (replicantTypeSecondary == ReplicantBase.types.int) {
						let num = val;
						while (num >= 0x80) {
							buffer.write('uint8', (num | 0x80));
							num >>= 7;
						}
						buffer.write('uint8', num);
						//buffer.write('uint16', val);
					} else {
						if (val >= 0xFE000000)
							buffer.write('uint8', 0xFE);

						buffer.write('float', val);
					}
				}

				buffer.dv.setUint8(sizeOffset, buffer.offset - (sizeOffset + 1));
			}
			//console.debug('OnReplication writer unit', unit);
		}
	}

	/**
	 * 
	 * @param {PacketReaderWriter} buffer 
	 */
	reader(buffer) {
		super.reader(buffer);

		this.units = [];

		for (let i = 0; i < this.count; i++) {
			let unit = this.units[i] = {
				primaryIdArray: buffer.read('uint8'),
				netId: buffer.read('uint32'),
				type: /** @type {keyof typeof replicantListNames} */('Player'),
				//netId >= 0xFF000000 ? 'Turret' :
				//netId >= 0x40000000 ? 'Minion' :
				seconadaryIdArray: /** @type {number[]} */([]),
				dataCount: /** @type {number[]} */([]),
				replicant: /** @type {{[x: number]: [string, number]}[]} */([]),
			};

			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) == 0)
					continue;

				let replicantPrimary = unit.replicant[primaryId] = /** @type {{[x: number]: [string, number]}} */({});
				let secondaryIdBit = unit.seconadaryIdArray[primaryId] = buffer.read('uint32');
				let dataCount = unit.dataCount[primaryId] = buffer.read('uint8');
				let sizeOffset = buffer.offset;

				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((secondaryIdBit & (1 << secondaryId)) == 0)
						continue;

					let replicantName = replicantListNames[unit.type]?.[primaryId]?.[secondaryId];
					let replicantType = replicantListTypes[unit.type]?.[primaryId]?.[secondaryId];

					if (replicantType == ReplicantBase.types.bool) {
						let val = buffer.read('uint8');
						replicantPrimary[secondaryId] = [replicantName, val];
					}
					else if (replicantType == ReplicantBase.types.int) {

						let num = 0;
						let num1 = 0;
						do {
							num = buffer.read('uint8');
							num1 = num1 * 128 + num;
						} while (num >= 0x80);

						replicantPrimary[secondaryId] = [replicantName, num1];
					}
					else {
						let f = buffer.read('uint8');
						if (f < 0xFE)
							--buffer.offset;

						let val = buffer.read('float');
						replicantPrimary[secondaryId] = [replicantName, val];
					}
				}
				buffer.offset = sizeOffset + dataCount;
			}
		}

	}
}
