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
    getRealPosition(packet){
        if(packet.TargetNetID)
            return new Vector2(global.UnitsNetId[packet.TargetNetID].position.x, global.UnitsNetId[packet.TargetNetID].position.y);

		return new Vector2(packet.Position.x, packet.Position.y);
    }
    castRange = 1000;
	preCast(packet){
        if(packet.TargetNetID && !global.UnitsNetId[packet.TargetNetID])
            return;

		var owner = this.parent.parent;
		var realPosition = this.getRealPosition(packet);

		if(owner.position.distanceTo(realPosition) >= this.castRange){
			owner.move1(realPosition);
			owner.callbacks.move.pending = {
				options: {
					range: this.castRange,
				},
				function: () => {
                    delete owner.callbacks.move.pending;
                    owner.Waypoints = [owner.Waypoints[0]];
					this.preCast(packet);
				}
			};
			return;
		}

		this.cast(packet);
	}
    cast(packet){
        // override
    }
};
