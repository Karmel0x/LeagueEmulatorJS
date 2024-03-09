import * as packets from '@workspace/packets/packages/packets';
import Unit from '../../units/unit';
import { sendUnitStats } from '../../../packet-helpers/OnReplication';
import Levelable from './levelable';
import Hero from '../../units/hero';

const spellLevelMax = [5, 5, 5, 3];
const ExpCurve = [
    0, 280, 660, 1140, 1720, 2400,
    3180, 4060, 5040, 6120, 7300, 8580,
    9960, 11440, 13020, 14700, 16480, 18360,

    19060, 19760, 20460, 21160,
    21860, 22560, 23260, 23960,
    24660, 25360, 26060, 26760,
];

/**
 * Trait for units that can be leveled up
 */
export default class Progress extends Levelable {
    declare owner: Hero;

    exp = 0;
    expTotal = 0;
    gold = 10000;
    goldTotal = 10000;

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

        let championWithEvolvePoints = false;
        if (championWithEvolvePoints && (this.level == 6 || this.level == 11 || this.level == 16))
            ++this.evolvePoints;

        this.owner.packets.skillUpgrade_send(0);//for now
        if (sendStats)
            sendUnitStats(this.owner);
    }

    /**
     * Increase gold
     */
    goldUp(amount: number, source: Unit | number = 0) {
        this.gold += amount;

        let packet1 = packets.UnitAddGold.create({
            sourceNetId: (source as Unit).netId || source as number,
            targetNetId: this.owner.netId,
            amount: amount,
        });
        this.owner.network?.sendPacket(packet1);

        console.log('goldUp', amount);
    }

    /**
     * Increase exp and level up if needed
     */
    expUp(amount: number) {
        this.exp += amount;
        this.expTotal += amount;
        while (this.expTotal >= ExpCurve[this.level]) {
            //this.exp -= ExpCurve[this.level];
            this.levelUp(false);
        }

        sendUnitStats(this.owner);
        console.log('expUp', amount);
    }

    /**
     * Skill upgrade by 1
     */
    skillUpgrade(slot: number, isEvolve = false) {

        if (isEvolve) {
            if (this.evolvePoints < 1)
                return;

            if (this.evolvePointsF[slot] == true)
                return;

            this.evolvePointsF[slot] = true;
            --this.evolvePoints;
            return;
        }

        if (this.skillPoints < 1)
            return;

        if (this.spellLevel[slot] >= spellLevelMax[slot])
            return;

        ++this.spellLevel[slot];
        --this.skillPoints;
        this.owner.packets.skillUpgrade_send(slot);
        sendUnitStats(this.owner);
    }

}
