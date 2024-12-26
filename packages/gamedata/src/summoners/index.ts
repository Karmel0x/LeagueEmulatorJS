
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Summoner from '@repo/gameserver/src/game/basedata/summoner';
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
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class Summoners extends _Summoner {
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

    get base() {
        return this.constructor as typeof Summoners
    }

    constructor(owner: AttackableUnit, spells: { [slot: number]: keyof typeof Summoners.spells }) {
        super(owner);

        let summonerSpellD = spells[SlotId.D] || spells[0];
        let summonerSpellF = spells[SlotId.F] || spells[1];

        this.createOnSlots({
            [SlotId.D]: this.base.spells[summonerSpellD] || Object.values(this.base.spells)[0],
            [SlotId.F]: this.base.spells[summonerSpellF] || Object.values(this.base.spells)[1],
        });
    }
}
