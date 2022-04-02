const _Yasuo = require("../_Yasuo");


module.exports = class YasuoW extends _Yasuo {
	async cast(packet){
		var owner = this.owner;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 2);
        owner.Movement.halt_start();


		
		owner.castingSpell = false;
        owner.Movement.halt_stop();
	}
};
