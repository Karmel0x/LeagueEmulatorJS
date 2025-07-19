
import { pinCastEvents } from '@repo/scripting/load/spell-cast';
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


export default class Summoners {
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

    static getSummonerSpells1(spells: string[]) {
        let [spellD, spellF] = spells;
        if (!spellD || !spellF)
            throw new Error('Invalid summoner spells config');

        const Spell1 = this.spells[spellD as keyof typeof this.spells] || this.spells.SummonerBarrier;
        const spell1 = new Spell1();
        spell1.name = Spell1.name;
        pinCastEvents(spell1);

        const Spell2 = this.spells[spellF as keyof typeof this.spells] || this.spells.SummonerBoost;
        const spell2 = new Spell2();
        spell2.name = Spell2.name;
        pinCastEvents(spell2);

        return [spell1, spell2];
    }

    static getSummonerSpells(spells: string[]) {
        try {
            return this.getSummonerSpells1(spells);
        }
        catch (e) {
            console.error('getSummonerSpells.error', e);
            return [];
        }
    }

}
