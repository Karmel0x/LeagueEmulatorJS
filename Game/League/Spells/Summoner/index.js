
module.exports = class SpellsSummoner {
	static list = require("./list");

    constructor(parent, spellName1 = 'SummonerHeal', spellName2 = 'SummonerFlash'){
		this.parent = parent;

        this.spells = {
            0: new SpellsSummoner.list[spellName1](this),
            1: new SpellsSummoner.list[spellName2](this),
        }
    }
    castSpell(packet){
        this.spells[packet.Slot - 4].cast(packet);
    }
};
