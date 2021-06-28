var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

module.exports = class extends BasePacket {//C2S.MOVE_REQ
    struct = {
        OrderType: 'uint8',
        Position: Vector2,
        TargetNetID: 'uint32',
        //MovementData: MovementDataNormal,
    }
    reader = function(buffer){
        MovementDataNormal.reader(buffer, this);
    }
};
