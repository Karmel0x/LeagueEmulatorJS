var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		count: 'uint16',
        //todo
	}
	writer(buffer){
		super.writer(buffer);
		
		if(!this.MaxHealth)
			return;
			
		buffer.writeobj({
			MaxHealth: 'float',
			Health: 'float',
		}, this);
	}
};
