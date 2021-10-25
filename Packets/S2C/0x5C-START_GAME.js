var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.START_GAME
	struct = {
		bitfield_EnablePause: 'uint8',
	}
};
