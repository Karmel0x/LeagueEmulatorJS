
const slotId = require('../../../Constants/slotId');
const _Summoner = require("../../DataMethods/_Summoner");


module.exports = class Summoner extends _Summoner {
	static package = require('./package');
    
    static spells = {
        SummonerBarrier: require("./Spells/SummonerBarrier"),
        SummonerBoost: require("./Spells/SummonerBoost"),
        SummonerClairvoyance: require("./Spells/SummonerClairvoyance"),
        SummonerDot: require("./Spells/SummonerDot"),
        SummonerExhaust: require("./Spells/SummonerExhaust"),
        SummonerFlash: require("./Spells/SummonerFlash"),
        SummonerHaste: require("./Spells/SummonerHaste"),
        SummonerHeal: require("./Spells/SummonerHeal"),
        SummonerMana: require("./Spells/SummonerMana"),
        SummonerOdinGarrison: require("./Spells/SummonerOdinGarrison"),
        SummonerRevive: require("./Spells/SummonerRevive"),
        SummonerSmite: require("./Spells/SummonerSmite"),
        SummonerTeleport: require("./Spells/SummonerTeleport"),
    };

    constructor(parent, spells){
        super(parent);

        spells[slotId.D] = spells[slotId.D] || spells[0] || null;
        spells[slotId.F] = spells[slotId.F] || spells[1] || null;

		this.createOnSlots({
			[slotId.D]: this.constructor.spells[spells[slotId.D]] || Object.values(this.constructor.spells)[0],
			[slotId.F]: this.constructor.spells[spells[slotId.F]] || Object.values(this.constructor.spells)[1],
		});
    }
};
