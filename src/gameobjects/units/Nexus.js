
const Unit = require('./Unit');
const loadingStages = require("../../constants/loadingStages");

/** @type {Object<string, Object<number, import('../GameObjects').NexusOptions>>} */
const Nexuses = {
	BLUE: {
		0: { netId: 0xFFF97DB5, position: { x: 1131.728, y: 1426.288 }, info: { name: 'HQ_T1' }, character: 'OrderNexus' }//4294540725
	},
	RED: {
		0: { netId: 0xFFF02C0F, position: { x: 12760.906, y: 13026.066 }, info: { name: 'HQ_T2' }, character: 'ChaosNexus' },//4293929999
	},
};

const ExtendWTraits = require('../../core/ExtendWTraits');
const IDefendable = require('../traits/IDefendable');
const Server = require('../../app/Server');


class Nexus extends ExtendWTraits(Unit, IDefendable) {
	/**
	 * It sends a packet to everyone says that this building has died
	 * @param {Unit} source - The source of the damage.
	 */
	accounceDie(source) {
		var Building_Die = Server.network.createPacket('Building_Die');
		Building_Die.netId = this.netId;
		Building_Die.attackerNetId = source.netId;
		this.sendTo_everyone(Building_Die);
	}

	async onDie(source) {
		this.accounceDie(source);
	}

	/**
	 * 
	 * @param {import('../GameObjects').NexusOptions} options
	 */
	constructor(options) {
		super(options);

		this.initialized();
	}

	//onDie(source) {
	//    //end game?
	//}

	spawn() {
		var OnEnterVisibilityClient = Server.network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = this.netId;
		OnEnterVisibilityClient.isTurret = true;
		this.sendTo_everyone(OnEnterVisibilityClient, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

	/**
	 * 
	 * @param {Object<string, Object<string, import('../GameObjects').NexusOptions>>} spawnList {TEAM: [{netId, position}]}
	 */
	static spawnAll(spawnList = Nexuses) {
		for (let team in spawnList)
			for (let num in spawnList[team])
				new Nexus({
					team, num,
					netId: spawnList[team][num].netId,
					character: spawnList[team][num].character,
					spawnPosition: spawnList[team][num].position,
				});
	}

}


module.exports = Nexus;
