
const IStat = require('../Units/Stats/IStat');


//global.baseMissileNetId = 0x60000000;
global.Missiles = global.Missiles || {};
global.MissilesCount = global.MissilesCount || {count: 0};

class Missile {
    appendGlobal(){

        this.id = global.MissilesCount.count;
        ++global.MissilesCount.count;

		global.Missiles[this.netId] = this;
    }
    constructor(parent, config = {}){
		this.parent = parent;
        this.initialize();
        //Object.assign(this, config);
        this.netId = this.netId || ++global.baseNetId;
		this.stats = {};
		this.stats.MoveSpeed = new IStat(config.speed || 2000);

        console.debug(Date.now(), 'Created Missile', this);
		this.Waypoints = [];
		this.appendGlobal();
    }
    initialize(){
        //nothing here..
    }
    fire_TargetNetID(TargetNetID){

        if(!global.Units['netId'][TargetNetID])
            return console.log('global.Units[netId] does not contain', TargetNetID);

		var target = global.Units['netId'][TargetNetID];
		this.fire(target);
    }
    async fire(target){
		// https://leagueoflegends.fandom.com/wiki/Basic_attack#Windup
		let WindupPercent = 18.839 / 100;
		let WindupModifier = 1;//?

		let bWindupTime = 1 / this.parent.stats.AttackSpeed.BaseValue;
		let cAttackTime = 1 / this.parent.stats.AttackSpeed.Total;
		let windup = bWindupTime + ((cAttackTime * WindupPercent) - bWindupTime) * WindupModifier;

        console.debug('windup', windup);
		await global.Utilities.wait(windup * 1000);
        this.firefire(target, windup);
    }
    firefire(target){

		this.transform = {
			position: this.parent.transform.position.clone(),
			rotation: 0,
		};
		console.debug('Missile.firefire',
			'this.parent.netId', this.parent.netId, 'this.parent.transform.position', this.parent.transform.position,
			'this.netId', this.netId, 'this.transform.position', this.transform.position,
			'target.netId', target.netId, 'target.transform.position', target.transform.position);

        this.fly(target);
    }
    fly(target){

		var fulfillRange = 1;//this.stats.Range.Total;
        console.debug(this.transform.position.distanceTo(target.transform.position), fulfillRange);
        if(this.transform.position.distanceTo(target.transform.position) > fulfillRange){
            this.moveCallback_range = fulfillRange;
            this.moveCallback = () => {
                this.moveCallback = null;
                this.fly(target);
            };
            this.move1(target.transform.position);
            return;
        }
        this.reachedDest(target);
		delete global.Missiles[this.netId];
    }
    reachedDest(target){
        this.parent.battle.attack(target);
    }


    move1(position){
        let tcc = [this.transform.position, position];
        this.move(tcc);
    }
    move(tcc){
        this.Waypoints = tcc;
    }
}


module.exports = Missile;
