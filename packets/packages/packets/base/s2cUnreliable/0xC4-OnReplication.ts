import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

enum ReplicationType {
	clientOnlyRepData = 0x1,
	localRepData1 = 0x2,
	localRepData2 = 0x4,
	mapRepData = 0x8,
	onVisibleRepData = 0x10,
	globalRepData = 0x20,
}

class ReplicantBase {
	static types = {
		bool: 1 as unknown as boolean,
		int: 2,
		float: 3,
	};

	static zero = {};

	static one = {};

	static two = {};

	static three = {};

	static four = {};

	static five = {};

	static namesArray() {
		let constructor = this;///** @//type {typeof ReplicantBase} */ (this.constructor);

		return [
			Object.keys(constructor.zero) as (keyof typeof constructor.zero)[],
			Object.keys(constructor.one) as (keyof typeof constructor.one)[],
			Object.keys(constructor.two) as (keyof typeof constructor.two)[],
			Object.keys(constructor.three) as (keyof typeof constructor.three)[],
			Object.keys(constructor.four) as (keyof typeof constructor.four)[],
			Object.keys(constructor.five) as (keyof typeof constructor.five)[],
		];
	}

	static valuesArray() {
		let constructor = this;///** @//type {typeof ReplicantBase} */ (this.constructor);

		return [
			Object.values(constructor.zero) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
			Object.values(constructor.one) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
			Object.values(constructor.two) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
			Object.values(constructor.three) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
			Object.values(constructor.four) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
			Object.values(constructor.five) as (typeof ReplicantBase.types[keyof typeof ReplicantBase.types])[],
		];
	}
}

const characterStateLocalRepData = {//5
	actionState: ReplicantBase.types.int,
	isMagicImmune: ReplicantBase.types.bool,
	isInvulnerable: ReplicantBase.types.bool,
	isPhysicalImmune: ReplicantBase.types.bool,
	isLifestealImmune: ReplicantBase.types.bool,
};

const basicLocalRepData = {//12
	attackDamage_baseValue: ReplicantBase.types.float,
	armor: ReplicantBase.types.float,
	resist: ReplicantBase.types.float,//spellBlock
	attackSpeedMultiplier: ReplicantBase.types.float,
	attackDamage_flatBonus: ReplicantBase.types.float,
	attackDamage_percentBonus: ReplicantBase.types.float,
	abilityPower_flatBonus: ReplicantBase.types.float,
	abilityPower_percentBonus: ReplicantBase.types.float,//
	healthRegen: ReplicantBase.types.float,
	manaRegen: ReplicantBase.types.float,//parRegenRate
	//manaRegen_: ReplicantBase.types.float,//??
	resist_flatBonus: ReplicantBase.types.float,
	resist_percentBonus: ReplicantBase.types.float,
};

const basicMapRepData = {//4
	perceptionRange_flatMod: ReplicantBase.types.float,//bubbleRadius
	perceptionRange_percentMod: ReplicantBase.types.float,
	moveSpeed: ReplicantBase.types.float,
	size: ReplicantBase.types.float,
};

const levelPropRepData = {//2
	isTargetable: ReplicantBase.types.bool,
	isTargetableToTeam: ReplicantBase.types.int,
};

//class ReplicantLevelProp extends ReplicantBase {
//
//	static zero = {};
//
//	static one = {//3
//		health_current: ReplicantBase.types.float,
//		health_total: ReplicantBase.types.float,
//		isInvulnerable: ReplicantBase.types.bool,
//	};
//
//	static two = {};
//
//	static three = {//6
//		...basicMapRepData,//4
//		...levelPropRepData,//2
//	};
//
//	static four = {};
//
//	static five = {};
//}

class ReplicantBuilding extends ReplicantBase {

	static zero = {};

	static one = {//2
		// buildingLocalRepData
		health_current: ReplicantBase.types.float,
		isInvulnerable: ReplicantBase.types.bool,
	};

	static two = {};

	static three = {};

	static four = {};

	static five = {//2
		...levelPropRepData,//2
	};
}

class ReplicantTurret extends ReplicantBase {

	static zero = {};

