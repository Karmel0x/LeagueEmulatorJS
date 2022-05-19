var BattleUnit = require('../Unit/Battle');
const { createPacket } = require('../../../Core/PacketUtilities');
const EVENT = require("../../../Packets/EVENT");


class BattlePlayer extends BattleUnit {

	announceDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.parent.netId;
		ANNOUNCE2.id = EVENT.OnChampionDie;
		ANNOUNCE2.EventData = {
			OtherNetId: source.parent.netId
		};
		this.parent.packetController.sendTo_everyone(ANNOUNCE2);
	}
	/**
	 * Wait for respawn time to pass to respawn
	 * @todo should be in Unit loop ?
	 */
	async respawnWaiter(){
		this.parent.death.lastRespawnTime = this.parent.death.respawnTime || false;

		if(this.parent.death.lastRespawnTime === false)
			return;

		this.parent.death.totalRespawnTime += this.parent.death.lastRespawnTime;
		while(this.died + this.parent.death.lastRespawnTime < Date.now() / 1000){
			await global.Utilities.wait(100);
			continue;
		}

		this.parent.respawn();
	}
	async onDie(source){
		this.announceDie(source);

		if(!this.died)
			return console.log('[weird] died but not died?');

		this.respawnWaiter();
	}

}


module.exports = BattlePlayer;
