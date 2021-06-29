var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');

var MovementDataWithSpeed = {

};

module.exports = class extends BasePacket {//S2C.
	struct = {
		SyncID: 'int32',
		count: 'int16',
		MovementDataWithSpeed: [MovementDataWithSpeed, 'count'],
	}
};
