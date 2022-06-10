const BasePacket = require('../BasePacket');


module.exports = class SetFadeOut_Push extends BasePacket {
	static struct = {
		fadeId: 'int16',
		fadeTime: 'float',
		fadeTargetValue: 'float',
	}
};
