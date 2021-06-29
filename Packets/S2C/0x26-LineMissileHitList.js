var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
	}
    reader = function(buffer){
        let Targets_length = buffer.read1('int16');
        this.Targets = buffer.readobj(['uint32', Targets_length]);
    }
    writer = function(buffer){
        buffer.write1('int16', this.Targets.length);
        buffer.writeobj(['uint32', this.Targets.length], this.Targets);
    }
};
