var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");

const respawnTimes = [
    7.5, 10.0, 12.5, 15.0, 17.5, 20.0,
    22.5, 25.0, 27.5, 30.0, 32.5, 35.0,
    37.5, 40.0, 42.5, 45.0, 47.5, 50.0,
];
const spellLevelMax = [5, 5, 5, 3];
const ExpCurve = [
    0,
    280.0, 660.0, 1140.0, 1720.0, 2400.0, 3180.0,
    4060.0, 5040.0, 6120.0, 7300.0, 8580.0, 9960.0,
    11440.0,
    13020.0,
    14700.0,
    16480.0,
    18360.0,
    19060.0,
    19760.0,
    20460.0,
    21160.0,
    21860.0,
    22560.0,
    23260.0,
    23960.0,
    24660.0,
    25360.0,
    26060.0,
    26760.0
];

global.Players = global.Players || {};

class Player extends Unit {
    KillDeathCounter = 0;

    constructor(config, team, num){
        super('PLAYER', config, team, num);
        global.Players[num] = this;

        this.loaded = false;
        this.unit.spawnNum = 5;
        //this.netId = 0x400005ed;
    }

    death_getRespawnTime(){
        return respawnTimes[this.Level];
    }
	death_getExp(){
		return 0;
	}
	death_getGold(){
        if(this.KillDeathCounter >= 5)
            return 500;

        let gold = 300;
        if(this.KillDeathCounter >= 0){
            for (var i = this.KillDeathCounter; i > 1; --i)
                gold += gold * 0.165;
            return gold;
        }
        for (var i = this.KillDeathCounter; i < -1; ++i)
            gold -= gold * (0.085 + !!i * 0.115);

        return gold < 50 ? 50 : gold;
	}
    charStats_send(){
        var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
        CHAR_STATS.SyncID = performance.now();
        CHAR_STATS.units = [this];
        var isSent = sendPacket(CHAR_STATS);
    }
    Exp = 0;
    ExpTotal = 0;
    expUp(amount){
        this.Exp += amount;
        this.ExpTotal += amount;
        while(this.Exp >= ExpCurve[this.Level]){
            this.Exp -= ExpCurve[this.Level];
            this.levelUp(false);
        }

        this.charStats_send();
        console.log('expUp', amount);
    }
    Level = 1;
    levelUp(sendStats = true){
        if(this.Level >= 18)
            return;

        ++this.Level;
        ++this.SkillPoints;

        this.skillUpgrade_send(0);//for now
        if(sendStats)
            this.charStats_send();
        console.log('levelUp', this.Level);
    }
    EvolvePoints = 0;
    EvolveBools = [false, false, false, false];
    SkillPoints = 1;
    SpellLevel = [0, 0, 0, 0];
    skillUpgrade(Slot, IsEvolve = false){
        
        if(IsEvolve){
            if(this.EvolvePoints < 0)
                return;

            if(this.EvolveBools[Slot] == true)
                return;

            this.EvolveBools[Slot] = true;
            --this.EvolvePoints;
            return;
        }

        if(this.SkillPoints < 0)
            return;

        if(this.SpellLevel[Slot] >= spellLevelMax[Slot])
            return;

        ++this.SpellLevel[Slot];
        --this.SkillPoints;
        this.skillUpgrade_send(Slot);
    }
    skillUpgrade_send(Slot){
	    var SKILL_UP = createPacket('SKILL_UP', 'S2C');
	    SKILL_UP.netId = this.netId;
	    SKILL_UP.Slot = Slot;
	    SKILL_UP.SpellLevel = this.SpellLevel[Slot];
	    SKILL_UP.SkillPoints = this.SkillPoints;
	    var isSent = sendPacket(SKILL_UP);
	    console.log(SKILL_UP);
    }
}


module.exports = Player;
