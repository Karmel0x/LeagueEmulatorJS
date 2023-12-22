import ExtendedPacket from '../ExtendedPacket';


export default class DebugLogGoldSources extends ExtendedPacket {
	static struct = {
		message: 'string0',//512
	};
}
