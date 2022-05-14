const { Vector2 } = require("three");
const { createPacket } = require("../../../Core/PacketUtilities");

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

module.exports = class _Spellchain {
	netId;
	spellsChained = [];
	collection = {};
	
	//spellHash = 0; // @abstract

	constructor(parent){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

		this.netId = ++global.lastNetId;
	}
	/**
	 * Called on buff activation
	 * @abstract
	 */
	buffActivate(){
        // override
	}
	/**
	 * Called on buff deactivation
	 * @abstract
	 */
	buffDeactivate(){
        // override
	}

	lastSpellChained(){
		return this.spellsChained[this.spellsChained.length - 1] || {};
	}
	chainCastInfo(){
		return Object.assign({}, ...this.spellsChained.map(spell => spell.CastInfo));
	}
	/**
	 * Get the angle as normalized Vector2 from position to targetPosition
	 * @param {Vector2} position
	 * @param {Vector2} targetPosition
	 * @return {Vector2}
	*/
	static anglePosition(position, targetPosition){//todo
		var angleV2 = new Vector2(position.x, position.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();
		//angleV2.add(owner.position);
		return angleV2;
	}
	/**
	 * @deprecated
	 * @param {*} packet
	 * @returns {Object} CastInfo
	 */
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
	/**
	 * Get unit position by netId
	 * @param {Number} netId
	 * @returns {?Vector2}
	 */
    static getUnitPosition(netId){
        if(global.unitsNetId[netId])
            return new Vector2(global.unitsNetId[netId].position.x, global.unitsNetId[netId].position.y);

		return null;
    }
	/**
	 * @deprecated
	 * @param {*} packet
	 * @returns Vector2 of unit if exists
	 */
    static getRealPosition(packet){
        if(packet.TargetNetId)
            return _Spellchain.getUnitPosition(packet.TargetNetId) || new Vector2(packet.Position.x, packet.Position.y);

		return new Vector2(packet.Position.x, packet.Position.y);
    }
	range = 1000;
	preCast(packet){
        if(packet.TargetNetId && !global.unitsNetId[packet.TargetNetId])
            return;

		var realPosition = _Spellchain.getRealPosition(packet);
		
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
	castSpellAns(CastInfo, PackageHash){
		var owner = this.owner;

		var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
		CAST_SPELL_ANS.netId = owner.netId;
		CAST_SPELL_ANS.CasterPositionSyncID = owner.Movement.PositionSyncID;
		CAST_SPELL_ANS.CastInfo = {
			SpellHash: 0,
			SpellNetId: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetId: owner.netId,
			SpellChainOwnerNetId: owner.netId,
			PackageHash: PackageHash,
			MissileNetId: 1073743440,
			TargetPosition: {},
			TargetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			ManaCost: 28,
			SpellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(CAST_SPELL_ANS.CastInfo, CastInfo);

		owner.packetController.sendTo_vision(CAST_SPELL_ANS);
		console.log(CAST_SPELL_ANS);
	}
	spawnProjectileAns(CastInfo, PackageHash = 0, projectile = {speed: 1200}){//todo
		var owner = this.owner;

		var SPAWN_PROJECTILE = createPacket('SPAWN_PROJECTILE', 'S2C');
		SPAWN_PROJECTILE.CastInfo = {
			SpellHash: 0,
			SpellNetId: 1073743439,
			SpellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetId: owner.netId,
			SpellChainOwnerNetId: owner.netId,
			PackageHash: PackageHash,
			MissileNetId: 1073743440,
			TargetPosition: {},
			TargetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			ManaCost: 28,
			SpellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(SPAWN_PROJECTILE.CastInfo, CastInfo);
		SPAWN_PROJECTILE.netId = SPAWN_PROJECTILE.CastInfo._netId ?? SPAWN_PROJECTILE.CastInfo.MissileNetId;// ??
		SPAWN_PROJECTILE.Position = SPAWN_PROJECTILE.Position || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.CasterPosition = SPAWN_PROJECTILE.CasterPosition || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		//SPAWN_PROJECTILE.Direction = {
		//    "x": 0.36772018671035767,
		//    "z": 0,
		//    "y": 0.9299365282058716
		//}
		//SPAWN_PROJECTILE.Velocity = {
		//    "x": 441.2642517089844,
		//    "z": -109.0909194946289,
		//    "y": 1115.9239501953125
		//};
		SPAWN_PROJECTILE.StartPoint = SPAWN_PROJECTILE.StartPoint || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.EndPoint = SPAWN_PROJECTILE.EndPoint || SPAWN_PROJECTILE.CastInfo.TargetPosition;
		SPAWN_PROJECTILE.UnitPosition = SPAWN_PROJECTILE.UnitPosition || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.Speed = projectile.speed;

		owner.packetController.sendTo_vision(SPAWN_PROJECTILE);
		console.log(SPAWN_PROJECTILE);
	}

	///**
	// * @abstract
	// * @param {*} packet 
	// */
    //cast(packet){
	//	var CastInfo = this.CastInfo_Position(packet);
//
	//	CastInfo.SpellNetId = this.netId;
	//	CastInfo.MissileNetId = 1073743444;//?
	//	CastInfo.SpellHash = this.spellHash;
	//	this.castSpellAns(CastInfo);
//
	//	this.parent.parent.SET_COOLDOWN(packet.Slot);
    //}

	
	makeCollection(packet){
		//this.collection.Target = global.unitsNetId[packet.TargetNetId] || false;
		//if(!this.collection.Target)
		//	return false;
		
		this.collection.packet = packet;

		this.collection.Positions = {};
		this.collection.Positions.angle = _Spellchain.anglePosition(packet.Position, this.owner.position);
		this.collection.Positions.real = _Spellchain.getRealPosition(packet);
		return true;
	}
	/**
	 * @abstract
	 * @param {*} packet 
	 */
	async castSpellchain(packet){

	}
	async cast(packet){
		if(!this.makeCollection(packet))
			return;

		if(this.owner.castingSpell)
			return;

		this.castSpellchain(packet);
	}
	spellStart(){
		
		this.owner.castingSpell = true;
		this.owner.Movement?.halt_start?.();
	}
	spellEnd(){
		
		this.owner.castingSpell = false;
		this.owner.Movement?.halt_stop?.();
	}
};
