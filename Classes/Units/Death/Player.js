var DeathUnit = require('./Unit')

const respawnTimes = [
    7.5, 10.0, 12.5, 15.0, 17.5, 20.0,
    22.5, 25.0, 27.5, 30.0, 32.5, 35.0,
    37.5, 40.0, 42.5, 45.0, 47.5, 50.0,
];


class DeathPlayer extends DeathUnit {

    get respawnTime(){
        return respawnTimes[this.parent.stats.Level];
    }
    Exp = 0;
    KillDeathCounter = 0;
    get Gold(){
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

}


module.exports = DeathPlayer;