	static one = {//16
		mana_total: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,

		...characterStateLocalRepData,//5

		// turretLocalRepData
		attackDamage_baseValue: ReplicantBase.types.float,
		armor: ReplicantBase.types.float,
		resist: ReplicantBase.types.float,//spellBlock
		attackSpeedMultiplier: ReplicantBase.types.float,
		attackDamage_flatBonus: ReplicantBase.types.float,
		attackDamage_percentBonus: ReplicantBase.types.float,
		abilityPower_flatBonus: ReplicantBase.types.float,
		abilityPower_percentBonus: ReplicantBase.types.float,//
		healthRegen: ReplicantBase.types.float,
	};

	static two = {};

	static three = {//6
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,

		...basicMapRepData,//4
	};

	static four = {};

	static five = {//2
		...levelPropRepData,//2
	};
}

class ReplicantMonster extends ReplicantBase {//(minionFlags & 8) != 0

	static zero = {};

	static one = {//22
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		lifetime: ReplicantBase.types.float,
		maxLifetime: ReplicantBase.types.float,
		lifetimeTicks: ReplicantBase.types.float,

		...characterStateLocalRepData,//5
		...basicLocalRepData,//12
	};

	static two = {};

	static three = {//6
		...basicMapRepData,//4
		...levelPropRepData,//2
	};

	static four = {};

	static five = {};
}

class ReplicantMinion extends ReplicantBase {

	static zero = {};

	static one = {//24
		health_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		lifetime: ReplicantBase.types.float,
		maxLifetime: ReplicantBase.types.float,
		lifetimeTicks: ReplicantBase.types.float,

		mana_total: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,

		...characterStateLocalRepData,//5
		...basicLocalRepData,//12
	};

	static two = {};

	static three = {//6
		...basicMapRepData,//4
		...levelPropRepData,//2
	};

	static four = {};

	static five = {};
}

class ReplicantHero extends ReplicantBase {

