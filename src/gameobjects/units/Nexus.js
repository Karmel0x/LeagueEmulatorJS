
const loadingStages = require("../../constants/loadingStages");
const Server = require('../../app/Server');

const Unit = require('./Unit');
const Defendable = require('../extensions/combat/Defendable');


class Nexus extends Unit {

	combat;

	/**
	 * 
	 * @param {import('../GameObjects').NexusOptions} options
	 */
	constructor(options) {
		super(options);
		this.options = options;

		this.combat = new Defendable(this);

		this.initialized();
	}

	/**
	 * It sends a packet to everyone says that this building has died
	 * @param {import("../GameObjects").AttackableUnit} source - The source of the damage.
	 */
	accounceDie(source) {
		const Building_Die = Server.network.createPacket('Building_Die');
		Building_Die.netId = this.netId;
		Building_Die.attackerNetId = source.netId;
		this.packets.toEveryone(Building_Die);
	}

	/**
	 * @param {import("../GameObjects").AttackableUnit} source - The source of the damage.
	 */
	async onDie(source) {
		this.accounceDie(source);
		//    //end game?
	}

	spawn() {
		const OnEnterVisibilityClient = Server.network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = this.netId;
		OnEnterVisibilityClient.isTurret = true;
		this.packets.toEveryone(OnEnterVisibilityClient, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

}


module.exports = Nexus;
