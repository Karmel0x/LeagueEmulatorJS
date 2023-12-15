import BasePacket from '../BasePacket.js';

const SBuffInGroupReplace = {
	ownerNetId: 'uint32',
	casterNetId: 'uint32',
	slot: 'uint8',
};

/**
 * @typedef {Object} TBuffInGroupReplace
 * @property {number} ownerNetId
 * @property {number} casterNetId
 * @property {number} slot
 */


export default class BuffReplaceGroup extends BasePacket {
	static struct = {
		runningTime: 'float',
		duration: 'float',
		entries: ['array', SBuffInGroupReplace],
	};

	data = {
		runningTime: 0,
		duration: 0,
		/** @type {TBuffInGroupReplace[]} */
		entries: [],
	};

}
