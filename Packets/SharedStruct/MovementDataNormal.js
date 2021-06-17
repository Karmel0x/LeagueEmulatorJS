////for delete
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