	static zero = {//28
		gold: ReplicantBase.types.float,
		totalGold: ReplicantBase.types.float,
		spellsEnabled: ReplicantBase.types.int,//canCastBits
		spellsEnabled_: ReplicantBase.types.int,//
		summonerSpellsEnabled: ReplicantBase.types.int,//canCastBits2
		summonerSpellsEnabled_: ReplicantBase.types.int,//
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

	static one = {//32
		...characterStateLocalRepData,//5

		// heroLocalRepData1
		attackDamage_baseValue: ReplicantBase.types.float,
		abilityPower_baseValue: ReplicantBase.types.float,
		dodge: ReplicantBase.types.float,
		crit: ReplicantBase.types.float,
		armor: ReplicantBase.types.float,
		resist: ReplicantBase.types.float,//spellBlock
		healthRegen: ReplicantBase.types.float,
		manaRegen: ReplicantBase.types.float,//parRegenRate
		attackRange: ReplicantBase.types.float,
		attackDamage_flatBonus: ReplicantBase.types.float,
		attackDamage_percentBonus: ReplicantBase.types.float,
		abilityPower_flatBonus: ReplicantBase.types.float,
		abilityPower_percentBonus: ReplicantBase.types.float,//
		magicResist_flatBonus: ReplicantBase.types.float,
		magicResist_percentBonus: ReplicantBase.types.float,
		attackSpeedMultiplier: ReplicantBase.types.float,
		castRange_flatBonus: ReplicantBase.types.float,
		cooldownReduction: ReplicantBase.types.float,
		passiveCooldownEndTime: ReplicantBase.types.float,
		passiveCooldownTotalTime: ReplicantBase.types.float,
		armorPenetration_flatBonus: ReplicantBase.types.float,
		armorPenetration_percentBonus: ReplicantBase.types.float,
		magicPenetration_flatBonus: ReplicantBase.types.float,
		magicPenetration_percentBonus: ReplicantBase.types.float,
		lifeSteal: ReplicantBase.types.float,
		spellVamp: ReplicantBase.types.float,
		tenacity: ReplicantBase.types.float,//ccReduction
	};

	static two = {//2
		// heroLocalRepData2
		armorPenetration_percentBonus: ReplicantBase.types.float,
		magicPenetration_percentBonus: ReplicantBase.types.float,

		// ??
		healthRegen_baseValue: ReplicantBase.types.float,
		manaRegen_baseValue: ReplicantBase.types.float,
	};

	static three = {//17
		health_current: ReplicantBase.types.float,
		mana_current: ReplicantBase.types.float,
		health_total: ReplicantBase.types.float,
		mana_total: ReplicantBase.types.float,
		experience: ReplicantBase.types.float,
		lifetime: ReplicantBase.types.float,
		maxLifetime: ReplicantBase.types.float,
		lifetimeTicks: ReplicantBase.types.float,

		// heroMapRepData
		...basicMapRepData,//4
		pathfindingRadius_flatBonus: ReplicantBase.types.float,

		level: ReplicantBase.types.int,
		monstersKilled: ReplicantBase.types.int,

		...levelPropRepData,//2
	};

	static four = {};

	static five = {};

}

export enum ReplicantUnitType {
	Base,
	Building,
	Turret,
	Monster,
	Minion,
	Hero,
};

const replicantListNames = {
	[ReplicantUnitType.Base]: ReplicantBase.namesArray(),
	[ReplicantUnitType.Building]: ReplicantBuilding.namesArray(),
	[ReplicantUnitType.Turret]: ReplicantTurret.namesArray(),
	[ReplicantUnitType.Monster]: ReplicantMonster.namesArray(),
	[ReplicantUnitType.Minion]: ReplicantMinion.namesArray(),
	[ReplicantUnitType.Hero]: ReplicantHero.namesArray(),
};

const replicantListTypes = {
	[ReplicantUnitType.Base]: ReplicantBase.valuesArray(),
	[ReplicantUnitType.Building]: ReplicantBuilding.valuesArray(),
	[ReplicantUnitType.Turret]: ReplicantTurret.valuesArray(),
	[ReplicantUnitType.Monster]: ReplicantMonster.valuesArray(),
	[ReplicantUnitType.Minion]: ReplicantMinion.valuesArray(),
	[ReplicantUnitType.Hero]: ReplicantHero.valuesArray(),
};

export type OnReplicationBaseModel = typeof ReplicantBase.zero & typeof ReplicantBase.one & typeof ReplicantBase.two & typeof ReplicantBase.three & typeof ReplicantBase.four & typeof ReplicantBase.five & {
	netId: number,
	type: ReplicantUnitType | undefined,
	primaryIdArray: number,
	seconadaryIdArray: number[],
	replicant: {
		[seconadaryId: number]: number,
	}[],
};

export type ReplicantValTypes = typeof ReplicantBase.types[keyof typeof ReplicantBase.types];

export type OnReplicationBuildingModel = OnReplicationBaseModel & typeof ReplicantBuilding.zero & typeof ReplicantBuilding.one & typeof ReplicantBuilding.two & typeof ReplicantBuilding.three & typeof ReplicantBuilding.four & typeof ReplicantBuilding.five;
export type OnReplicationTurretModel = OnReplicationBaseModel & typeof ReplicantTurret.zero & typeof ReplicantTurret.one & typeof ReplicantTurret.two & typeof ReplicantTurret.three & typeof ReplicantTurret.four & typeof ReplicantTurret.five;
export type OnReplicationMonsterModel = OnReplicationBaseModel & typeof ReplicantMonster.zero & typeof ReplicantMonster.one & typeof ReplicantMonster.two & typeof ReplicantMonster.three & typeof ReplicantMonster.four & typeof ReplicantMonster.five;
export type OnReplicationMinionModel = OnReplicationBaseModel & typeof ReplicantMinion.zero & typeof ReplicantMinion.one & typeof ReplicantMinion.two & typeof ReplicantMinion.three & typeof ReplicantMinion.four & typeof ReplicantMinion.five;
export type OnReplicationHeroModel = OnReplicationBaseModel & typeof ReplicantHero.zero & typeof ReplicantHero.one & typeof ReplicantHero.two & typeof ReplicantHero.three & typeof ReplicantHero.four & typeof ReplicantHero.five;

export type OnReplicationUnitModel = OnReplicationBaseModel | OnReplicationHeroModel | OnReplicationTurretModel | OnReplicationBuildingModel | OnReplicationMinionModel;

export type OnReplicationModel = BasePacketModel & {
	syncId: number,
	replicationUnits: OnReplicationUnitModel[],
};

export default class OnReplication extends BasePacket {
	static create(payload: Partial<OnReplicationModel>) {
		return super.create(payload);
	}

	static fillReplicant(unit: OnReplicationUnitModel) {
		let nameList = replicantListNames[ReplicantUnitType.Hero];
		for (let i = 0; i < nameList.length; i++) {
			let namesArray = nameList[i];
			for (let j = 0; j < namesArray.length; j++) {
				let name = namesArray[j];
				let value = unit[name];
				this.updateReplicant(unit, value, i, j);
			}
		}
	}

