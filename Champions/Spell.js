const { Vector2 } = require("three");
const { createPacket } = require("../PacketUtilities");


module.exports = class Spell {
	constructor(parent){
		this.parent = parent;
		this.netId = ++global.lastNetId;
	}
	buffActivate(){
        // override
	}
	buffDeactivate(){
        // override
	}
	CastInfo_Position(packet){//todo
		var CastInfo = {};
        CastInfo.TargetPosition = {
            x: packet.Position.x,
            y: packet.Position.y,
            z: 0,
        };
        CastInfo.TargetPositionEnd = {
            x: packet.EndPosition.x,
            y: packet.EndPosition.y,
            z: 0,
        };
        CastInfo.SpellCastLaunchPosition = {
            x: this.parent.parent.Waypoints[0].x,
            y: this.parent.parent.Waypoints[0].y,
            z: 0,
        };
		return CastInfo;
	}
};
