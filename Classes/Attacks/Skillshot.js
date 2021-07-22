
const Missile = require('./Missile');


class Skillshot extends Missile {

    reachedDest(target){
        //this.parent.battle.attack(target);
    }
    collisionCallback_range = 60;
    collisionCallback(target){
        if(this.parent == target)
            return;

        this.parent.battle.attack(target);
        this.collisionCallback = null;
        //this.Waypoints = [];
    }
}


module.exports = Skillshot;
