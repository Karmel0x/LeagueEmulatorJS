
const Server = require("../../../app/Server");
const loadingStages = require("../../../constants/loadingStages");
const Team = require("../traits/Team");


module.exports = class PUnit {
	owner;
	/**
	 * 
	 * @param {import("../../units/Unit")} owner 
	 */
	constructor(owner) {
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
		const OnEnterLocalVisibilityClient = Server.network.createPacket('OnEnterLocalVisibilityClient');
		OnEnterLocalVisibilityClient.netId = this.owner.netId;
		OnEnterLocalVisibilityClient.count = 0;
		OnEnterLocalVisibilityClient.health = this.owner.stats.health.total;
		OnEnterLocalVisibilityClient.currentHealth = this.owner.stats.health.current;
		this.owner.packets.toEveryone(OnEnterLocalVisibilityClient, loadingStages.NOT_CONNECTED);
		//console.log(OnEnterLocalVisibilityClient);
	}

	ChangeCharacterData(character) {
		const ChangeCharacterData = Server.network.createPacket('ChangeCharacterData');
		ChangeCharacterData.netId = this.owner.netId;
		ChangeCharacterData.bitfield = {
			overrideSpells: true,
			modelOnly: false,
			replaceCharacterPackage: true,
		};
		ChangeCharacterData.id = 0;
		ChangeCharacterData.skinId = 0;
		ChangeCharacterData.skinName = character;
		this.owner.packets.toVision(ChangeCharacterData);
	}

	SetAnimStates(animPairs) {
		const SetAnimStates = Server.network.createPacket('SetAnimStates');
		SetAnimStates.netId = this.owner.netId;
		SetAnimStates.animationOverrides = animPairs.map(pair => {
			return {
				fromAnim: pair[0],
				toAnim: pair[1],
			};
		});
		this.owner.packets.toVision(SetAnimStates);
	}

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	charStats_send() {
		const OnReplication = Server.network.createPacket('OnReplication', 'LOW_PRIORITY');
		OnReplication.units = [this.owner];
		this.owner.packets.toEveryone(OnReplication);
	}

	skillUpgrade_send(slot) {
		const UpgradeSpellAns = Server.network.createPacket('UpgradeSpellAns', 'S2C');
		UpgradeSpellAns.netId = this.owner.netId;
		UpgradeSpellAns.slot = slot;
		UpgradeSpellAns.spellLevel = this.owner.progress.spellLevel[slot];
		UpgradeSpellAns.skillPoints = this.owner.progress.skillPoints;
		this.owner.packets.toSelf(UpgradeSpellAns);
		//console.debug(UpgradeSpellAns);
	}

};
