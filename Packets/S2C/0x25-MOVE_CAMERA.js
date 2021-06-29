var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.StartFromCurrentPosition = (bitfield & 0x01) != 0;
        //this.UnlockCamera = (bitfield & 0x02) != 0; 
		StartPosition: Vector3,
		TargetPosition: Vector3,
		TravelTime: 'float',
	}
};
