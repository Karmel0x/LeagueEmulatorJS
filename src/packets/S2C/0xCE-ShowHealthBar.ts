import BasePacket from '../BasePacket';


export default class ShowHealthBar extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			showHealthBar: 1,
			changeHealthBarType: 2,
		}],
		healthBarType: 'uint8',
	};
	reader(buffer) {
		super.reader(buffer);

		if (this.bitfield.changeHealthBarType)
			this.observerTeamId = buffer.read('uint32');
	}
	writer(buffer) {
		super.writer(buffer);

		if (this.bitfield.changeHealthBarType)
			buffer.write('uint32', this.observerTeamId);
	}
}
