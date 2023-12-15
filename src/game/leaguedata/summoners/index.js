
import slotId from '../../../constants/slotId.js';
import _Summoner from '../../datamethods/_Summoner.js';
import package1 from './package.js';

import SummonerBarrier from './spells/SummonerBarrier.js';
import SummonerBoost from './spells/SummonerBoost.js';
import SummonerClairvoyance from './spells/SummonerClairvoyance.js';
import SummonerDot from './spells/SummonerDot.js';
import SummonerExhaust from './spells/SummonerExhaust.js';
import SummonerFlash from './spells/SummonerFlash.js';
import SummonerHaste from './spells/SummonerHaste.js';
import SummonerHeal from './spells/SummonerHeal.js';
import SummonerMana from './spells/SummonerMana.js';
import SummonerOdinGarrison from './spells/SummonerOdinGarrison.js';
import SummonerRevive from './spells/SummonerRevive.js';
import SummonerSmite from './spells/SummonerSmite.js';
import SummonerTeleport from './spells/SummonerTeleport.js';


export default class Summoner extends _Summoner {
    static package = package1;

    static spells = {
        SummonerBarrier,
        SummonerBoost,
        SummonerClairvoyance,
        SummonerDot,
        SummonerExhaust,
        SummonerFlash,
        SummonerHaste,
        SummonerHeal,
        SummonerMana,
        SummonerOdinGarrison,
        SummonerRevive,
        SummonerSmite,
        SummonerTeleport,
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
}
