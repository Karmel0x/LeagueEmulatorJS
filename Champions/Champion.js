

module.exports = class Champion {
	constructor(parent){
		this.parent = parent;

	}
	castSpell(packet){
		this.spells[packet.Slot].preCast(packet);
	}
};
