
module.exports = {
	/**
	 * Convert number to array of bytes
	 * @param {Number} x 
	 * @param {Number} len 4=32bit, 8=64bit
	 * @returns {Array.<Number>}
	 */
	getIntBytes_r: (x, len = 4) => {
		var bytes = [];
		for(; len > 0; --len){
			bytes.push(x & 255);
			x = x >> 8;
		}
		return bytes;
	},
	binaryToByteArray: (binaryArray) => {
		return parseInt(binaryArray.split('').reverse().join(''), 2);
	},
	byteArrayToBinary: (array) => {
		let ret = [];
		for(let i in array){
			if(typeof array[i] == 'undefined'){
				console.log("[weird] typeof array[i] == 'undefined'");
				console.trace();
				throw true;
			}
			let r = ('00000000' + (array[i] || 0).toString(2)).substr(-8).split('').reverse();
			
			for(let j in r)
				ret.push(r[j] == '1');
		}
		return ret;
	},
};
