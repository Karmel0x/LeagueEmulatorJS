const { Vector2 } = require("three");


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

	// return angle from pos1 to pos2
	static anglePosition(pos1, pos2){//todo
		var targetPosition = new Vector2(pos1.x, pos1.y);
		targetPosition.sub(pos2);
		targetPosition.normalize();
		//targetPosition.add(owner.position);
		return targetPosition;
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
		
		return CastInfo;
	}
    static getUnitPosition(TargetNetID){
        if(global.UnitsNetId[TargetNetID])
            return new Vector2(global.UnitsNetId[TargetNetID].position.x, global.UnitsNetId[TargetNetID].position.y);

		return null;
    }
	// returns Vector2 of unit if exists
    static getRealPosition(packet){
        if(packet.TargetNetID)
            return Spell.getUnitPosition(packet.TargetNetID) || new Vector2(packet.Position.x, packet.Position.y);

		return new Vector2(packet.Position.x, packet.Position.y);
    }
	range = 1000;
	preCast(packet){
        if(packet.TargetNetID && !global.UnitsNetId[packet.TargetNetID])
            return;

		var owner = this.parent.parent;
		var realPosition = Spell.getRealPosition(packet);

		if(owner.position.distanceTo(realPosition) >= (this.castRange || (this.range * 2))){
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
