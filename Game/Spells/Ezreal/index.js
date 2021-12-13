
module.exports = class SpellsEzreal {
	static list = {
		EzrealQ: require('./EzrealQ'),
		EzrealW: require('./EzrealW'),
		EzrealE: require('./EzrealE'),
		EzrealR: require('./EzrealR'),
	};
	
    constructor(parent){
		this.parent = parent;

        this.spells = {
			0: new SpellsEzreal.list.EzrealQ(this),
			1: new SpellsEzreal.list.EzrealW(this),
			2: new SpellsEzreal.list.EzrealE(this),
			3: new SpellsEzreal.list.EzrealR(this),
        }
    }
	castSpell(packet){
        this.spells[packet.Slot].cast(packet);
	}
};
