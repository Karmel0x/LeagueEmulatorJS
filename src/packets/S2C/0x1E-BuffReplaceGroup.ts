import BasePacket from '../BasePacket';

const SBuffInGroupReplace = {
	ownerNetId: 'uint32',
	casterNetId: 'uint32',
	slot: 'uint8',
};

export type TBuffInGroupReplace = {
	ownerNetId: number;
	casterNetId: number;
	slot: number;
};

export default class BuffReplaceGroup extends BasePacket {
	static struct = {
		runningTime: 'float',
		duration: 'float',
		entries: ['array', SBuffInGroupReplace],
	};

	data = {
		runningTime: 0,
		duration: 0,
		entries: [] as TBuffInGroupReplace[],
	};

}
