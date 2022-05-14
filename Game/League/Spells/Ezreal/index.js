const SpellSlot = require("../../../../Constants/SpellSlot");
const _Ezreal = require("./_Ezreal");


module.exports = class SpellsEzreal extends _Ezreal {
	static list = {
		EzrealQ: require('./EzrealQ'),
		EzrealW: require('./EzrealW'),
		EzrealE: require('./EzrealE'),
		EzrealR: require('./EzrealR'),
	};
	
    constructor(parent){
        super();
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

        this.spells = {
			[SpellSlot.Q]: new SpellsEzreal.list.EzrealQ(this),
			[SpellSlot.W]: new SpellsEzreal.list.EzrealW(this),
			[SpellSlot.E]: new SpellsEzreal.list.EzrealE(this),
			[SpellSlot.R]: new SpellsEzreal.list.EzrealR(this),
        }
    }
	castSpell(packet){
        this.spells[packet.Slot].preCast(packet);
	}
};
