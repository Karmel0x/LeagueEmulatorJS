module.exports = class {//BasePacket
	struct_header = {
		cmd: 'uint8',
		netId: 'uint32',
	}
    constructor(){
        Object.assign(this, JSON.parse(JSON.stringify(this.struct_header || {})), JSON.parse(JSON.stringify(this.struct || {})));
    }
};
