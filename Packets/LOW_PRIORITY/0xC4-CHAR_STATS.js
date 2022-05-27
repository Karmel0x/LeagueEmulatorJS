var BasePacket = require('../BasePacket');
const { getIntBytes_r, childByAddress } = require("../../Core/Utilities");

//todo: replicantList and replicantTypes is definitely wrong
const replicantList = {
	Player: [
		[
			'gold', 'totalGold',
			'spellsEnabled', 'spellsEnabled_',
			'summonerSpellsEnabled', 'summonerSpellsEnabled_',
			'evolvePoints', 'evolveFlags',
			'manaCost4', 'manaCost4', 'manaCost4', 'manaCost4',
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
		],[
			'actionState', 'isMagicImmune', 'isInvulnerable', 'isPhysicalImmune', 'isLifestealImmune',
			'attackDamage_baseValue', 'abilityPower_baseValue',
			'crit', 'armor', 'resist', 'healthRegen', 'manaRegen', 'attackRange',
			'attackDamage_flatBonus', 'attackDamage_percentBonus', 'abilityPower_flatBonus',
			'MagicResist_flatBonus', 'MagicResist_percentBonus', 'attackSpeedMultiplier', 'Range_flatBonus',
			'cooldownReduction', 'PassiveCooldownEndTime', 'PassiveCooldownTotalTime',
			'ArmorPenetration_flatBonus', 'ArmorPenetration_percentBonus',
			'MagicPenetration_flatBonus', 'magicPenetration_percentBonus',
			'lifeSteal', 'spellVamp', 'tenacity',
		],[
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		],[
			'currentHealth', 'currentMana', 'health', 'mana',
			'experience', 'lifeTime', 'maxLifeTime', 'lifeTimeTicks',
			'perceptionRange_flatMod', 'perceptionRange_percentMod',
			'moveSpeed', 'size', 'flatPathfindingRadiusMod',
			'level', 'minionCounter', 'isTargetable', 'isTargetableToTeam',
		],[

		],[
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
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
		],[
			'mana', 'currentMana', 'actionState', 'isMagicImmune', 'isInvulnerable',
			'attackDamage.baseValue', 'armor.total',
			'resist.total', 'attackSpeedMultiplier.total', 'attackDamage.flatBonus', 'attackDamage.percentBonus', 
			'abilityPower.total', 'healthRegen.total',
		],[
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		],[
			'currentHealth', 'health.total', 'perceptionRange.flatBonus', 'perceptionRange.percentBonus',
			'moveSpeed.total', 'size.total',
		],[

		],[
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
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
		],[
			'currentHealth', 'isInvulnerable', 'isTargetable', 'isTargetableToTeam',
		],[
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		],[
			'currentHealth', 'health.total', 'perceptionRange.flatBonus', 'perceptionRange.percentBonus',
			'moveSpeed.total', 'size.total',
		],[

		],[
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
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
			'manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16','manaCost16',
		],[
			'currentHealth', 'health.total',
			'lifeTime', 'maxLifeTime','lifeTimeTicks', 'mana.total', 'currentMana',
			'actionState',
			'isMagicImmune', 'isInvulnerable', 'isPhysicalImmune', 'isLifestealImmune',
			'attackDamage.baseValue', 'armor.total', 'resist.total', 'attackSpeedMultiplier.total',
			'attackDamage.flatBonus', 'attackDamage.percentBonus', 'abilityPower.total', 'healthRegen.total',
			'manaRegen.total', 'resist.flatBonus', 'resist.percentBonus', 
		],[
			'armor_percentBonus', 'magicPenetration_percentBonus',
			'healthRegen', 'manaRegen',
		],[
			'perceptionRange.flatBonus', 'perceptionRange.percentBonus', 'size.total', 'isTargetable', 'isTargetableToTeam', 
			'moveSpeed.total', 'size.total',
		],[

		],[
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
		],[
			0, 2, 2, 2, 2, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0, 
		],[

		],[
			2, 0, 
		],
	],
	Turret: [
		[
			1, 1, 
			0, 0, 0, 0, 0, 0, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
		],[
			1, 1, 0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 2, 0,
		],[
			1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0, 
		],[

		],[
			2, 0, 
		],
	],
	AnimatedBuilding: [
		[
			1, 1, 
			0, 0, 0, 0, 0, 0, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
		],[
			1, 2, 0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 2, 0,
		],[
			1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0, 
		],[

		],[
			2, 0, 
		],
	],
	Minion: [
		[
			1, 1, 
			0, 0, 0, 0, 0, 0, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 1, 1, 1, 
			0, 2, 2, 2, 2,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			1, 1, 1, 1, 1, 
			2, 0, 
		],[
			1, 1, 1, 1, 
		],[
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 0, 0, 2, 0, 
		],[

		],[
			2, 0, 
		],
	],
};

