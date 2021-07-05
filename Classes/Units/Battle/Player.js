var BattleUnit = require('./Unit')


class BattlePlayer extends BattleUnit {

    async onDie(){
        super.onDie();

        if(!this.died)
            return console.log('[weird] died but not died?');

        this.parent.death.lastRespawnTime = this.parent.death.respawnTime || false;

        if(this.parent.death.lastRespawnTime === false)
            return;

        this.parent.death.totalRespawnTime += this.parent.death.lastRespawnTime;
        while(this.died + this.parent.death.lastRespawnTime < Date.now() / 1000)
            continue;

        this.parent.respawn();
    }

}


module.exports = BattlePlayer;
