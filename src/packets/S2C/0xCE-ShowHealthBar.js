const BasePacket = require('../BasePacket');


module.exports = class ShowHealthBar extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			showHealthBar: 1,
			changeHealthBarType: 2,
		}],
		healthBarType: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		if(this.bitfield.changeHealthBarType)
			this.observerTeamId = buffer.read1('uint32');
	}
	writer(buffer){
		super.writer(buffer);

		if(this.bitfield.changeHealthBarType)
			buffer.writeobj('uint32', this.observerTeamId);
	}
};
