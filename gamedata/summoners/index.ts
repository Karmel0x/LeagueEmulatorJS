
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Summoner from '@workspace/gameserver/src/game/datamethods/_Summoner';
import package1 from './package';

import SummonerBarrier from './spells/SummonerBarrier';
import SummonerBoost from './spells/SummonerBoost';
import SummonerClairvoyance from './spells/SummonerClairvoyance';
import SummonerDot from './spells/SummonerDot';
import SummonerExhaust from './spells/SummonerExhaust';
import SummonerFlash from './spells/SummonerFlash';
import SummonerHaste from './spells/SummonerHaste';
import SummonerHeal from './spells/SummonerHeal';
import SummonerMana from './spells/SummonerMana';
import SummonerOdinGarrison from './spells/SummonerOdinGarrison';
import SummonerRevive from './spells/SummonerRevive';
import SummonerSmite from './spells/SummonerSmite';
import SummonerTeleport from './spells/SummonerTeleport';


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

        spells[SlotId.D] = spells[SlotId.D] || spells[0] || null;
        spells[SlotId.F] = spells[SlotId.F] || spells[1] || null;

        this.createOnSlots({
            [SlotId.D]: this.constructor.spells[spells[SlotId.D]] || Object.values(this.constructor.spells)[0],
            [SlotId.F]: this.constructor.spells[spells[SlotId.F]] || Object.values(this.constructor.spells)[1],
        });
    }
}
