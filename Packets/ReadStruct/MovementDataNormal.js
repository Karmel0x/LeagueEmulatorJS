
var CompressedWaypoint = require('./CompressedWaypoint');

module.exports = function(buffer, object){//MovementDataNormal
    if(buffer.size - buffer.off < 9)
        return;

    var obj = {};
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
    object.MovementData = obj;
};
