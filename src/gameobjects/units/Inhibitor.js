
const loadingStages = require("../../constants/loadingStages");
const EVENT = require('../../packets/EVENT');
const Server = require('../../app/Server');

const Unit = require('./Unit');
const Defendable = require('../extensions/combat/Defendable');


class Inhibitor extends Unit {

	combat;

	/**
	 * 
	 * @param {import('../GameObjects').InhibitorOptions} options
	 */
	constructor(options) {
		super(options);
		this.options = options;

		this.combat = new Defendable(this);

		this.initialized();
	}

	/**
	 * It sends a packet to everyone that the inhibitor has died
	 * @param {import("../GameObjects").AttackableUnit} source - The source of the damage.
	 */
	announceDie(source) {
		const OnEvent = Server.network.createPacket('OnEvent');
		OnEvent.netId = this.netId;
		OnEvent.eventId = EVENT.OnDampenerDie;
		OnEvent.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(OnEvent);

		const Building_Die = Server.network.createPacket('Building_Die');
		Building_Die.netId = this.netId;
		Building_Die.attackerNetId = source.netId;
		this.packets.toEveryone(Building_Die);
	}

	/**
	 * @param {import("../GameObjects").AttackableUnit} source - The source of the damage.
	 */
	async onDie(source) {
		this.announceDie(source);
	}

	spawn() {
		const OnEnterVisibilityClient = Server.network.createPacket('OnEnterVisibilityClient');
		OnEnterVisibilityClient.netId = this.netId;
		OnEnterVisibilityClient.isTurret = true;
		this.packets.toEveryone(OnEnterVisibilityClient, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

}


module.exports = Inhibitor;
