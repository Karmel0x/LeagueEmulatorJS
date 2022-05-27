var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const loadingStages = require("../../Constants/loadingStages");
const EVENT = require('../../Packets/EVENT');


const Inhibitors = {
	BLUE: {
		0: {netId: 0xFFD23C3E, position: {x:  823.7, y: 3361.6}, character: 'ChaosNexus'},//4291968062
		1: {netId: 0xFF4A20F1, position: {x: 2785.5, y: 2958.2}, character: 'ChaosNexus'},//4283048177
		2: {netId: 0xFF9303E1, position: {x: 3036.3, y: 1017.6}, character: 'ChaosNexus'},//4287824865
	},
	RED: {
		0: {netId: 0xFF6793D0, position: {x: 10958.791, y: 13434.588}, character: 'ChaosNexus'},//4284978128
		1: {netId: 0xFFFF8F1F, position: {x: 11238.580, y: 11470.119}, character: 'ChaosNexus'},//4294938399
		2: {netId: 0xFF26AC0F, position: {x: 13208.756, y: 11174.174}, character: 'ChaosNexus'},//4280724495
	},
};

const BaseInterface = require('../../Core/BaseInterface');
const IDefendable = require('../Interfaces/IDefendable');


class Inhibitor extends BaseInterface(Unit, IDefendable) {
	/**
	 * It sends a packet to everyone that the inhibitor has died
	 * @param source - The source of the damage.
	 */
	announceDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.netId;
		ANNOUNCE2.id = EVENT.OnDampenerDie;
		ANNOUNCE2.EventData = {
			OtherNetId: source.netId
		};
		this.sendTo_everyone(ANNOUNCE2);

		var Building_Die = createPacket('Building_Die');
		Building_Die.netId = this.netId;
		Building_Die.AttackerNetId = source.netId;
		this.sendTo_everyone(Building_Die);
	}
	async onDie(source){
		this.announceDie(source);
	}


	/**
	 * 
	 * @param {Object} options
	 * @param {String} options.team
	 * @param {Number} options.num
	 */
	constructor(...args){
		super(...args);

		this.initialized();
	}
	spawn(){
		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.netId = this.netId;
		OBJECT_SPAWN.isTurret = true;
		this.sendTo_everyone(OBJECT_SPAWN, loadingStages.NOT_CONNECTED);

		super.spawn();
	}
	
	/**
	 * 
	 * @param {Object} spawnList {TEAM: [{netId, position}]}
	 */
	static spawnAll(spawnList = Inhibitors){
		for(let team in spawnList)
			for(let num in spawnList[team])
				new Inhibitor({
					team, num,
					netId: spawnList[team][num].netId,
					character: spawnList[team][num].character,
					spawnPosition: spawnList[team][num].position
				});
	}

}


module.exports = Inhibitor;
