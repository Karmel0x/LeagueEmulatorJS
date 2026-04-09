import * as summonerSpells from '@repo/gamedata/data/summoners/index';

function getSummonerSpells1(spells: string[]) {
    let [spellD, spellF] = spells;
    if (!spellD || !spellF)
        throw new Error('Invalid summoner spells config');

    const Spell1 = summonerSpells[spellD as keyof typeof summonerSpells] || summonerSpells.SummonerBarrier;
    const spell1 = new Spell1();

    const Spell2 = summonerSpells[spellF as keyof typeof summonerSpells] || summonerSpells.SummonerBoost;
    const spell2 = new Spell2();

    return [spell1, spell2];
}

export function getSummonerSpells(spells: string[]) {
    try {
        return getSummonerSpells1(spells);
    }
    catch (e) {
        console.error('getSummonerSpells.error', e);
        return [];
    }
}
