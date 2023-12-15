import BasePacket from '../BasePacket.js';


export default class SetItemCharges extends BasePacket {
	static struct = {
		slot: 'uint8',
		spellCharges: 'uint8',
	};
}
