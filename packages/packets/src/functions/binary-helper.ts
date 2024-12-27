
/**
 * Helper class for binary operations
 * Uses little-endian byte order
 */
export default class BinaryHelper {
	/**
	 * Convert a number to an array of bytes
	 * 4 = 32-bit, 8 = 64-bit
	 */
	static getBytes(num: number, len = 4) {
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = num & 0xFF; // get the least significant byte of num
			num = num >> 8; // shift num right by 8 bits
		}
		return bytes;
	}

	/**
	 * Convert a binary string to a number.
	 */
	static binaryStringToBinaryNumber(binaryArray: string) {
		return parseInt(binaryArray.split('').reverse().join(''), 2)
	}

	/**
	 * Convert a binary string to a number.
	 */
	static binaryStringToNumberByteArray(binaryArray: string, len = 4) {
		return this.getBytes(this.binaryStringToBinaryNumber(binaryArray), len);
	}

	/**
	 * Convert an array of numbers to an array of booleans representing binary values
	 */
	static byteArrayToBinary(array: Uint8Array | number[]) {
		const binaryArray: boolean[] = [];

		array.forEach(number => {
			for (let i = 0; i < 8; i++) {
				// shift the number i bits to the right and check the least significant bit
				binaryArray.push(((number >> i) & 1) === 1);
			}
		});

		return binaryArray;
	}
}
