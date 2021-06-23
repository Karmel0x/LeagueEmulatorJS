var Vector2 = require('../SharedStruct/Vector2');
var MovementDataNormal = require('../ReadStruct/MovementDataNormal');


module.exports = function(buffer){//C2S.MOVE_REQ
    var obj = buffer.readobj({
        cmd: 'uint8',
        netId: 'uint32',

        OrderType: 'uint8',
        Position: Vector2,
        TargetNetID: 'uint32',
        //MovementData: MovementDataNormal,
    });
    MovementDataNormal(buffer, obj);
    return obj;
};
