
import packets from '../../packets/index.js';
import loadingStages from '../../constants/loadingStages.js';
import Server from '../../app/Server.js';

import Unit from './Unit.js';
import Spellable from '../extensions/combat/Spellable.js';
import Team from '../extensions/traits/Team.js';
import MovingUnit from '../extensions/traits/MovingUnit.js';


class Monster extends Unit {

	combat;
	moving;

	/**
	 * @param {import('../GameObjects.js').MonsterOptions} options 
	 */
	async loader(options) {
		await super.loader(options);

		this.combat = new Spellable(this);
		this.moving = new MovingUnit(this);

		//console.log(this);
		this.initialized();

		//this.SetCooldown({slot: 0, cooldown: 0});
		//this.SetCooldown({slot: 1, cooldown: 0});
		//this.SetCooldown({slot: 2, cooldown: 0});
		//this.SetCooldown({slot: 3, cooldown: 0});

		this.on('noTargetsInRange', () => {
			const packet1 = new packets.InstantStop_Attack();
			packet1.netId = this.netId;
			packet1.flags = {};
			this.packets.toEveryone(packet1);
		});

		this.spawnAns1();
	}

	/**
	 * @param {import('../GameObjects.js').MonsterOptions} options 
	 */
	constructor(options) {
		super(options);
	}

	//SetCooldown({slot, cooldown}){
	//	const packet1 = new packets.SetCooldown();
	//	packet1.netId = this.netId;
	//	packet1.slot = slot;
	//	packet1.bitfield = {
	//		playVOWhenCooldownReady: false,
	//		isSummonerSpell: false,
	//	};
	//	packet1.cooldown = cooldown;
	//	packet1.maxCooldownForDisplay = cooldown || -1;
	//	this.packets.toEveryone(packet1);
	//}

	/**
	 * @todo send this packet on first visibility ?
	 */
	spawnAns1() {
		const packet1 = new packets.CreateNeutral();
		Object.assign(packet1, {
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
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.LOADING);
		//console.log('CreateNeutral', packet1);
	}

	// on die / death functions ===========================================================

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get rewardExp() {
		let character = /** @type {typeof import('../../game/datamethods/characters/_Monster.js')} */ (/** @type {*} */(this.character.constructor));
		return character.reward.exp;
	}

	get rewardGold() {
		let character = /** @type {typeof import('../../game/datamethods/characters/_Monster.js')} */ (/** @type {*} */(this.character.constructor));
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	/**
	 * 
	 * @param {import('../GameObjects.js').AttackableUnit} source killer
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
	 * @param {import('../GameObjects.js').AttackableUnit} source killer
	 */
	onDie(source) {
		this.onDieRewards(source);
	}

}


export default Monster;
