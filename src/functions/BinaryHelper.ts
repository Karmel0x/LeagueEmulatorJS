
export default class BinaryHelper {
	/**
	 * Convert number to array of bytes
	 * [len] 4=32bit, 8=64bit
	 */
	static getIntBytes_r(num: number, len: number = 4) {
		let bytes: number[] = [];
		for (; len > 0; --len) {
			bytes.push(num & 255);
			num = num >> 8;
		}
		return bytes;
	}

	static binaryToByteArray(binaryArray: string) {
		return parseInt(binaryArray.split('').reverse().join(''), 2);
	}

	static byteArrayToBinary(array: number[]) {
		let ret: boolean[] = [];
		array.forEach(v => {
			let r = ('00000000' + (v || 0).toString(2)).substr(-8).split('').reverse();

			r.forEach(b => {
				ret.push(b == '1');
			});
		});
		return ret;
	}
}
