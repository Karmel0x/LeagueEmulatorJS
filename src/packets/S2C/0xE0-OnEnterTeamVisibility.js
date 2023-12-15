import BasePacket from '../BasePacket.js';

export default class OnEnterTeamVisibility extends BasePacket {
	static struct = {
		visibilityTeam: 'uint8',
	};
}
