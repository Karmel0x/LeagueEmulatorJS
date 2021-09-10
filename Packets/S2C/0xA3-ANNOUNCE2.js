var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.ANNOUNCE2
	static ids = {
        DEATH: 0x04,
        INHIBITOR_DESTROYED: 0x1F,
        INHIBITOR_ABOUT_TO_SPAWN: 0x20,
        INHIBITOR_SPAWNED: 0x21,
        TURRET_DESTROYED: 0x24,
        SUMMONER_DISCONNECTED: 0x47,
        SUMMONER_RECONNECTED: 0x48,
    };
	struct = {
		id: 'uint8',
		killerNetId: 'uint32',

		count: 'uint8',
		assistNetIds: ['uint32', 12],
	}
	writer(buffer){
		this.count = this.count || this.assistNetIds?.length || 0;
		super.writer(buffer);

	}
};
