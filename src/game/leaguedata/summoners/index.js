
const slotId = require('../../../constants/slotId');
const _Summoner = require("../../datamethods/_Summoner");


module.exports = class Summoner extends _Summoner {
    static package = require('./package');

    static spells = {
        SummonerBarrier: require("./spells/SummonerBarrier"),
        SummonerBoost: require("./spells/SummonerBoost"),
        SummonerClairvoyance: require("./spells/SummonerClairvoyance"),
        SummonerDot: require("./spells/SummonerDot"),
        SummonerExhaust: require("./spells/SummonerExhaust"),
        SummonerFlash: require("./spells/SummonerFlash"),
        SummonerHaste: require("./spells/SummonerHaste"),
        SummonerHeal: require("./spells/SummonerHeal"),
        SummonerMana: require("./spells/SummonerMana"),
        SummonerOdinGarrison: require("./spells/SummonerOdinGarrison"),
        SummonerRevive: require("./spells/SummonerRevive"),
        SummonerSmite: require("./spells/SummonerSmite"),
        SummonerTeleport: require("./spells/SummonerTeleport"),
    };

    constructor(parent, spells) {
        super(parent);

        spells[slotId.D] = spells[slotId.D] || spells[0] || null;
        spells[slotId.F] = spells[slotId.F] || spells[1] || null;

        this.createOnSlots({
            [slotId.D]: this.constructor.spells[spells[slotId.D]] || Object.values(this.constructor.spells)[0],
            [slotId.F]: this.constructor.spells[spells[slotId.F]] || Object.values(this.constructor.spells)[1],
        });
    }
};
