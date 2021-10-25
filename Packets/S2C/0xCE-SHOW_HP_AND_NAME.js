var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			ShowHealthBar: 1,
			ChangeHealthBarType: 2,
		}],
		HealthBarType: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		if(this.bitfield.ChangeHealthBarType)
			this.ObserverTeamID = buffer.read1('uint32');
	}
	writer(buffer){
		super.writer(buffer);

		if(this.bitfield.ChangeHealthBarType)
			buffer.writeobj('uint32', this.ObserverTeamID);
	}
};
