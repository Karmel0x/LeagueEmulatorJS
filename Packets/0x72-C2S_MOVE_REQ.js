var Vector2 = require('./SharedStruct/Vector2');

function byteArrayToBinary(array){
    let ret = [];
    for(let i in array){
        let r = ('00000000' + array[i].toString(2)).substr(-8).split('').reverse();
        
        for(let j in r)
            ret.push(r[j] == '1');
    }
    return ret;
}
function CompressedWaypoint(buffer, size){
    var obj = {};
    obj.flagsBuffer = [];
    if(size > 1){
        obj.flagsBufferByte = buffer.readobj(['uint8', parseInt((size - 2) / 4 + 1)]);
        obj.flagsBuffer = byteArrayToBinary(obj.flagsBufferByte);
        console.log('obj.flagsBufferByte, obj.flagsBuffer', obj.flagsBufferByte, obj.flagsBuffer);
    }

    obj.lastX = buffer.read1('int16');
    obj.lastY = buffer.read1('int16');
    obj.waypoints = [];
    obj.waypoints.push({X: obj.lastX, Y: obj.lastY});

    for (let i = 1, flag = 0; i < size; i++){

        if(obj.flagsBuffer[flag++])
            obj.lastX += buffer.read1('int8');
        else
            obj.lastX = buffer.read1('int16');

        if(obj.flagsBuffer[flag++])
            obj.lastY += buffer.read1('int8');
        else
            obj.lastY = buffer.read1('int16');

        obj.waypoints.push({X: obj.lastX, Y: obj.lastY});
    }

    return obj.waypoints;
}
function MovementDataNormal(buffer){
    var obj = {};
    if(buffer.size - buffer.off < 9)
        return obj;

    obj.bitfield = buffer.read1('uint8');
    obj.WaypointsSize = obj.bitfield >> 1;
    obj.HasTeleportID = (obj.bitfield & 1) != 0;

    if(obj.WaypointsSize){
        obj.TeleportNetID = buffer.read1('uint32');
        if(obj.HasTeleportID){
            obj.TeleportID = buffer.read1('uint8');
        }
        obj.Waypoints = CompressedWaypoint(buffer, obj.WaypointsSize);
    }
    return obj;
}

module.exports = [
    {//C2S_MOVE_REQ
        cmd: 'uint8',
        netId: 'uint32',

        OrderType: 'uint8',
        Position: Vector2,
        TargetNetID: 'uint32',
        //MovementData: MovementDataNormal,
    },
    MovementDataNormal
];
