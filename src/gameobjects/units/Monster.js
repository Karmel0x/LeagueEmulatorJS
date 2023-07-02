
const loadingStages = require('../../constants/loadingStages');
const Server = require('../../app/Server');

const Unit = require('./Unit');
const Spellable = require('../extensions/combat/Spellable');
const Moving = require('../extensions/traits/Moving');
const Team = require('../extensions/traits/Team');
const MovingUnit = require('../extensions/traits/MovingUnit');


class Monster extends Unit {

	combat;
	moving;

	/**
	 * @param {import('../GameObjects').MonsterOptions} options 
	 */
	constructor(options) {
		super(options);
		this.options = options;

		this.combat = new Spellable(this);
		this.moving = new MovingUnit(this);

		//console.log(this);
		this.initialized();

		//this.SetCooldown({slot: 0, cooldown: 0});
		//this.SetCooldown({slot: 1, cooldown: 0});
		//this.SetCooldown({slot: 2, cooldown: 0});
		//this.SetCooldown({slot: 3, cooldown: 0});

		this.on('noTargetsInRange', () => {
			const InstantStop_Attack = Server.network.createPacket('InstantStop_Attack');
			InstantStop_Attack.netId = this.netId;
			InstantStop_Attack.flags = {};
			this.packets.toEveryone(InstantStop_Attack);
		});

		this.spawnAns1();
	}

	//SetCooldown({slot, cooldown}){
	//	const SetCooldown = Server.network.createPacket('SetCooldown');
	//	SetCooldown.netId = this.netId;
	//	SetCooldown.slot = slot;
	//	SetCooldown.bitfield = {
	//		playVOWhenCooldownReady: false,
	//		isSummonerSpell: false,
	//	};
	//	SetCooldown.cooldown = cooldown;
	//	SetCooldown.maxCooldownForDisplay = cooldown || -1;
	//	this.packets.toEveryone(SetCooldown);
	//}

	/**
	 * @todo send this packet on first visibility ?
	 */
	spawnAns1() {
		const CreateNeutral = Server.network.createPacket('CreateNeutral');
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
			team: this.team,
			damageBonus: 0,
			healthBonus: 0,
			minionRoamState: 0,
			groupNumber: this.spawner?.team.num,
			buffSideTeamId: 0,
			revealEvent: 0,
			initialLevel: 1,
			spawnDuration: 0,
			spawnTime: 0,
			behaviorTree: 0,
			aiScript: '',
		});
		Server.teams[Team.TEAM_MAX].sendPacket(CreateNeutral, loadingStages.LOADING);
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
		let character = this.character.constructor;
		return character.reward.exp;
	}

	get rewardGold() {
		let character = this.character.constructor;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	/**
	 * 
	 * @param {import('../GameObjects').AttackableUnit} source killer
	 */
	onDieRewards(source) {
		console.log('onDieRewards', source.team.id, this.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id == this.team.id || this.killRewarded)
			return;

		this.killRewarded = true;

		if (source.type == 'Player') {
			source.progress.expUp(this.rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}
	}

	/**
	 * 
	 * @param {import('../GameObjects').AttackableUnit} source killer
	 */
	onDie(source) {
		this.onDieRewards(source);
	}

}


module.exports = Monster;
