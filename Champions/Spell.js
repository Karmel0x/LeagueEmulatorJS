const { Vector2 } = require("three");

global.lastNetId_Spell = 0x50000000;

module.exports = class Spell {
	constructor(parent){
		this.parent = parent;
		this.netId = ++global.lastNetId_Spell;
	}
	CastInfo_Position(packet){//todo
		var CastInfo = {};
        CastInfo.TargetPosition = {
            x: packet.Position.x,
            y: packet.Position.y,
            z: 180,
        };
        CastInfo.TargetPositionEnd = {
            x: packet.EndPosition.x,
            y: packet.EndPosition.y,
            z: 180,
        };
        CastInfo.SpellCastLaunchPosition = {
            x: this.parent.parent.Waypoints[0].x,
            y: this.parent.parent.Waypoints[0].y,
            z: 180,
        };
		return CastInfo;
	}
};
