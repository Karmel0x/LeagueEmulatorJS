
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const EzrealArcaneShiftMissile = require("./EzrealArcaneShiftMissile");

const package1 = require('../package');
const slotId = require("../../../../../Constants/slotId");


module.exports = class EzrealArcaneShift extends _Spell {
	PackageHash = package1.PackageHash;
	SpellSlot = slotId.E;
	movingSpell = true;
	
	constructor(options){
		super(options);

		this.childSpells.push(new EzrealArcaneShiftMissile({...options, parentSpell: this}));
	}

	preCast(spellData){

		spellData.position = spellData.packet.position;
		return super.preCast(spellData);
	}
	onCast(spellData){
		super.onCast(spellData);

		this.owner.dashTo(spellData.packet.position, {speed: 1800, range: 400});
		
	}
};
