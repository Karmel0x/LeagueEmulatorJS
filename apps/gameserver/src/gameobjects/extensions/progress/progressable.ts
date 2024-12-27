import * as packets from '@repo/packets/list';
import { SlotId } from '../../../constants/slot-id';
import { sendUnitStats } from '../../../packet-helpers/on-replication';
import type { Player } from '../../unit-ai';
import Hero from '../../unit-ai/hero';
import AttackableUnit from '../../units/attackable-unit';
import Unit from '../../units/unit';
import Levelable, { type LevelableEvents } from './levelable';

export type ProgressableEvents = LevelableEvents & {
    'levelUp': () => void;
    'levelUpSpell': (slot: number) => void;
};

const spellLevelMax = [5, 5, 5, 3];
const expCurve = [
    280,
    660,
    1140,
    1720,
    2400,
    3180,
    4060,
    5040,
    6120,
    7300,
    8580,
    9960,
    11440,
    13020,
    14700,
    16480,
    18360,
    19060,
    19760,
    20460,
    21160,
    21860,
    22560,
    23260,
    23960,
    24660,
    25360,
    26060,
    26760,
];

/**
 * Trait for units that can be leveled up
 */
export default class Progressable extends Levelable {
    declare readonly owner: AttackableUnit;

    exp = 0;
    expTotal = 0;
    gold = 475 * 100;// TODO: remove * 100
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

        (this.owner.ai as Hero)?.packets.skillUpgrade_send(0);//for now
        if (sendStats)
            sendUnitStats(this.owner);

        this.owner.eventEmitter.emit('levelUp');
    }

    /**
     * Increase gold
     */
    goldUp(amount: number, source: Unit | number = 0, notify = true) {
        if (this.redirectGold) {
            this.redirectGold.progress.goldUp(amount, source);
            return;
        }

        this.gold += amount;

        if (notify) {
            console.log('goldUp', amount);

            const packet1 = packets.UnitAddGold.create({
                sourceNetId: (source as Unit).netId || source as number,
                targetNetId: this.owner.netId,
                amount: amount,
            });
            (this.owner.ai as Player)?.network?.sendPacket(packet1);
        }

        sendUnitStats(this.owner);
    }

    /**
     * Increase exp and level up if needed
     */
    expUp(amount: number, notify = true) {
        this.exp += amount;
        this.expTotal += amount;

        while (this.exp >= expCurve[this.level - 1]!) {
            this.exp -= expCurve[this.level - 1]!;
            this.levelUp(false);
        }

        if (notify) {
            console.log('expUp', amount);

            const packet1 = packets.UnitAddEXP.create({
                targetNetId: this.owner.netId,
                amount: amount,
            });
            (this.owner.ai as Player)?.network?.sendPacket(packet1);
        }

        sendUnitStats(this.owner);
    }

    /**
     * Skill upgrade by 1
     */
    skillUpgrade(slot: number, isEvolve = false) {

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

        if (slot === SlotId.r && this.level < 6)
            return;

        if (this.spellLevel[slot]! >= spellLevelMax[slot]!)
            return;

        ++this.spellLevel[slot]!;
        --this.skillPoints;
        (this.owner.ai as Hero)?.packets.skillUpgrade_send(slot);
        sendUnitStats(this.owner);

        this.owner.eventEmitter.emit('levelUpSpell', slot);
    }

}
