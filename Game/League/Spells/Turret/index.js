
module.exports = class SpellsYasuo {
	static list = {
	};
	
    constructor(parent){
		this.parent = parent;

        this.spells = {
        };
    }
	castSpell(packet){
        this.spells[packet.Slot]?.cast(packet);
	}
};
