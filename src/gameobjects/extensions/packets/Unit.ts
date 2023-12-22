
import packets from '../../../packets/index';
import Server from '../../../app/Server';
import loadingStages from '../../../constants/loadingStages';
import Team from '../traits/Team';
import Unit from '../../units/Unit';


export default class PUnit {
	owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}


	toSelf(packet, minStage = loadingStages.IN_GAME) {
		this.owner.network?.sendPacket(packet, minStage);
	}
	toEveryone(packet, minStage = loadingStages.IN_GAME) {
		Server.teams[Team.TEAM_MAX].sendPacket(packet, minStage);
	}
	toVision(packet, minStage = loadingStages.IN_GAME) {
		Server.teams[Team.TEAM_MAX].sendPacket_withVision(packet, minStage);
	}
	toTeam(packet, minStage = loadingStages.IN_GAME) {
		Server.teams[this.owner.team.id].sendPacket(packet, minStage);
	}
	toLoading(packet) {
		//Server.teams[Team.TEAM_MAX].sendPacket(packet, loadingStages.LOADING);
		Server.teams[Team.TEAM_MAX].sendPacket(packet, loadingStages.NOT_CONNECTED);
	}

	OnEnterLocalVisibilityClient() {
		const packet1 = new packets.OnEnterLocalVisibilityClient();
		packet1.netId = this.owner.netId;
		packet1.count = 0;
		packet1.health = this.owner.stats.health.total;
		packet1.currentHealth = this.owner.stats.health.current;
		this.owner.packets.toEveryone(packet1, loadingStages.NOT_CONNECTED);
		//console.log(packet1);
	}

	ChangeCharacterData(character) {
		const packet1 = new packets.ChangeCharacterData();
		packet1.netId = this.owner.netId;
		packet1.bitfield = {
			overrideSpells: true,
			modelOnly: false,
			replaceCharacterPackage: true,
		};
		packet1.id = 0;
		packet1.skinId = 0;
		packet1.skinName = character;
		this.owner.packets.toVision(packet1);
	}

	SetAnimStates(animPairs) {
		const packet1 = new packets.SetAnimStates();
		packet1.netId = this.owner.netId;
		packet1.animationOverrides = animPairs.map(pair => {
			return {
				fromAnim: pair[0],
				toAnim: pair[1],
			};
		});
		this.owner.packets.toVision(packet1);
	}

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	charStats_send() {
		const packet1 = new packets.OnReplication();
		packet1.units = [this.owner];
		this.owner.packets.toEveryone(packet1);
	}

	skillUpgrade_send(slot) {
		const packet1 = new packets.UpgradeSpellAns();
		packet1.netId = this.owner.netId;
		packet1.slot = slot;
		packet1.spellLevel = this.owner.progress.spellLevel[slot];
		packet1.skillPoints = this.owner.progress.skillPoints;
		this.owner.packets.toSelf(packet1);
		//console.debug(packet1);
	}

}
