var BasePacket = require('../BasePacket');
const { getIntBytes_r, childByAddress } = require("../../Utilities");

//todo: replicantList and replicantTypes is definitely wrong
const replicantList = {
	Player: [
		[
			'Gold', 'TotalGold',
			'SpellsEnabled', 'SpellsEnabled_',
			'SummonerSpellsEnabled', 'SummonerSpellsEnabled_',
			'EvolvePoints', 'EvolveFlags',
			'ManaCost4', 'ManaCost4', 'ManaCost4', 'ManaCost4',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
		],[
			'ActionState', 'IsMagicImmune', 'IsInvulnerable', 'IsPhysicalImmune', 'IsLifestealImmune',
			'AttackDamage_BaseValue', 'AbilityPower_BaseValue',
			'CriticalChance', 'Armor', 'MagicResist', 'HealthRegeneration', 'ManaRegeneration', 'Range',
			'AttackDamage_FlatBonus', 'AttackDamage_PercentBonus', 'AbilityPower_FlatBonus',
			'MagicResist_FlatBonus', 'MagicResist_PercentBonus', 'AttackSpeedMultiplier', 'Range_FlatBonus',
			'CooldownReduction', 'PassiveCooldownEndTime', 'PassiveCooldownTotalTime',
			'ArmorPenetration_FlatBonus', 'ArmorPenetration_PercentBonus',
			'MagicPenetration_FlatBonus', 'MagicPenetration_PercentBonus',
			'LifeSteal', 'SpellVamp', 'Tenacity',
		],[
			'Armor_PercentBonus', 'MagicPenetration_PercentBonus',
			'HealthRegeneration', 'ManaRegeneration',
		],[
			'CurrentHealth', 'CurrentMana', 'HealthPoints', 'ManaPoints',
			'Experience', 'LifeTime', 'MaxLifeTime', 'LifeTimeTicks',
			'PerceptionRange_FlatMod', 'PerceptionRange_PercentMod',
			'MoveSpeed', 'Size', 'FlatPathfindingRadiusMod',
			'Level', 'MinionCounter', 'IsTargetable', 'IsTargetableToTeam',
		],[

		],[
			'IsTargetable', 'IsTargetableToTeam', 
		],
	],
	Turret: [
		[
			'Gold', 'TotalGold',
			'SpellsEnabled', 'SpellsEnabled_',
			'SummonerSpellsEnabled', 'SummonerSpellsEnabled_',
			'EvolvePoints', 'EvolveFlags',
			'ManaCost4', 'ManaCost4', 'ManaCost4', 'ManaCost4',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
		],[
			'ManaPoints', 'CurrentMana', 'ActionState', 'IsMagicImmune', 'IsInvulnerable',
			'AttackDamage.BaseValue', 'Armor.Total',
			'MagicResist.Total', 'AttackSpeedMultiplier.Total', 'AttackDamage.FlatBonus', 'AttackDamage.PercentBonus', 
			'AbilityPower.Total', 'HealthRegeneration.Total',
		],[
			'Armor_PercentBonus', 'MagicPenetration_PercentBonus',
			'HealthRegeneration', 'ManaRegeneration',
		],[
			'CurrentHealth', 'HealthPoints.Total', 'PerceptionRange.FlatBonus', 'PerceptionRange.PercentBonus',
			'MoveSpeed.Total', 'Size.Total',
		],[

		],[
			'IsTargetable', 'IsTargetableToTeam', 
		],
	],
	AnimatedBuilding: [
		[
			'Gold', 'TotalGold',
			'SpellsEnabled', 'SpellsEnabled_',
			'SummonerSpellsEnabled', 'SummonerSpellsEnabled_',
			'EvolvePoints', 'EvolveFlags',
			'ManaCost4', 'ManaCost4', 'ManaCost4', 'ManaCost4',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
		],[
			'CurrentHealth', 'IsInvulnerable', 'IsTargetable', 'IsTargetableToTeam',
		],[
			'Armor_PercentBonus', 'MagicPenetration_PercentBonus',
			'HealthRegeneration', 'ManaRegeneration',
		],[
			'CurrentHealth', 'HealthPoints.Total', 'PerceptionRange.FlatBonus', 'PerceptionRange.PercentBonus',
			'MoveSpeed.Total', 'Size.Total',
		],[

		],[
			'IsTargetable', 'IsTargetableToTeam', 
		],
	],
	Minion: [
		[
			'Gold', 'TotalGold',
			'SpellsEnabled', 'SpellsEnabled_',
			'SummonerSpellsEnabled', 'SummonerSpellsEnabled_',
			'EvolvePoints', 'EvolveFlags',
			'ManaCost4', 'ManaCost4', 'ManaCost4', 'ManaCost4',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
			'ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16','ManaCost16',
		],[
			'CurrentHealth', 'HealthPoints.Total',
			'LifeTime', 'MaxLifeTime','LifeTimeTicks', 'ManaPoints.Total', 'CurrentMana',
			'ActionState',
			'IsMagicImmune', 'IsInvulnerable', 'IsPhysicalImmune', 'IsLifestealImmune',
			'AttackDamage.BaseValue', 'Armor.Total', 'MagicResist.Total', 'AttackSpeedMultiplier.Total',
			'AttackDamage.FlatBonus', 'AttackDamage.PercentBonus', 'AbilityPower.Total', 'HealthRegeneration.Total',
			'ManaRegeneration.Total', 'MagicResist.FlatBonus', 'MagicResist.PercentBonus', 
		],[
			'Armor_PercentBonus', 'MagicPenetration_PercentBonus',
			'HealthRegeneration', 'ManaRegeneration',
		],[
			'PerceptionRange.FlatBonus', 'PerceptionRange.PercentBonus', 'Size.Total', 'IsTargetable', 'IsTargetableToTeam', 
			'MoveSpeed.Total', 'Size.Total',
		],[

		],[
			'IsTargetable', 'IsTargetableToTeam', 
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

		this.UpdateReplicant(unit, unit.stats?.Gold, 0, 0);//ok
		this.UpdateReplicant(unit, unit.stats?.TotalGold, 0, 1);

		var SpellsEnabled = 0;
		for(var i in unit.stats.SpellLevel)
			if(unit.stats.SpellLevel[i])
				SpellsEnabled |= 1 << i;

		this.UpdateReplicant(unit, SpellsEnabled, 0, 2);//ok?
		this.UpdateReplicant(unit, SpellsEnabled ? SpellsEnabled >> 32 : undefined, 0, 3);//ok?
		
		var SummonerSpellsEnabled = 0;
		for(var i in unit.stats.SummonerSpellsEnabled)
			if(unit.stats.SummonerSpellsEnabled[i])
				SummonerSpellsEnabled |= 16 << i;
		
		this.UpdateReplicant(unit, SummonerSpellsEnabled, 0, 4);
		this.UpdateReplicant(unit, SummonerSpellsEnabled ? SummonerSpellsEnabled >> 32 : undefined, 0, 5);
		this.UpdateReplicant(unit, unit.stats?.EvolvePoints, 0, 6);//ok?
		this.UpdateReplicant(unit, unit.stats?.EvolveFlags, 0, 7);//ok?
		for (var i = 0; i < 4; i++)
			this.UpdateReplicant(unit, unit.stats?.ManaCost?.[i], 0, 8 + i);
		for(var i = 0; i < 16; i++)
			this.UpdateReplicant(unit, unit.stats?.ManaCost?.[45 + i], 0, 12 + i);

		this.UpdateReplicant(unit, unit.stats?.ActionState, 1, 0);
		this.UpdateReplicant(unit, unit.stats?.IsMagicImmune, 1, 1);
		this.UpdateReplicant(unit, unit.stats?.IsInvulnerable, 1, 2);
		this.UpdateReplicant(unit, unit.stats?.IsPhysicalImmune, 1, 3);
		this.UpdateReplicant(unit, unit.stats?.IsLifestealImmune, 1, 4);
		this.UpdateReplicant(unit, unit.stats?.AttackDamage?.BaseValue, 1, 5);//ok ? in Champion Info
		this.UpdateReplicant(unit, unit.stats?.AbilityPower?.BaseValue, 1, 6);//ok
		this.UpdateReplicant(unit, unit.stats?.DodgeChance, 1, 7);
		this.UpdateReplicant(unit, unit.stats?.CriticalChance?.Total, 1, 8);//ok
		this.UpdateReplicant(unit, unit.stats?.Armor?.Total, 1, 9);//ok
		this.UpdateReplicant(unit, unit.stats?.MagicResist?.Total, 1, 10);//ok
		this.UpdateReplicant(unit, unit.stats?.HealthRegeneration?.Total, 1, 11);//ok
		this.UpdateReplicant(unit, unit.stats?.ManaRegeneration?.Total, 1, 12);//ok
		this.UpdateReplicant(unit, unit.stats?.Range?.Total, 1, 13);//ok
		this.UpdateReplicant(unit, unit.stats?.AttackDamage?.FlatBonus, 1, 14);//ok
		this.UpdateReplicant(unit, unit.stats?.AttackDamage?.PercentBonus, 1, 15);//ok
		this.UpdateReplicant(unit, unit.stats?.AbilityPower?.FlatBonus, 1, 16);//ok
		this.UpdateReplicant(unit, unit.stats?.MagicResist?.FlatBonus, 1, 17);//not working?
		this.UpdateReplicant(unit, unit.stats?.MagicResist?.PercentBonus, 1, 18);//not working?
		this.UpdateReplicant(unit, unit.stats?.AttackSpeedMultiplier?.Total, 1, 19);//ok
		this.UpdateReplicant(unit, unit.stats?.Range?.FlatBonus, 1, 20);//not working?
		this.UpdateReplicant(unit, unit.stats?.CooldownReduction?.Total ? -unit.stats?.CooldownReduction?.Total : undefined, 1, 21);//ok//-
		this.UpdateReplicant(unit, unit.stats?.PassiveCooldownEndTime, 1, 22);//ok
		this.UpdateReplicant(unit, unit.stats?.PassiveCooldownTotalTime, 1, 23);
		this.UpdateReplicant(unit, unit.stats?.ArmorPenetration?.FlatBonus, 1, 24);//ok
		this.UpdateReplicant(unit, unit.stats?.ArmorPenetration?.PercentBonus, 1, 25);//ok
		this.UpdateReplicant(unit, unit.stats?.MagicPenetration?.FlatBonus, 1, 26);//ok
		this.UpdateReplicant(unit, unit.stats?.MagicPenetration?.PercentBonus, 1, 27);//ok
		this.UpdateReplicant(unit, unit.stats?.LifeSteal?.Total, 1, 28);//ok
		this.UpdateReplicant(unit, unit.stats?.SpellVamp?.Total, 1, 29);//ok
		this.UpdateReplicant(unit, unit.stats?.Tenacity?.Total, 1, 30);//ok

		this.UpdateReplicant(unit, unit.stats?.Armor?.PercentBonus, 2, 0);//not working?
		this.UpdateReplicant(unit, unit.stats?.MagicPenetration?.PercentBonus2, 2, 1);//ok
		this.UpdateReplicant(unit, unit.stats?.HealthRegeneration?.BaseValue, 2, 2);
		this.UpdateReplicant(unit, unit.stats?.ManaRegeneration?.BaseValue, 2, 3);

		this.UpdateReplicant(unit, unit.stats?.CurrentHealth, 3, 0);//ok
		this.UpdateReplicant(unit, unit.stats?.CurrentMana, 3, 1);//ok
		this.UpdateReplicant(unit, unit.stats?.HealthPoints?.Total, 3, 2);//ok
		this.UpdateReplicant(unit, unit.stats?.ManaPoints?.Total, 3, 3);//ok
		this.UpdateReplicant(unit, unit.stats?.ExpTotal, 3, 4);//ok
		this.UpdateReplicant(unit, unit.stats?.LifeTime, 3, 5);
		this.UpdateReplicant(unit, unit.stats?.MaxLifeTime, 3, 6);
		this.UpdateReplicant(unit, unit.stats?.LifeTimeTicks, 3, 7);
		this.UpdateReplicant(unit, unit.stats?.PerceptionRange?.FlatMod, 3, 8);//ok
		this.UpdateReplicant(unit, unit.stats?.PerceptionRange?.PercentMod, 3, 9);//ok
		this.UpdateReplicant(unit, unit.stats?.MoveSpeed?.Total, 3, 10);//ok
		this.UpdateReplicant(unit, unit.stats?.Size?.Total, 3, 11);//ok
		this.UpdateReplicant(unit, unit.stats?.FlatPathfindingRadiusMod, 3, 12);//not working?
		this.UpdateReplicant(unit, unit.stats?.Level, 3, 13);//ok
		this.UpdateReplicant(unit, unit.stats?.Owner?.MinionCounter, 3, 14);//ok ? in Scoreboard
		this.UpdateReplicant(unit, unit.stats?.IsTargetable, 3, 15);//ok
		this.UpdateReplicant(unit, unit.stats?.IsTargetableToTeam, 3, 16);
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
