
const Server = require("../../../app/Server");
const loadingStages = require("../../../constants/loadingStages");


/**
 * 
 * @mixin
 * @param {GameObject} I
 */
module.exports = (I) => class IPUnit extends I {

	OnEnterLocalVisibilityClient() {
		var OnEnterLocalVisibilityClient = Server.network.createPacket('OnEnterLocalVisibilityClient');
		OnEnterLocalVisibilityClient.netId = this.netId;
		OnEnterLocalVisibilityClient.count = 0;
		OnEnterLocalVisibilityClient.health = this.health.total;
		OnEnterLocalVisibilityClient.currentHealth = this.health.current;
		this.sendTo_everyone(OnEnterLocalVisibilityClient, loadingStages.NOT_CONNECTED);
		//console.log(OnEnterLocalVisibilityClient);
	}

	ChangeCharacterData(character) {
		var ChangeCharacterData = Server.network.createPacket('ChangeCharacterData');
		ChangeCharacterData.netId = this.netId;
		ChangeCharacterData.bitfield = {
			overrideSpells: true,
			modelOnly: false,
			replaceCharacterPackage: true,
		};
		ChangeCharacterData.id = 0;
		ChangeCharacterData.skinId = 0;
		ChangeCharacterData.skinName = character;
		this.sendTo_vision(ChangeCharacterData);
	}

	SetAnimStates(animPairs) {
		var SetAnimStates = Server.network.createPacket('SetAnimStates');
		SetAnimStates.netId = this.netId;
		SetAnimStates.animationOverrides = animPairs.map(pair => {
			return {
				fromAnim: pair[0],
				toAnim: pair[1],
			};
		});
		this.sendTo_vision(SetAnimStates);
	}

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	charStats_send() {
		var OnReplication = Server.network.createPacket('OnReplication', 'LOW_PRIORITY');
		OnReplication.units = [this];
		this.sendTo_everyone(OnReplication);
	}

	skillUpgrade_send(slot) {
		var UpgradeSpellAns = Server.network.createPacket('UpgradeSpellAns', 'S2C');
		UpgradeSpellAns.netId = this.netId;
		UpgradeSpellAns.slot = slot;
		UpgradeSpellAns.spellLevel = this.spellLevel[slot];
		UpgradeSpellAns.skillPoints = this.skillPoints;
		this.sendTo_self(UpgradeSpellAns);
		//console.debug(UpgradeSpellAns);
	}

};
