
import SVector3 from '../sharedstruct/SVector3';


const target = {
	unit: 'uint32',
	hitResult: 'uint8',
};

const SCastInfo_struct = {
	size: 'uint16',
	spellHash: 'uint32',
	spellCastNetId: 'uint32',
	spellLevel: 'uint8',
	attackSpeedModifier: 'float',
	casterNetId: 'uint32',
	spellChainOwnerNetId: 'uint32',
	packageHash: 'uint32',
	missileNetId: 'uint32',
	targetPosition: SVector3,
	targetPositionEnd: SVector3,

	targetCount: 'uint8',
	//target: [target, 'targetCount'],
};
const SCastInfo_struct2 = {
	designerCastTime: 'float',
	extraCastTime: 'float',
	designerTotalTime: 'float',
	// if designerCastTime == -1 then cooldown is different
	cooldown: 'float',
	startCastTime: 'float',

	bitfield: ['bitfield', {
		isAutoAttack: 1,
		isSecondAutoAttack: 2,
		isForceCastingOrChannel: 4,
		isOverrideCastPosition: 8,
		isClickCasted: 16,
	}],

	spellSlot: 'uint8',
	manaCost: 'float',
	spellCastLaunchPosition: SVector3,
	ammoUsed: 'int32',
	ammoRechargeTime: 'float',
};

export default {//SCastInfo
	reader: (buffer) => {
		let obj = {};

		Object.assign(obj, buffer.read(SCastInfo_struct));
		obj.target = buffer.read([target, obj.targetCount]);
		Object.assign(obj, buffer.read(SCastInfo_struct2));

		return obj;
	},
	writer: (buffer, source) => {
		source.targetCount = source.target.length;
		source.size = 102 + (source.targetCount * 5);

		buffer.write(SCastInfo_struct, source);
		buffer.write([target, source.targetCount], source.target);
		buffer.write(SCastInfo_struct2, source);
	}
};
