const _Character_ = require("./_Character_");


module.exports = class _Champion_ extends _Character_ {

	castSpell(packet){
		this.spells[packet.Slot].preCast(packet);
	}
};