	static updateReplicant(unit: OnReplicationUnitModel, value: ReplicantValTypes | undefined, primaryId: number, secondaryId: number) {
		if (typeof value === 'undefined' || unit.replicant[primaryId][secondaryId] === value)
			return;

		unit.primaryIdArray |= 1 << primaryId;
		unit.seconadaryIdArray[primaryId] |= 1 << secondaryId;

		unit.replicant[primaryId][secondaryId] = value as number;
	}

	static recognizeReplicationUnitType(unit: OnReplicationUnitModel) {
		// if (unit.netId >= 0xFF000000)
		// 	return ReplicantUnitType.Turret;	
		// else if (unit.netId >= 0x40000000)
		// 	return ReplicantUnitType.Minion;
		return unit.type;
	}

	static recognizeReplicationUnitType2b(unit: OnReplicationUnitModel, primaryId: number, secondaryIdBit: number) {
		if (primaryId === 0) {
			if (secondaryIdBit >= (1 << 0))
				return ReplicantUnitType.Hero;

			return;
		}

		if (primaryId === 1) {
			if (secondaryIdBit > (1 << 24))
				return ReplicantUnitType.Hero;

			if (secondaryIdBit > (1 << 22))
				return ReplicantUnitType.Minion;

			if (secondaryIdBit > (1 << 16))
				return ReplicantUnitType.Monster;

			if (secondaryIdBit > (1 << 2))
				return ReplicantUnitType.Turret;

			if (secondaryIdBit >= (1 << 0))
				return ReplicantUnitType.Building;

			return;
		}

		if (primaryId === 2) {
			if (secondaryIdBit >= (1 << 0))
				return ReplicantUnitType.Hero;

			return;
		}

		if (primaryId === 3) {
			if (secondaryIdBit > (1 << 6))
				return ReplicantUnitType.Hero;

			if (secondaryIdBit >= (1 << 0))
				return ReplicantUnitType.Minion;// or ReplicantUnitType.Turret or ReplicantUnitType.Monster

			return;
		}

		if (primaryId === 5) {
			if (secondaryIdBit >= (1 << 0))
				return ReplicantUnitType.Turret;// or ReplicantUnitType.Building

			return;
		}
	}

	static recognizeReplicationUnitType2(unit: OnReplicationUnitModel, primaryId: number, secondaryIdBit: number) {
		let previousType = unit.type || ReplicantUnitType.Base;
		let type = this.recognizeReplicationUnitType2b(unit, primaryId, secondaryIdBit);
		return Math.max(previousType, type || ReplicantUnitType.Base) as ReplicantUnitType;
	}

	static readReplicantValue(dvr: RelativeDataView, type: ReplicantValTypes) {

		if (type == ReplicantBase.types.bool) {
			let val = dvr.readUint8();
			return val;
		}

		if (type == ReplicantBase.types.int) {

			let num = 0;
			let val = 0;
			do {
				num = dvr.readUint8();
				val = val * 128 + num;
			} while (num >= 0x80);

			return val;
		}

		if (type == ReplicantBase.types.float) {
			let f = dvr.readUint8();
			if (f < 0xFE)
				--dvr.offset;

			let val = dvr.readFloat();
			return val;
		}
	}

	/**
	 * @todo recognition of replication unit type is bad, need to check how to do it properly
	 * client probably getting unit type by spawned unit netId, but we can't do it in packet-inspector
	 */
	static reader(dvr: RelativeDataView, payload: OnReplicationModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		let count = dvr.readUint8();
		payload.replicationUnits = [];
		for (let i = 0; i < count; i++) {
			payload.replicationUnits[i] = payload.replicationUnits[i] || {};
			let unit = payload.replicationUnits[i];

			unit.primaryIdArray = dvr.readUint8();
			unit.netId = dvr.readUint32();

			//if (i > 0) {
			//	let v = this.readReplicantValue(dvr, ReplicantBase.types.int);
			//	console.log('v', v);
			//}

			unit.type = this.recognizeReplicationUnitType(unit);
			//console.log(
			//	'unit.primaryIdArray', unit.primaryIdArray,
			//	'unit.netId', unit.netId,
			//	'unit.type', unit.type,
			//);

			unit.seconadaryIdArray = [];
			unit.replicant = [];

			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) === 0)
					continue;

