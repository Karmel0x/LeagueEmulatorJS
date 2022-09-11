var Unit = require('./Unit');
const loadingStages = require("../../Constants/loadingStages");


const Nexuses = {
	BLUE: {
		0: {netId: 0xFFF97DB5, position: {x:  1131.728, y:  1426.288}, character: 'OrderNexus'}//4294540725
	},
	RED: {
		0: {netId: 0xFFF02C0F, position: {x: 12760.906, y: 13026.066}, character: 'ChaosNexus'},//4293929999
	},
};

const ExtendWTraits = require('../../Core/ExtendWTraits');
const IDefendable = require('../Traits/IDefendable');


class Nexus extends ExtendWTraits(Unit, IDefendable) {
	/**
	 * It sends a packet to everyone says that this building has died
	 * @param source - The source of the damage.
	 */
	accounceDie(source){
		var Building_Die = global.Network.createPacket('Building_Die');
		Building_Die.netId = this.netId;
		Building_Die.attackerNetId = source.netId;
		this.sendTo_everyone(Building_Die);
	}
	async onDie(source){
		this.accounceDie(source);
	}

	/**
	 * 
	 * @param {Object} options
	 * @param {String} options.team
	 */
	constructor(...args){
		super(...args);

		this.initialized();
	}
	//onDie(source){
	//    //end game?
	//}
	spawn(){
		var OnEnterVisibilityClient = global.Network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = this.netId;
		OnEnterVisibilityClient.isTurret = true;
		this.sendTo_everyone(OnEnterVisibilityClient, loadingStages.NOT_CONNECTED);

		super.spawn();
	}
	

	/**
	 * 
	 * @param {Object} spawnList {TEAM: [{netId, position}]}
	 */
	static spawnAll(spawnList = Nexuses){
		for(let team in spawnList)
			for(let num in spawnList[team])
				new Nexus({
					team, num,
					netId: spawnList[team][num].netId,
					character: spawnList[team][num].character,
					spawnPosition: spawnList[team][num].position,
				});
	}

}


module.exports = Nexus;
