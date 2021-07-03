
function childByAddressPlusMath(element, address){
    var addressSplitted = address.split('.');
    if(addressSplitted.length > 1)
        return childByAddressPlusMath(element[addressSplitted.shift()] || 0, addressSplitted.join('.'));

	var addressMath = address.split('|');
	address = addressMath[0] || '';
	addressMath = addressMath[1] || '';
	if(typeof element[address] == 'undefined')
		return 0;

	if(addressMath.length){
		if(addressMath[0] == '+')
			element[address] += parseInt(addressMath[1]);
		else if(addressMath[0] == '-')
			element[address] -= parseInt(addressMath[1]);
		else if(addressMath[0] == '*')
			element[address] *= parseInt(addressMath[1]);
		else if(addressMath[0] == '/')
			element[address] /= parseInt(addressMath[1]);
		else if(addressMath[0] == '!'){
			element[address] = !element[address];
			if(addressMath[1] == '!')
				element[address] = !element[address];
		}
	}

    return element[address];
}

function fill_struct_length(struct, source){
    for(let i in struct)
        if(typeof struct[i] == 'object' && typeof struct[i][1] == 'string'){
            struct[i][1] = childByAddressPlusMath(source, struct[i][1]);
			if(isNaN(struct[i][1]))
				struct[i][1] = 0;
			if(typeof struct[i][0] == 'object')
				fill_struct_length(struct[i][0], source[i][0] || 0);
		}

}

module.exports = class {// BasePacket
	baseSize = 10240
	struct_header = {
		cmd: 'uint8',
		netId: 'uint32',
	}
	struct = {}
    constructor(){
        //Object.assign(this, JSON.parse(JSON.stringify(this.struct_header || {})), JSON.parse(JSON.stringify(this.struct || {})));
    }
	deleteN(){
		delete this.baseSize;
		delete this.struct_header;
		delete this.struct;
	}
	reader(buffer){
		Object.assign(this, buffer.readobj(this.struct_header));
		Object.assign(this, buffer.readobj(this.struct));

		this.deleteN();
	}
	writer(buffer){
		buffer.writeobj(this.struct_header, this);

		fill_struct_length(this.struct, this);
		buffer.writeobj(this.struct, this);

		this.deleteN();
	}
};
