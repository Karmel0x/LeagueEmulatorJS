
const slotId = require('../../../../../Constants/slotId');
const _Spell = require("../../../../DataMethods/Spells/_Spell");

const package1 = require('../package');

const YasuoQ3 = require('./YasuoQ3');
const Dummytarget = require("../../../../../GameObjects/Missiles/Dummytarget");

const PositionHelper = require("../../../../../Functions/PositionHelper");


module.exports = class YasuoQ3W extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Q;
	windup = 0.133;
	cooldown = 5;
	manaCost = 0;
	

	castInfo = {
		target: [],
		designerCastTime: 0.33,
		designerTotalTime: 1.45,
	};
	constructor(options){
		super(options);

		this.childSpells.push(new YasuoQ3({...options, parentSpell: this}));
	}


	castRange = 1150;
	preCast(spellData){
		if(this.owner.hasBuff("YasuoQ") || this.owner.hasBuff("YasuoQ2"))
			return false;

		return super.preCast(spellData);
	}

	onCast(spellData){
		//spellData.position = PositionHelper.getMaxRangePosition(this.owner, spellData.packet, this.castRange);
		spellData.anglePosition = PositionHelper.anglePosition(spellData.packet, this.owner);
		//spellData.target = Dummytarget({position: spellData.packet.position});

	}
};
