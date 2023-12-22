import BasePacket from '../BasePacket';

export default class MuteVolumeCategory extends BasePacket {
	static struct = {
		volumeCategoryType: 'uint8',
		bitfield: ['bitfield', {
			mute: 1,
		}],
	};
}
