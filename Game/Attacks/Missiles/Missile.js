
const { Vector2 } = require('three');
const IStat = require('../../Units/IStat');


//global.baseMissileNetId = 0x60000000;
global.Missiles = global.Missiles || {};
global.MissilesCount = global.MissilesCount || {count: 0};

class Missile {
	callbacks = {
		move: {},
		collision: {},
	};
	appendGlobal(){

		this.id = global.MissilesCount.count;
		++global.MissilesCount.count;

		global.Missiles[this.netId] = this;
	}
	removeGlobal(){
		
		delete global.Missiles[this.netId];
	}
	initialize(){
		// override
	}
	constructor(parent, options = {}){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;
		
		this.options = options;
		this.initialize();
		//Object.assign(this, config);
		this.netId = this.netId || ++global.lastNetId;
		this.stats = {};
		this.stats.MoveSpeed = new IStat(options.speed || 2000);

		//console.debug(Date.now(), 'Created Missile', this.constructor.name);
		this.Movement.Waypoints = [this.parent.Position.clone()];
		this.appendGlobal();
	}
	destructor(){
		this.removeGlobal();
	}
	fire_TargetNetId(TargetNetId, WindupPercent = 20){

		if(!global.unitsNetId[TargetNetId])
			return console.log('global.unitsNetId[netId] does not contain', TargetNetId);

		var target = global.unitsNetId[TargetNetId];
		this.fire(target, WindupPercent);
	}
	async fire(target, WindupPercentt = 10){
		// https://leagueoflegends.fandom.com/wiki/Basic_attack#Windup
		let WindupPercent = WindupPercentt / 100;
		let WindupModifier = 1;//?

		let bWindupTime = 1 / this.parent.stats.AttackSpeed.BaseValue;
		let cAttackTime = 1 / this.parent.stats.AttackSpeed.Total;
		let windup = bWindupTime + ((cAttackTime * WindupPercent) - bWindupTime) * WindupModifier;

		console.debug('windup', windup, this.parent.stats.AttackSpeed);
		await global.Utilities.wait(windup * 1000);
		this.firefire(target, windup);
	}
	Movement = {
		Waypoints: [new Vector2(0, 0)]
	};
	get Position(){
		return this.Movement.Waypoints[0];
	}
	set Position(position){
		this.Movement.Waypoints = [position];
	}
	moveTime = 0;
	firefire(target){

		console.debug('Missile.firefire',
			'this.parent.netId', this.parent.netId, 'this.parent.Position', this.parent.Position,
			'this.netId', this.netId, 'this.Position', this.Position,
			'target.netId', target.netId, 'target.Position', target.Position);

		this.fly(target);
	}
	/**
	 * Called when the missile reaches its destination (hit the target)
	 * @abstract
	 * @param {Unit} target 
	 */
	reachedDest(target){
		// override
		console.log('Missile.reachedDest');
	}
	fulfillRange = 1;
	fly(target){

		console.debug(this.Movement.Waypoints[0].distanceTo(target.Position), this.fulfillRange);
		if(this.Movement.Waypoints[0].distanceTo(target.Position) > this.fulfillRange){
			this.callbacks.move._ = {
				options: {
					range: this.fulfillRange,
				},
				function: () => {
					delete this.callbacks.move._;
					console.log('Missile.fly callbacks.move._');
					this.fly(target);
				}
			};
			this.move1(target.Position);
			return;
		}
		this.reachedDest(target);
	}

	move1(position){
		this.Movement.Waypoints = [this.Movement.Waypoints[0], position];
	}
}


module.exports = Missile;
