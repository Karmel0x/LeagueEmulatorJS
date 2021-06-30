var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

// something is different in BatchPacket
//var Vector2c = {
//    X_: 'uint8',
//    X: 'float',
//    Y_: 'uint8',
//    Y: 'float',
//};

module.exports = class extends BasePacket {//C2S.MOVE_REQ
    struct = {
        OrderType: 'uint8',
        Position: Vector2,
        TargetNetID: 'uint32',
        //MovementData: MovementDataNormal,
    }
    reader(buffer){
		super.reader(buffer);
        MovementDataNormal.reader(buffer, this);
    }
};
