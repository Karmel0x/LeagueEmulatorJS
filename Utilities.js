
module.exports = {
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
			if(typeof array[i] === 'undefined'){
				console.log("[weird] typeof array[i] === 'undefined'");
				console.trace();
				throw true;
			}
			let r = ('00000000' + (array[i] || 0).toString(2)).substr(-8).split('').reverse();
			
			for(let j in r)
				ret.push(r[j] == '1');
		}
		return ret;
	},
	childByAddress: (element, address) => {
		if(typeof element !== 'object')
			return element;

		var addressSplitted = address.split('.');
		if(addressSplitted.length > 1)
			return childByAddressPlusMath(element[addressSplitted.shift()] || null, addressSplitted.join('.'));

		return element[address] || null;
	}
};
