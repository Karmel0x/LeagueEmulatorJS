import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import { SlotId } from '../../constants/slot-id';
import config from '../../game/game.config';
import type { Player } from '../../gameobjects/unit-ai';
import type Hero from '../../gameobjects/unit-ai/hero';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import type Unit from '../../gameobjects/units/unit';
import Levelable, { type LevelableEvents } from './levelable';

export type ProgressableEvents = LevelableEvents & {
    'levelUp': () => void;
    'levelUpSpell': (slot: number) => void;
};

const spellLevelMax = [5, 5, 5, 3];
const expCurve = Server.map.expCurve;
const rLevelRequirements = [6, 11, 16];
const startingGold = config.testing.enabled && config.testing.startingGold ? config.testing.startingGold : Server.map.constants.startingGold;

/**
 * Trait for units that can be leveled up
 */
export default class Progressable extends Levelable {
    declare readonly owner: AttackableUnit;

    //exp = 0;
    expTotal = 0;
    gold = startingGold;
    goldTotal = this.gold;
    redirectGold?: AttackableUnit;

    evolvePoints = 0;
    evolvePointsF = [false, false, false, false];
    skillPoints = 1;
    spellLevel = [0, 0, 0, 0];
    summonerSpellsEnabled = [true, true];

    /**
     * level up
     */
    levelUp(sendStats = true) {
        if (this.level >= 18)
            return;

        ++this.level;
        console.log('levelUp', this.level);

        ++this.skillPoints;

        const championWithEvolvePoints = false;
        if (championWithEvolvePoints && (this.level === 6 || this.level === 11 || this.level === 16))
            ++this.evolvePoints;

        const owner = this.owner;
        (owner.ai as Hero).packets?.skillUpgrade_send(0);//for now

        if (owner.stats.health)
            owner.stats.health.current += owner.stats.health.perLevel;
        if (owner.stats.mana)
            owner.stats.mana.current += owner.stats.mana.perLevel;

        if (sendStats) {
            owner.markReplicateStats();
        }

        owner.eventEmitter.emit('levelUp');
    }

    /**
     * Increase gold
     */
    goldUp(amount: number, source: Unit | number = 0, notify = true) {
        if (!amount)
            return;

        if (this.redirectGold) {
            this.redirectGold.progress.goldUp(amount, source);
            return;
        }

        amount = Math.round(amount * 100) / 100;
        this.gold += amount;
        this.goldTotal += amount;
        const owner = this.owner;

        if (notify) {
            console.log('goldUp', amount);

            const packet1 = packets.UnitAddGold.create({
                sourceNetId: (source as Unit).netId || source as number,
                targetNetId: owner.netId,
                amount: amount,
            });
            (owner.ai as Player)?.network?.sendPacket(packet1);
        }

        owner.markReplicateStats();
    }

    /**
     * Increase exp and level up if needed
     */
    expUp(amount: number, notify = true) {
        if (!amount)
            return;

        amount = Math.round(amount * 100) / 100;
        this.expTotal += amount;

        while (this.expTotal >= expCurve[this.level - 1]!) {
            this.levelUp(false);
        }

        const owner = this.owner;

        if (notify) {
            console.log('expUp', amount);

            const packet1 = packets.UnitAddEXP.create({
                targetNetId: owner.netId,
                amount: amount,
            });
            (owner.ai as Player)?.network?.sendPacket(packet1);
        }

        owner.markReplicateStats();
    }

    /**
     * Skill upgrade by 1
     */
    skillUpgrade(slot: number, checkRequirements = true, isEvolve = false) {
        if (slot < SlotId.q || slot > SlotId.r)
            return;

        if (isEvolve) {
            if (this.evolvePoints < 1)
                return;

            if (this.evolvePointsF[slot])
                return;

            this.evolvePointsF[slot] = true;
            --this.evolvePoints;
            return;
        }

        if (this.skillPoints < 1)
            return;

        const currentSpellLevel = this.spellLevel[slot] || 0;
        if (currentSpellLevel >= spellLevelMax[slot]!)
            return;

        if (checkRequirements) {
            if (slot === SlotId.r) {
                if (this.level < rLevelRequirements[currentSpellLevel]!) {
                    return;
                }
            }
        }

        ++this.spellLevel[slot]!;
        --this.skillPoints;

        const owner = this.owner;
        (owner.ai as Hero).packets?.skillUpgrade_send(slot);
        owner.markReplicateStats();

        owner.eventEmitter.emit('levelUpSpell', slot);
    }

}
