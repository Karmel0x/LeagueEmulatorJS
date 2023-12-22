import BasePacket from '../BasePacket';

const Tooltip = {
	ownerNetId: 'uint32',
	slotIndex: 'uint8',
	values: ['float', 16],
	hideFromEnemy: ['uint8', 16],
};

export default class ToolTipVars extends BasePacket {
	static struct = {
		tooltips_length: 'uint16',
	};
	reader(buffer) {
		super.reader(buffer);

		this.tooltips = buffer.read([Tooltip, this.tooltips_length]);
	}
	writer(buffer) {
		if (!this.tooltips || !this.tooltips.length || this.tooltips.length > 0xFFFF)
			return;

		this.tooltips_length = this.tooltips.length;

		super.writer(buffer);

		buffer.write([Tooltip, this.tooltips_length], this.tooltips);
	}
}
