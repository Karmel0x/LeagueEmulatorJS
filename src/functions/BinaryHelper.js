
module.exports = {
	/**
	 * Convert number to array of bytes
	 * @param {number} num 
	 * @param {number} len 4=32bit, 8=64bit
	 * @returns 
	 */
	getIntBytes_r: (num, len = 4) => {
		/** @type {number[]} */
		let bytes = [];
		for (; len > 0; --len) {
			bytes.push(num & 255);
			num = num >> 8;
		}
		return bytes;
	},

	/**
	 * 
	 * @param {string} binaryArray 
	 * @returns 
	 */
	binaryToByteArray: (binaryArray) => {
		return parseInt(binaryArray.split('').reverse().join(''), 2);
	},

	/**
	 * 
	 * @param {number[]} array 
	 * @returns 
	 */
	byteArrayToBinary: (array) => {
		/** @type {boolean[]} */
		let ret = [];
		array.forEach(v => {
			let r = ('00000000' + (v || 0).toString(2)).substr(-8).split('').reverse();

			r.forEach(b => {
				ret.push(b == '1');
			});
		});
		return ret;
	},
};
