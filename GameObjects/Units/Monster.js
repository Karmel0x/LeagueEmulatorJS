
const { Vector2 } = require('three');
const { removeGlobal } = require('./global.Units');

const ExtendWTraits = require('../../Core/ExtendWTraits');
const Unit = require('./Unit');
const IDefendable = require('../Traits/IDefendable');
const IAttackable = require('../Traits/IAttackable');
const IMovable = require('../Traits/IMovable');
const loadingStages = require('../../Constants/loadingStages');


class Monster extends ExtendWTraits(Unit, IDefendable, IAttackable, IMovable) {
	/**
	 * 
	 * @param {Object} options
	 * @param {JungleCamp} options.spawner
	 */
	constructor(options){
		options.spawnPosition = options.spawnPosition || options.position || options.spawner.spawnPosition || options.spawner.position;
		options.team = options.team || options.spawner.team;
		super(options);
		
		this.spawner = options.spawner;

		//console.log(this);
		this.initialized();

		this.on('noTargetsInRange', () => {
			var InstantStop_Attack = global.Network.createPacket('InstantStop_Attack', 'S2C');
			InstantStop_Attack.netId = this.netId;
			InstantStop_Attack.flags = {};
			this.sendTo_everyone(InstantStop_Attack);

		});

		this.spawnAns1();
	}

	/**
	 * @todo send this packet on first visibility ?
	 */
	spawnAns1(){
		var CreateNeutral = global.Network.createPacket('CreateNeutral');
		Object.assign(CreateNeutral, {
			netId: this.netId,
			netObjId: this.netId,
			netNodeId: 0x40,
			position: this.position,
			groupPosition: this.spawner?.position || this.position,
			faceDirectionPosition: this.position,
			objectName: this.info.name,
			skinName: this.character.name,
			uniqueName: this.info.name,
			spawnAnimationName: '',
			teamId: this.team,
			damageBonus: 0,
			healthBonus: 0,
			minionRoamState: 0,
			groupNumber: this.spawner?.num,
			buffSideTeamId: 0,
			revealEvent: 0,
			initialLevel: 1,
			spawnDuration: 0,
			spawnTime: 0,
			behaviorTree: 0,
			aiScript: '',
		});
		global.Teams.ALL.sendPacket(CreateNeutral, loadingStages.LOADING);
		//console.log('CreateNeutral', CreateNeutral);
	}

	// on die / death functions ===========================================================
	
	/**
	 * @todo shall return spawner level
	 */
	get level(){
		return 1;
	}
	get rewardExp(){
		var character = this.character.constructor;
		return character.reward.exp;
	}
	get rewardGold(){
		var character = this.character.constructor;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	/**
	 * 
	 * @param {Unit} source killer
	 */
	onDieRewards(source){
		console.log('onDieRewards', source.team, this.team, source.type);
		// make sure once again if we should reward killer
		if(source.team == this.team || this.killRewarded)
			return;

		this.killRewarded = true;

		if(source.type == 'Player'){
			source.expUp(this.rewardExp);
			source.goldUp(this.rewardGold, this);
		}
	}

	onDie(source){
		this.onDieRewards(source);
	}
	
	// =================================================================================
}


module.exports = Monster;
