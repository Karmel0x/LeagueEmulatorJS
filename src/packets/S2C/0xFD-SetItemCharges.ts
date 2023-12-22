import BasePacket from '../BasePacket';


export default class SetItemCharges extends BasePacket {
	static struct = {
		slot: 'uint8',
		spellCharges: 'uint8',
	};
}