module.exports = class extends BasePacket {//LOW_PRIORITY.CHAR_STATS
	struct = {
		SyncID: 'int32',
		count: 'uint8',
	}
	
	Replicant_PLAYER(unit){//todo: some values may be wrong

		this.UpdateReplicant(unit, unit.gold, 0, 0);//ok
		this.UpdateReplicant(unit, unit.totalGold, 0, 1);

		var spellsEnabled = 0;
		for(var i in unit.spellLevel)
			if(unit.spellLevel[i])
				spellsEnabled |= 1 << i;

		this.UpdateReplicant(unit, spellsEnabled, 0, 2);//ok?
		this.UpdateReplicant(unit, spellsEnabled ? spellsEnabled >> 32 : undefined, 0, 3);//ok?
		
		var summonerSpellsEnabled = 0;
		for(var i in unit.summonerSpellsEnabled)
			if(unit.summonerSpellsEnabled[i])
				summonerSpellsEnabled |= 16 << i;
		
		this.UpdateReplicant(unit, summonerSpellsEnabled, 0, 4);
		this.UpdateReplicant(unit, summonerSpellsEnabled ? summonerSpellsEnabled >> 32 : undefined, 0, 5);
		this.UpdateReplicant(unit, unit.evolvePoints, 0, 6);//ok?
		this.UpdateReplicant(unit, unit.evolveFlags, 0, 7);//ok?
		for (var i = 0; i < 4; i++)
			this.UpdateReplicant(unit, unit.manaCost?.[i], 0, 8 + i);
		for(var i = 0; i < 16; i++)
			this.UpdateReplicant(unit, unit.manaCost?.[45 + i], 0, 12 + i);

		this.UpdateReplicant(unit, unit.actionState, 1, 0);
		this.UpdateReplicant(unit, unit.isMagicImmune, 1, 1);
		this.UpdateReplicant(unit, unit.isInvulnerable, 1, 2);
		this.UpdateReplicant(unit, unit.isPhysicalImmune, 1, 3);
		this.UpdateReplicant(unit, unit.isLifestealImmune, 1, 4);
		this.UpdateReplicant(unit, unit.attackDamage?.baseValue, 1, 5);//ok ? in Champion Info
		this.UpdateReplicant(unit, unit.abilityPower?.baseValue, 1, 6);//ok
		this.UpdateReplicant(unit, unit.dodge, 1, 7);
		this.UpdateReplicant(unit, unit.crit?.total, 1, 8);//ok
		this.UpdateReplicant(unit, unit.armor?.total, 1, 9);//ok
		this.UpdateReplicant(unit, unit.resist?.total, 1, 10);//ok
		this.UpdateReplicant(unit, unit.healthRegen?.total, 1, 11);//ok
		this.UpdateReplicant(unit, unit.manaRegen?.total, 1, 12);//ok
		this.UpdateReplicant(unit, unit.attackRange?.total, 1, 13);//ok
		this.UpdateReplicant(unit, unit.attackDamage?.flatBonus, 1, 14);//ok
		this.UpdateReplicant(unit, unit.attackDamage?.percentBonus, 1, 15);//ok
		this.UpdateReplicant(unit, unit.abilityPower?.flatBonus, 1, 16);//ok
		this.UpdateReplicant(unit, unit.resist?.flatBonus, 1, 17);//not working?
		this.UpdateReplicant(unit, unit.resist?.percentBonus, 1, 18);//not working?
		this.UpdateReplicant(unit, unit.attackSpeedMultiplier?.total, 1, 19);//ok
		this.UpdateReplicant(unit, unit.attackRange?.flatBonus, 1, 20);//not working?
		this.UpdateReplicant(unit, unit.cooldownReduction?.total ? -unit.cooldownReduction?.total : undefined, 1, 21);//ok//-
		this.UpdateReplicant(unit, unit.PassiveCooldownEndTime, 1, 22);//ok
		this.UpdateReplicant(unit, unit.PassiveCooldownTotalTime, 1, 23);
		this.UpdateReplicant(unit, unit.armorPenetration?.flatBonus, 1, 24);//ok
		this.UpdateReplicant(unit, unit.armorPenetration?.percentBonus, 1, 25);//ok
		this.UpdateReplicant(unit, unit.magicPenetration?.flatBonus, 1, 26);//ok
		this.UpdateReplicant(unit, unit.magicPenetration?.percentBonus, 1, 27);//ok
		this.UpdateReplicant(unit, unit.lifeSteal?.total, 1, 28);//ok
		this.UpdateReplicant(unit, unit.spellVamp?.total, 1, 29);//ok
		this.UpdateReplicant(unit, unit.tenacity?.total, 1, 30);//ok

		this.UpdateReplicant(unit, unit.armor?.percentBonus, 2, 0);//not working?
		this.UpdateReplicant(unit, unit.magicPenetration?.PercentBonus2, 2, 1);//ok
		this.UpdateReplicant(unit, unit.healthRegen?.baseValue, 2, 2);
		this.UpdateReplicant(unit, unit.manaRegen?.baseValue, 2, 3);

		this.UpdateReplicant(unit, unit.currentHealth, 3, 0);//ok
		this.UpdateReplicant(unit, unit.currentMana, 3, 1);//ok
		this.UpdateReplicant(unit, unit.health?.total, 3, 2);//ok
		this.UpdateReplicant(unit, unit.mana?.total, 3, 3);//ok
		this.UpdateReplicant(unit, unit.expTotal, 3, 4);//ok
		this.UpdateReplicant(unit, unit.lifeTime, 3, 5);
		this.UpdateReplicant(unit, unit.maxLifeTime, 3, 6);
		this.UpdateReplicant(unit, unit.lifeTimeTicks, 3, 7);
		this.UpdateReplicant(unit, unit.perceptionRange?.flatMod, 3, 8);//ok
		this.UpdateReplicant(unit, unit.perceptionRange?.percentMod, 3, 9);//ok
		this.UpdateReplicant(unit, unit.moveSpeed?.total, 3, 10);//ok
		this.UpdateReplicant(unit, unit.size?.total, 3, 11);//ok
		this.UpdateReplicant(unit, unit.flatPathfindingRadiusMod, 3, 12);//not working?
		this.UpdateReplicant(unit, unit.level, 3, 13);//ok
		this.UpdateReplicant(unit, unit.minionCounter, 3, 14);//ok ? in Scoreboard
		this.UpdateReplicant(unit, unit.isTargetable, 3, 15);//ok
		this.UpdateReplicant(unit, unit.isTargetableToTeam, 3, 16);
	}
	UpdateReplicant(unit, value, primaryId, secondaryId){
		if(typeof value === 'undefined' || unit.replicant[primaryId][secondaryId] === value)
			return;

		unit.primaryIdArray |= 1 << primaryId;
		unit.seconadaryIdArray[primaryId] |= 1 << secondaryId;

		unit.replicant[primaryId][secondaryId] = value;
	}
	writer(buffer){
        this.SyncID = this.SyncID || performance.now();
		this.count = this.count ?? this.units.length;
		super.writer(buffer);

		for(let i = 0; i < this.count; i++){
			if(!this.units[i].replicant)
				this.units[i].replicant = [{}, {}, {}, {}, {}, {}];

			this.units[i].primaryIdArray = 0;
			this.units[i].seconadaryIdArray = [0, 0, 0, 0, 0, 0];

			//console.log(this.units[i]);
			this.Replicant_PLAYER(this.units[i]);

			buffer.write1('uint8', this.units[i].primaryIdArray);
			buffer.write1('uint32', this.units[i].netId);

			for(let primaryId = 0; primaryId < 6; primaryId++){
				if((this.units[i].primaryIdArray & (1 << primaryId)) == 0)
					continue;
				
				buffer.write1('uint32', this.units[i].seconadaryIdArray[primaryId]);
				let sizeOffset = buffer.off++;

				for(let secondaryId = 0; secondaryId < 32; secondaryId++){
					if((this.units[i].seconadaryIdArray[primaryId] & (1 << secondaryId)) == 0)
						continue;

					if(replicantTypes[this.units[i].type || 'Player']?.[primaryId]?.[secondaryId] == 1){
						if(this.units[i].replicant[primaryId][secondaryId] >= 0xFE000000)
							buffer.write1('uint8', 0xFE);

						buffer.write1('float', this.units[i].replicant[primaryId][secondaryId]);
					}else if(replicantTypes[this.units[i].type || 'Player']?.[primaryId]?.[secondaryId] == 0){
						let num = this.units[i].replicant[primaryId][secondaryId];
						while(num >= 0x80){
							buffer.write1('uint8', (num | 0x80));
							num >>= 7;
						}
						buffer.write1('uint8', num);
						//buffer.write1('uint16', this.units[i].replicant[primaryId][secondaryId]);
					}else{
						buffer.write1('uint8', this.units[i].replicant[primaryId][secondaryId]);
					}
				}

				buffer.writeUInt8(buffer.off - (sizeOffset + 1), sizeOffset);
			}
			//console.debug('CHAR_STATS writer unit', this.units[i]);
		}
	}
	reader(buffer){
		super.reader(buffer);

		this.units = [];
		for(let i = 0; i < this.count; i++){
			this.units[i] = {};

			this.units[i].primaryIdArray = buffer.read1('uint8');
			this.units[i].netId = buffer.read1('uint32');
			this.units[i].type = 'Player';
				//this.units[i].netId >= 0xFF000000 ? 'Turret' :
				//this.units[i].netId >= 0x40000000 ? 'Minion' :
				//'Player';
			this.units[i].seconadaryIdArray = [];
			this.units[i].dataCount = [];
			this.units[i].replicant = [{}, {}, {}, {}, {}, {}];


			for(let primaryId = 0; primaryId < 6; primaryId++){
				if((this.units[i].primaryIdArray & (1 << primaryId)) == 0)
					continue;
					
				this.units[i].seconadaryIdArray[primaryId] = buffer.read1('uint32');
				this.units[i].dataCount[primaryId] = buffer.read1('uint8');
				let sizeOffset = buffer.off;
				for(let secondaryId = 0; secondaryId < 32; secondaryId++){
					if((this.units[i].seconadaryIdArray[primaryId] & (1 << secondaryId)) == 0)
						continue;

					if(replicantTypes[this.units[i].type]?.[primaryId]?.[secondaryId] == 1){
						let f = buffer.read1('uint8');
						if(f < 0xFE)
							--buffer.off;

						this.units[i].replicant[primaryId][secondaryId] = [replicantList[this.units[i].type]?.[primaryId]?.[secondaryId] || '', buffer.read1('float')];
					}
					else if(replicantTypes[this.units[i].type]?.[primaryId]?.[secondaryId] == 0){

						let num = 0;
						let num1 = 0;
						do{
							num = buffer.read1('uint8')
							num1 = num1 * 128 + num;
						}while(num >= 0x80);
						this.units[i].replicant[primaryId][secondaryId] = [replicantList[this.units[i].type]?.[primaryId]?.[secondaryId] || '', num1];
					}
					else{
						let num1 = buffer.read1('uint8');
						this.units[i].replicant[primaryId][secondaryId] = [replicantList[this.units[i].type]?.[primaryId]?.[secondaryId] || '', num1];
					}
				}
				buffer.off = sizeOffset + this.units[i].dataCount[primaryId];
			}
		}
		
	}
};
