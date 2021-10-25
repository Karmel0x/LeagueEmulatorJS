var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

// something is different in BatchPacket
//var Vector2c = {
//    x_: 'uint8',
//    x: 'float',
//    y_: 'uint8',
//    y: 'float',
//};

module.exports = class extends BasePacket {//C2S.MOVE_REQ
	struct = {
		OrderType: 'uint8',
		Position: Vector2,
		TargetNetID: 'uint32',
	}
	reader(buffer){
		super.reader(buffer);

		this.MovementData = MovementDataNormal.reader(buffer);
	}
	writer(buffer){
		super.writer(buffer);

		MovementDataNormal.writer(buffer, this.MovementData);
	}
};
