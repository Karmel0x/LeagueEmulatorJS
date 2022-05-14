const SpellSlot = require("../../../../Constants/SpellSlot");
const _Turret = require("./_Turret");


module.exports = class SpellsTurret extends _Turret {
	static list = {
		TurretA: require('./TurretA'),
	};
	
    constructor(parent){
        super();
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

        this.spells = {
			[SpellSlot.A]: new SpellsTurret.list.TurretA(this),
        }
    }
	castSpell(packet){
        this.spells[packet.Slot]?.preCast(packet);
	}
};
