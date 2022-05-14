const SpellSlot = require("../../../../Constants/SpellSlot");
const _Yasuo = require("./_Yasuo");


module.exports = class SpellsYasuo extends _Yasuo {
	static list = {
		YasuoQ: require('./YasuoQ'),
		YasuoW: require('./YasuoW'),
		YasuoE: require('./YasuoE'),
		YasuoR: require('./YasuoR'),
		YasuoA: require('./YasuoA'),
	};
	
    constructor(parent){
        super();
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

        this.spells = {
			[SpellSlot.Q]: new SpellsYasuo.list.YasuoQ(this),
			[SpellSlot.W]: new SpellsYasuo.list.YasuoW(this),
			[SpellSlot.E]: new SpellsYasuo.list.YasuoE(this),
			[SpellSlot.R]: new SpellsYasuo.list.YasuoR(this),
			
			[SpellSlot.A]: new SpellsYasuo.list.YasuoA(this),
        }
    }
	castSpell(packet){
        this.spells[packet.Slot]?.preCast(packet);
	}
};
