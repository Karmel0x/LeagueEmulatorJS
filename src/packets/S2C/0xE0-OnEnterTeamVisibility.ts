import BasePacket from '../BasePacket';

export default class OnEnterTeamVisibility extends BasePacket {
	static struct = {
		visibilityTeam: 'uint8',
	};
}
