
//var Waypoints = {
//	X: ['int8', 'flagsBuffer[i]'],
//	X2: ['int16', '!flagsBuffer[i]'],
//	Y: ['int8', 'flagsBuffer[i]'],
//	Y2: ['int16', '!flagsBuffer[i]'],
//};
//var CompressedWaypoint = {
//	flagsBuffer: ['uint8', 'Waypoints.length|-1'],
//	Waypoints: [Waypoints, 'Waypoints.length'],
//};
//var MovementData = {
//	TeleportNetID: 'uint32',
//	TeleportID: ['uint8', 'TeleportID|!!'],
//	CompressedWaypoint: CompressedWaypoint,
//};
//
//module.export = {
//	bitfield1: 'uint8',
//	MovementData: [MovementData, 'MovementData.CompressedWaypoint.Waypoints.length|!!']
//};

var CompressedWaypoint = require('./CompressedWaypoint');
var TranslateCenteredCoordinates = require('../../Functions/TranslateCenteredCoordinates');

module.exports = {//MovementDataNormal
    reader: (buffer, object) => {
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
            //console.log(object, obj);
            obj.WaypointsCC = CompressedWaypoint.reader(buffer, obj.WaypointsSize);
            obj.Waypoints = TranslateCenteredCoordinates.from(obj.WaypointsCC);
        }

        object.MovementData = object.MovementData ?? {};
        Object.assign(object.MovementData, obj);
    },
    writer: (buffer, source) => {
        if(!source.WaypointsCC)
            source.WaypointsCC = TranslateCenteredCoordinates.to(source.Waypoints);

        source.bitfield = 0;
        source.bitfield |= source.WaypointsCC.length << 1;
        if(source.TeleportID)
            source.bitfield |= 1;
    
        buffer.write1('uint8', source.bitfield);
        if(source.WaypointsCC.length){
            buffer.write1('uint32', source.TeleportNetID);
            if(source.TeleportID)
                buffer.write1('uint8', source.TeleportID);
    
            CompressedWaypoint.writer(buffer, source.WaypointsCC);
        }
        //console.log('source, source.Waypoints, buffer', source, source.Waypoints, buffer);
    }
};
