
module.exports = class SpellsYasuo {
	static list = {
		YasuoQ: require('./YasuoQ'),
		YasuoW: require('./YasuoW'),
		YasuoE: require('./YasuoE'),
		YasuoR: require('./YasuoR'),
	};
	
    constructor(parent){
		this.parent = parent;

        this.spells = {
			0: new SpellsYasuo.list.YasuoQ(this),
			1: new SpellsYasuo.list.YasuoW(this),
			2: new SpellsYasuo.list.YasuoE(this),
			3: new SpellsYasuo.list.YasuoR(this),
        }
    }
	castSpell(packet){
        this.spells[packet.Slot].cast(packet);
	}
};
