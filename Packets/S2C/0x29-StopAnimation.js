var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		flags: 'uint8',
        //this.Fade = (flags & 1) != 0;
        //this.IgnoreLock = (flags & 2) != 0;
        //this.StopAll = (flags & 4) != 0;
		AnimationName: ['char', 64],
	}
};
