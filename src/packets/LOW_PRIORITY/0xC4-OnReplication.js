const BasePacket = require('../BasePacket');


//todo: replicantList and replicantTypes is definitely wrong
const replicantList = {
	Player: [
		[
			'gold', 'totalGold',
			'spellsEnabled', 'spellsEnabled_',
			'summonerSpellsEnabled', 'summonerSpellsEnabled_',
			'evolvePoints', 'evolveFlags',
			'manaCost4', 'manaCost4', 'manaCost4', 'manaCost4',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
		], [
			'actionState', 'isMagicImmune', 'isInvulnerable', 'isPhysicalImmune', 'isLifestealImmune',
			'attackDamage_baseValue', 'abilityPower_baseValue',
			'crit', 'armor', 'resist', 'healthRegen', 'manaRegen', 'attackRange',
			'attackDamage_flatBonus', 'attackDamage_percentBonus', 'abilityPower_flatBonus',
			'magicResist_flatBonus', 'magicResist_percentBonus', 'attackSpeedMultiplier', 'range_flatBonus',
			'cooldownReduction', 'passiveCooldownEndTime', 'passiveCooldownTotalTime',
			'armorPenetration_flatBonus', 'armorPenetration_percentBonus',
			'magicPenetration_flatBonus', 'magicPenetration_percentBonus',
			'lifeSteal', 'spellVamp', 'tenacity',
		], [
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		], [
			'health.current', 'mana.current', 'health', 'mana',
			'experience', 'lifeTime', 'maxLifeTime', 'lifeTimeTicks',
			'perceptionRange_flatMod', 'perceptionRange_percentMod',
			'moveSpeed', 'size', 'flatPathfindingRadiusMod',
			'level', 'minionCounter', 'isTargetable', 'isTargetableToTeam',
		], [

		], [
			'isTargetable', 'isTargetableToTeam',
		],
	],
	Turret: [
		[
			'gold', 'totalGold',
			'spellsEnabled', 'spellsEnabled_',
			'summonerSpellsEnabled', 'summonerSpellsEnabled_',
			'evolvePoints', 'evolveFlags',
			'manaCost4', 'manaCost4', 'manaCost4', 'manaCost4',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
		], [
			'mana', 'mana.current', 'actionState', 'isMagicImmune', 'isInvulnerable',
			'attackDamage.baseValue', 'armor.total',
			'resist.total', 'attackSpeedMultiplier.total', 'attackDamage.flatBonus', 'attackDamage.percentBonus',
			'abilityPower.total', 'healthRegen.total',
		], [
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		], [
			'health.current', 'health.total', 'perceptionRange.flatBonus', 'perceptionRange.percentBonus',
			'moveSpeed.total', 'size.total',
		], [

		], [
			'isTargetable', 'isTargetableToTeam',
		],
	],
	AnimatedBuilding: [
		[
			'gold', 'totalGold',
			'spellsEnabled', 'spellsEnabled_',
			'summonerSpellsEnabled', 'summonerSpellsEnabled_',
			'evolvePoints', 'evolveFlags',
			'manaCost4', 'manaCost4', 'manaCost4', 'manaCost4',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
		], [
			'health.current', 'isInvulnerable', 'isTargetable', 'isTargetableToTeam',
		], [
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		], [
			'health.current', 'health.total', 'perceptionRange.flatBonus', 'perceptionRange.percentBonus',
			'moveSpeed.total', 'size.total',
		], [

		], [
			'isTargetable', 'isTargetableToTeam',
		],
	],
	Minion: [
		[
			'gold', 'totalGold',
			'spellsEnabled', 'spellsEnabled_',
			'summonerSpellsEnabled', 'summonerSpellsEnabled_',
			'evolvePoints', 'evolveFlags',
			'manaCost4', 'manaCost4', 'manaCost4', 'manaCost4',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
			'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16', 'manaCost16',
		], [
			'health.current', 'health.total',
			'lifeTime', 'maxLifeTime', 'lifeTimeTicks', 'mana.total', 'mana.current',
			'actionState',
			'isMagicImmune', 'isInvulnerable', 'isPhysicalImmune', 'isLifestealImmune',
			'attackDamage.baseValue', 'armor.total', 'resist.total', 'attackSpeedMultiplier.total',
			'attackDamage.flatBonus', 'attackDamage.percentBonus', 'abilityPower.total', 'healthRegen.total',
			'manaRegen.total', 'resist.flatBonus', 'resist.percentBonus',
		], [
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		], [
			'perceptionRange.flatBonus', 'perceptionRange.percentBonus', 'size.total', 'isTargetable', 'isTargetableToTeam',
			'moveSpeed.total', 'size.total',
		], [

		], [
			'isTargetable', 'isTargetableToTeam',
		],
	],
};

