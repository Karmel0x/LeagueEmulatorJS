const SpellSlot = require("../../../../Constants/SpellSlot");
const _Summoner = require("./_Summoner");


module.exports = class SpellsSummoner extends _Summoner {
	static list = require("./list");

    constructor(parent, spellName1 = 'SummonerHeal', spellName2 = 'SummonerFlash'){
        super();
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

        this.spells = {
            [SpellSlot.D]: new SpellsSummoner.list[spellName1](this),
            [SpellSlot.F]: new SpellsSummoner.list[spellName2](this),
        };
        this.spells[SpellSlot.D].spellSlot = SpellSlot.D;
        this.spells[SpellSlot.F].spellSlot = SpellSlot.F;
    }
    castSpell(packet){
        this.spells[packet.Slot].cast(packet);
    }
};
