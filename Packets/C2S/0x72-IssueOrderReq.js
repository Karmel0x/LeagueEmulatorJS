const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');
var CMovementDataNormal = require('../SharedStruct/CMovementDataNormal');

// something is different in BatchPacket
//var Vector2c = {
//    x_: 'uint8',
//    x: 'float',
//    y_: 'uint8',
//    y: 'float',
//};

/**
 * Request move
 */
module.exports = class IssueOrderReq extends BasePacket {
	static struct = {
		orderType: 'uint8',
		position: SVector3,
		targetNetId: 'uint32',
	}
	reader(buffer){
		super.reader(buffer);

		this.movementData = CMovementDataNormal.reader(buffer);
	}
	writer(buffer){
		super.writer(buffer);

		if(this.movementData)
			CMovementDataNormal.writer(buffer, this.movementData);
	}
};
