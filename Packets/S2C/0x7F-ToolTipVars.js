const BasePacket = require('../BasePacket');

var Tooltip = {
    ownerNetId: 'uint32',
    SlotIndex: 'uint8',
    Values: ['float', 16],
    HideFromEnemy: ['uint8', 16],
};

module.exports = class ToolTipVars extends BasePacket {
	static struct = {
		tooltips_length: 'uint16',
	}
	reader(buffer){
		super.reader(buffer);

		this.tooltips = buffer.readobj([Tooltip, this.tooltips_length]);
	}
	writer(buffer){
		//if(!this.tooltips || !this.tooltips.length || this.tooltips.length > 0xFFFF)
		//	return;

		this.tooltips_length = this.tooltips.length;

		super.writer(buffer);
		
		buffer.writeobj([Tooltip, this.tooltips_length], this.tooltips);
	}
};
