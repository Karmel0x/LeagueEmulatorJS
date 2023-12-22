import BasePacket from '../BasePacket';


export default class World_SendGameNumber extends BasePacket {
	static struct = {
		gameId: 'int64',
		summonerName: ['char', 128],//128
		//summonerName: 'string0',//128
	};
}
