
const loadingStages = require("../../../Constants/loadingStages");
const {createPacket, sendPacket, sendPacketS} = require("../../../Core/PacketUtilities");

module.exports = (I) => class IPUnit extends I {

	OnEnterLocalVisibilityClient(){
		var OnEnterLocalVisibilityClient = createPacket('OnEnterLocalVisibilityClient');
		OnEnterLocalVisibilityClient.netId = this.netId;
		OnEnterLocalVisibilityClient.count = 0;
		OnEnterLocalVisibilityClient.health = this.health.total;
		OnEnterLocalVisibilityClient.currentHealth = this.currentHealth;
		this.sendTo_everyone(OnEnterLocalVisibilityClient, loadingStages.NOT_CONNECTED);
		//console.log(OnEnterLocalVisibilityClient);
	}
	ChangeCharacterData(character){
		var ChangeCharacterData = createPacket('ChangeCharacterData');
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
	SetAnimStates(animPairs){
		var SetAnimStates = createPacket('SetAnimStates');
		SetAnimStates.netId = this.netId;
		SetAnimStates.animationOverrides = [];
		for(let i in animPairs)
			SetAnimStates.animationOverrides.push({
				fromAnim: animPairs[i][0],
				toAnim: animPairs[i][1],
			});
		this.sendTo_vision(SetAnimStates);
	}

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	 charStats_send(){
		var OnReplication = createPacket('OnReplication', 'LOW_PRIORITY');
		OnReplication.units = [this];
		this.sendTo_everyone(OnReplication);
	}
	skillUpgrade_send(slot){
		var UpgradeSpellAns = createPacket('UpgradeSpellAns', 'S2C');
		UpgradeSpellAns.netId = this.netId;
		UpgradeSpellAns.slot = slot;
		UpgradeSpellAns.spellLevel = this.spellLevel[slot];
		UpgradeSpellAns.skillPoints = this.skillPoints;
		this.sendTo_self(UpgradeSpellAns);
		//console.debug(UpgradeSpellAns);
	}

};