				unit.replicant[primaryId] = {};
				let replicantPrimary = unit.replicant[primaryId];
				let secondaryIdBit = unit.seconadaryIdArray[primaryId] = dvr.readUint32();
				let dataCount = dvr.readUint8();
				let sizeOffset = dvr.offset;

				unit.type = this.recognizeReplicationUnitType2(unit, primaryId, secondaryIdBit);
				//console.log(
				//	'primaryId', primaryId,
				//	'secondaryIdBit', secondaryIdBit,
				//	'dataCount', dataCount,
				//	'unit.type', unit.type,
				//);
				//console.log('unit.type', unit.type, primaryId, secondaryIdBit);

				let ReplicantValTypesPrimary = replicantListTypes[unit.type][primaryId];

				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((secondaryIdBit & (1 << secondaryId >>> 0)) === 0)
						continue;

					let replicantType = ReplicantValTypesPrimary[secondaryId];
					//console.log(
					//	'replicantType', replicantType,
					//	'primaryId', primaryId,
					//	'secondaryId', secondaryId,
					//);

					let val = this.readReplicantValue(dvr, replicantType);
					if (typeof val === 'undefined') {
						console.log('unknown replicantType', replicantType, primaryId, secondaryId, unit);
					}
					else {
						//console.log('val', val);
						replicantPrimary[secondaryId] = val;
					}
				}

				if (dvr.offset != (sizeOffset + dataCount)) {
					console.log('dvr.offset != (sizeOffset + dataCount)', dvr.offset, sizeOffset, dataCount);
				}

				dvr.offset = sizeOffset + dataCount;
				//console.log(primaryId, unit.replicant[primaryId]);
			}
		}
	}

	static writeReplicantValue(dvr: RelativeDataView, type: ReplicantValTypes, val: number) {

		if (type == ReplicantBase.types.bool) {
			dvr.writeUint8(val);
			return;
		}

		if (type == ReplicantBase.types.int) {
			let num = val;
			while (num >= 0x80) {
				dvr.writeUint8(num | 0x80);
				num >>= 7;
			}
			dvr.writeUint8(num);
			return;
		}

		if (type == ReplicantBase.types.float) {
			if (val >= 0xFE000000)
				dvr.writeUint8(0xFE);

			dvr.writeFloat(val);
			return;
		}

		console.log('unknown ReplicantValType', type);
	}

	static writer(dvr: RelativeDataView, payload: OnReplicationModel) {
		if (!payload.replicationUnits || payload.replicationUnits.length == 0)
			return;

		super.writer(dvr, payload);

		let syncId = payload.syncId || performance.now();
		dvr.writeInt32(syncId);

		let count = payload.replicationUnits.length;
		dvr.writeUint8(count);
		for (let i = 0; i < count; i++) {
			let unit = payload.replicationUnits[i];

			unit.replicant = unit.replicant || [{}, {}, {}, {}, {}, {}];
			unit.primaryIdArray = 0;
			unit.seconadaryIdArray = [0, 0, 0, 0, 0, 0];

			this.fillReplicant(unit);

			dvr.writeUint8(unit.primaryIdArray);
			dvr.writeUint32(unit.netId);

			let unitType = unit.type || ReplicantUnitType.Base;

			for (let primaryId = 0; primaryId < 6; primaryId++) {
				if ((unit.primaryIdArray & (1 << primaryId)) == 0)
					continue;

				let ReplicantValTypesUnit = replicantListTypes[unitType];
				if (!ReplicantValTypesUnit)
					continue;

				let ReplicantValTypesPrimary = ReplicantValTypesUnit[primaryId];
				if (!ReplicantValTypesPrimary)
					continue;

				let seconadaryIdVal = unit.seconadaryIdArray[primaryId];
				dvr.writeUint32(seconadaryIdVal);
				let sizeOffset = dvr.offset++;

				for (let secondaryId = 0; secondaryId < 32; secondaryId++) {
					if ((seconadaryIdVal & (1 << secondaryId >>> 0)) == 0)
						continue;

					let replicantType = ReplicantValTypesPrimary[secondaryId];
					let val = unit.replicant[primaryId][secondaryId];
					this.writeReplicantValue(dvr, replicantType, val);
				}

				dvr.dv.setUint8(sizeOffset, dvr.offset - (sizeOffset + 1));
			}
		}
	}
}
