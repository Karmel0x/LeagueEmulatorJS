const { Vector2 } = require("three");


module.exports = class _Spell {
	constructor(parent){
		this.parent = parent;
		this.netId = ++global.lastNetId;
		this.owner = this.parent.parent.parent;
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
        if(global.unitsNetId[TargetNetID])
            return new Vector2(global.unitsNetId[TargetNetID].position.x, global.unitsNetId[TargetNetID].position.y);

		return null;
    }
	// returns Vector2 of unit if exists
    static getRealPosition(packet){
        if(packet.TargetNetID)
            return _Spell.getUnitPosition(packet.TargetNetID) || new Vector2(packet.Position.x, packet.Position.y);

		return new Vector2(packet.Position.x, packet.Position.y);
    }
	range = 1000;
	preCast(packet){
        if(packet.TargetNetID && !global.unitsNetId[packet.TargetNetID])
            return;

		var realPosition = _Spell.getRealPosition(packet);
		
		if(this.owner.position.distanceTo(realPosition) >= (this.castRange || (this.range * 2))){
			this.owner.Movement.move1(realPosition);
			this.owner.callbacks.move.pending = {
				options: {
					range: this.castRange,
				},
				function: () => {
                    delete this.owner.callbacks.move.pending;
                    this.owner.Movement.Waypoints = [this.owner.Movement.Waypoints[0]];
					this.preCast(packet);
				}
			};
			return;
		}

		this.cast(packet);
	}
    cast(packet){
        // override

		// default
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;//?
		CastInfo.SpellHash = this.spellHash;
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
    }
};
