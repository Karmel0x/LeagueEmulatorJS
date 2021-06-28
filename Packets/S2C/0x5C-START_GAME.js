var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.START_GAME
	struct = {
		EnablePause_bitField: 'uint8',// != 1
	}
};
