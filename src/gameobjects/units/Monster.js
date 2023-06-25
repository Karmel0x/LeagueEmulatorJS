
const ExtendWTraits = require('../../core/ExtendWTraits');
const Unit = require('./Unit');
const IDefendable = require('../traits/IDefendable');
const IAttackable = require('../traits/IAttackable');
const IMovable = require('../traits/IMovable');
const loadingStages = require('../../constants/loadingStages');
const Server = require('../../app/Server');


class Monster extends ExtendWTraits(Unit, IDefendable, IAttackable, IMovable) {

	//SetCooldown({slot, cooldown}){
	//	var SetCooldown = Server.network.createPacket('SetCooldown');
	//	SetCooldown.netId = this.netId;
	//	SetCooldown.slot = slot;
	//	SetCooldown.bitfield = {
	//		playVOWhenCooldownReady: false,
	//		isSummonerSpell: false,
	//	};
	//	SetCooldown.cooldown = cooldown;
	//	SetCooldown.maxCooldownForDisplay = cooldown || -1;
	//	this.sendTo_everyone(SetCooldown);
	//}

	/**
	 * @param {import('../GameObjects').MonsterOptions} options 
	 */
	constructor(options) {
		super(options);

		//console.log(this);
		this.initialized();

		//this.SetCooldown({slot: 0, cooldown: 0});
		//this.SetCooldown({slot: 1, cooldown: 0});
		//this.SetCooldown({slot: 2, cooldown: 0});
		//this.SetCooldown({slot: 3, cooldown: 0});

		this.on('noTargetsInRange', () => {
			var InstantStop_Attack = Server.network.createPacket('InstantStop_Attack');
			InstantStop_Attack.netId = this.netId;
			InstantStop_Attack.flags = {};
			this.sendTo_everyone(InstantStop_Attack);
		});

		this.spawnAns1();
	}

	/**
	 * @todo send this packet on first visibility ?
	 */
	spawnAns1() {
		var CreateNeutral = Server.network.createPacket('CreateNeutral');
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
			teamId: this.teamId,
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
		Server.teams.ALL.sendPacket(CreateNeutral, loadingStages.LOADING);
		//console.log('CreateNeutral', CreateNeutral);
	}

	// on die / death functions ===========================================================

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get rewardExp() {
		var character = this.character.constructor;
		return character.reward.exp;
	}

	get rewardGold() {
		var character = this.character.constructor;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	/**
	 * 
	 * @param {Unit} source killer
	 */
	onDieRewards(source) {
		console.log('onDieRewards', source.teamName, this.teamName, source.type);
		// make sure once again if we should reward killer
		if (source.teamId == this.teamId || this.killRewarded)
			return;

		this.killRewarded = true;

		if (source.type == 'Player') {
			source.expUp(this.rewardExp);
			source.goldUp(this.rewardGold, this);
		}
	}

	onDie(source) {
		this.onDieRewards(source);
	}

}


module.exports = Monster;
