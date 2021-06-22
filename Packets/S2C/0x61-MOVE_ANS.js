//var MovementDataNormal = require('../SharedStruct/MovementDataNormal');
//var Types = require('../../Constants/Types');
var CompressedWaypoint = require('../SharedStruct/CompressedWaypoint');

function MovementDataNormalSingle(buffer, source){
    source.bitfield = 0;
    source.bitfield |= source.Waypoints.length << 1;
    if(source.TeleportID)
        source.bitfield |= 1;

    buffer.write1('uint8', source.bitfield);
    if(source.Waypoints.length){
        buffer.write1('uint32', source.TeleportNetID);
        if(source.TeleportID)
            buffer.write1('uint8', source.TeleportID);

        CompressedWaypoint(buffer, source.Waypoints);
    }
    
    //console.log('source, source.Waypoints, buffer', source, source.Waypoints, buffer);
}
function MovementDataNormal(buffer, source){
    for(let i = 0; i < source.MovementDataNormal_length; i++)
        if(source.Waypoints)
            MovementDataNormalSingle(buffer, source);
}

module.exports = function(buffer, source){//S2C.MOVE_ANS
    source.MovementDataNormal_length = 1;
    buffer.writeobj({
        cmd: 'uint8',
        netId: 'uint32',
    
        SyncID: 'int32',
        MovementDataNormal_length: 'int16',
    }, source);
    
    MovementDataNormal(buffer, source);
};