const replicantTypes = {// 0 - int, 1 - float, 2 - bool
	Player: [
		[
			1, 1,
			0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		], [
			0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		], [
			1, 1, 1, 1,
		], [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0,
		], [

		], [
			2, 0,
		],
	],
	Turret: [
		[
			1, 1,
			0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		], [
			1, 1, 0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 2, 0,
		], [
			1, 1, 1, 1,
		], [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0,
		], [

		], [
			2, 0,
		],
	],
	AnimatedBuilding: [
		[
			1, 1,
			0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		], [
			1, 2, 0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 2, 0,
		], [
			1, 1, 1, 1,
		], [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0,
		], [

		], [
			2, 0,
		],
	],
	Minion: [
		[
			1, 1,
			0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		], [
			1, 1, 1, 1, 1, 1, 1,
			0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 1, 1,
			2, 0,
		], [
			1, 1, 1, 1,
		], [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0,
		], [

		], [
			2, 0,
		],
	],
};

module.exports = class OnReplication extends BasePacket {
	static struct = {
		syncId: 'int32',
		count: 'uint8',
	}

	/**
	 * 
	 * @param {import('../../gameobjects/units/Player')} unit 
	 */
	Replicant_PLAYER(unit) {//todo: some values may be wrong

		this.UpdateReplicant(unit, unit.progress.gold, 0, 0);//ok
		this.UpdateReplicant(unit, unit.progress.totalGold, 0, 1);

		let spellsEnabled = 0;
		for (let i in unit.progress.spellLevel)
			if (unit.progress.spellLevel[i])
				spellsEnabled |= 1 << i;

		this.UpdateReplicant(unit, spellsEnabled, 0, 2);//ok?
		this.UpdateReplicant(unit, spellsEnabled ? spellsEnabled >> 32 : undefined, 0, 3);//ok?

		let summonerSpellsEnabled = 0;
		for (let i in unit.progress.summonerSpellsEnabled)
			if (unit.progress.summonerSpellsEnabled[i])
				summonerSpellsEnabled |= 16 << i;

		this.UpdateReplicant(unit, summonerSpellsEnabled, 0, 4);
		this.UpdateReplicant(unit, summonerSpellsEnabled ? summonerSpellsEnabled >> 32 : undefined, 0, 5);
		this.UpdateReplicant(unit, unit.progress.evolvePoints, 0, 6);//ok?
		this.UpdateReplicant(unit, unit.progress.evolveFlags, 0, 7);//ok?
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
		this.UpdateReplicant(unit, unit.stats.magicPenetration?.PercentBonus2, 2, 1);//ok
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
	UpdateReplicant(unit, value, primaryId, secondaryId) {
		if (typeof value == 'undefined' || unit.replicant[primaryId][secondaryId] === value)
			return;

		unit.primaryIdArray |= 1 << primaryId;
		unit.seconadaryIdArray[primaryId] |= 1 << secondaryId;

		unit.replicant[primaryId][secondaryId] = value;
	}
	writer(buffer) {
		this.syncId = this.syncId || performance.now();
		this.count = this.count ?? this.units.length;
		super.writer(buffer);

		for (let i = 0; i < this.count; i++) {
			let unit = this.units[i];
			if (!unit.replicant)
				unit.replicant = [{}, {}, {}, {}, {}, {}];

			unit.primaryIdArray = 0;
			unit.seconadaryIdArray = [0, 0, 0, 0, 0, 0];

			//console.log(unit);
			this.Replicant_PLAYER(unit);

			buffer.write1('uint8', unit.primaryIdArray);
			buffer.write1('uint32', unit.netId);

			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) == 0)
					continue;

				buffer.write1('uint32', unit.seconadaryIdArray[primaryId]);
				let sizeOffset = buffer.off++;

				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((unit.seconadaryIdArray[primaryId] & (1 << secondaryId)) == 0)
						continue;

					if (replicantTypes[unit.type || 'Player']?.[primaryId]?.[secondaryId] == 1) {
						if (unit.replicant[primaryId][secondaryId] >= 0xFE000000)
							buffer.write1('uint8', 0xFE);

						buffer.write1('float', unit.replicant[primaryId][secondaryId]);
					} else if (replicantTypes[unit.type || 'Player']?.[primaryId]?.[secondaryId] == 0) {
						let num = unit.replicant[primaryId][secondaryId];
						while (num >= 0x80) {
							buffer.write1('uint8', (num | 0x80));
							num >>= 7;
						}
						buffer.write1('uint8', num);
						//buffer.write1('uint16', unit.replicant[primaryId][secondaryId]);
					} else {
						buffer.write1('uint8', unit.replicant[primaryId][secondaryId]);
					}
				}

				buffer.writeUInt8(buffer.off - (sizeOffset + 1), sizeOffset);
			}
			//console.debug('OnReplication writer unit', unit);
		}
	}
	reader(buffer) {
		super.reader(buffer);

		this.units = [];
		for (let i = 0; i < this.count; i++) {
			let unit = this.units[i] = {};

			unit.primaryIdArray = buffer.read1('uint8');
			unit.netId = buffer.read1('uint32');
			unit.type = 'Player';
			//unit.netId >= 0xFF000000 ? 'Turret' :
			//unit.netId >= 0x40000000 ? 'Minion' :
			//'Player';
			unit.seconadaryIdArray = [];
			unit.dataCount = [];
			unit.replicant = [{}, {}, {}, {}, {}, {}];


			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) == 0)
					continue;

				unit.seconadaryIdArray[primaryId] = buffer.read1('uint32');
				unit.dataCount[primaryId] = buffer.read1('uint8');
				let sizeOffset = buffer.off;
				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((unit.seconadaryIdArray[primaryId] & (1 << secondaryId)) == 0)
						continue;

					if (replicantTypes[unit.type]?.[primaryId]?.[secondaryId] == 1) {
						let f = buffer.read1('uint8');
						if (f < 0xFE)
							--buffer.off;

						unit.replicant[primaryId][secondaryId] = [replicantList[unit.type]?.[primaryId]?.[secondaryId] || '', buffer.read1('float')];
					}
					else if (replicantTypes[unit.type]?.[primaryId]?.[secondaryId] == 0) {

						let num = 0;
						let num1 = 0;
						do {
							num = buffer.read1('uint8')
							num1 = num1 * 128 + num;
						} while (num >= 0x80);
						unit.replicant[primaryId][secondaryId] = [replicantList[unit.type]?.[primaryId]?.[secondaryId] || '', num1];
					}
					else {
						let num1 = buffer.read1('uint8');
						unit.replicant[primaryId][secondaryId] = [replicantList[unit.type]?.[primaryId]?.[secondaryId] || '', num1];
					}
				}
				buffer.off = sizeOffset + unit.dataCount[primaryId];
			}
		}

	}
};
