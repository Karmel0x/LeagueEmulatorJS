
class BattleUnit {

    constructor(parent){
        this.parent = parent;

    }

    attack(target){
        console.log('BattleUnit.attack', this.parent.netId, target.netId);
        var dmg = {
            ad: 0,
            ap: 0,
        };
        dmg.ad += this.parent.stats.AttackDamage.Total;
        target.battle.damage(this, dmg);
    }
    damage(source, dmg){
        dmg.ad -= this.parent.stats.Armor.Total;
        this.parent.stats.CurrentHealth -= dmg.ad;

        if(this.parent.stats.CurrentHealth <= 0)
            this.die();

        this.parent.SET_HEALTH();
    }
    die(){
        this.parent.stats.CurrentHealth = 0;
        this.onDie();
    }
    died = false;
    onDie(){
        this.died = Date.now() / 1000;

    }
    distanceTo(target){
        return this.parent.Waypoints[0].distanceTo(target.Waypoints[0]);
    }
    inRange(target, range){
        return this.distanceTo(target) <= range;
    }

    heal(hp){
        this.parent.stats.CurrentHealth += hp;
        if(this.parent.stats.CurrentHealth > this.parent.stats.HealthPoints.Total)
            this.parent.stats.CurrentHealth = this.parent.stats.HealthPoints.Total;

        this.parent.SET_HEALTH();
    }
    healPercent(hpPercent){
        this.heal(this.parent.stats.HealthPoints.Total * hpPercent / 100);
    }
}


module.exports = BattleUnit;
