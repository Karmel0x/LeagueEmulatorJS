
Buffer.prototype.read1 = function(type) {
    if(!this.off)
        this.off = 0;
    
    var variable;
    switch(type){
        case 'uint8':variable = this.readUInt8(this.off);break;
        case 'uint16':variable = this.readUInt16LE(this.off);break;
        case 'uint32':variable = this.readUInt32LE(this.off);break;
        case 'uint64':variable = this.readBigUInt64LE(this.off);break;

        case 'int8':variable = this.readInt8(this.off);break;
        case 'int16':variable = this.readInt16LE(this.off);break;
        case 'int32':variable = this.readInt32LE(this.off);break;
        case 'int64':variable = this.readBigInt64LE(this.off);break;

        case 'float':variable = this.readFloatLE(this.off);break;
        case 'double':variable = this.readDoubleLE(this.off);break;

        case 'char':variable = String.fromCharCode(this.readUInt8(this.off));break;
        case 'string':{
            variable = '';
            let stringLength = this.readInt32LE(this.off) - 1;
            this.off += 4;
            for(let i = 0; i < stringLength; i++){
                variable += String.fromCharCode(this.readUInt8(this.off));
                this.off += 1;
            }
            this.readUInt8(this.off);
            this.off += 1;
        }break;
    }

    this.off += Buffer.typeSize[type] || 0;
    return variable;
};
Buffer.prototype.write1 = function(type, value) {
    if(!this.off)
        this.off = 0;
    
    var variable;
    switch(type){
        case 'uint8':variable = this.writeUInt8(value, this.off);break;
        case 'uint16':variable = this.writeInt16LE(value, this.off);break;
        case 'uint32':variable = this.writeUInt32LE(value, this.off);break;
        case 'uint64':variable = this.writeBigUInt64LE(BigInt(value), this.off);break;

        case 'int8':variable = this.writeInt8(value, this.off);break;
        case 'int16':variable = this.writeInt16LE(value, this.off);break;
        case 'int32':variable = this.writeInt32LE(value, this.off);break;
        case 'int64':variable = this.writeBigInt64LE(BigInt(value), this.off);break;

        case 'float':variable = this.writeFloatLE(value, this.off);break;
        case 'double':variable = this.writeDoubleLE(value, this.off);break;

        case 'char':variable = this.writeUInt8(typeof value == 'string' ? value.charCodeAt(0) : value, this.off);break;
        case 'string':{
            let stringLength = value.length;
            variable = this.writeInt32LE(stringLength + 1, this.off);
            this.off += 4;
            for(let i = 0; i < stringLength; i++){
                variable = this.writeUInt8(value.charCodeAt(i), this.off);
                this.off += 1;
            }
            variable = this.writeUInt8(0x00, this.off);
            this.off += 1;
        }break;
    }

    this.off += Buffer.typeSize[type] || 0;
    return variable;
};
Buffer.prototype.readobj = function(template){
    try{
        if(typeof template == 'string')
            return this.read1(template);
        if(typeof template == 'object'){
            if(Array.isArray(template)){
                let obj = [];
                for(var j = 0; j < template[1]; j++){
                    obj[j] = this.readobj(template[0]);
                    //console.log(template[0], this.off);
                }
                return obj;
            }
            
            let obj = {};
            for(var i in template){
                obj[i] = this.readobj(template[i]);
                //console.log(template[i], this.off);
            }
            return obj;
        }
    }
    catch(e){
        console.log(e.stack);
    }
    return {};
};
Buffer.prototype.writeobj = function(template, source){
    try{
        //console.log('writeobj', template, source);

        if(typeof template == 'string')
            return this.write1(template, source || 0);
        if(typeof template == 'object'){
            if(Array.isArray(template)){
                for(var j = 0; j < template[1]; j++){
                    this.writeobj(template[0], source[j] || 0);
                    //console.log(template[0], this.off);
                }
                return;
            }
            
            for(var i in template){
                this.writeobj(template[i], source[i] || 0);
                //console.log(template[i], this.off);
            }
        }
    }
    catch(e){
        console.log(e.stack);
    }
};
Buffer.typeSize = {
    'uint8': 1,
    'uint16': 2,
    'uint32': 4,
    'uint64': 8,

    'int8': 1,
    'int16': 2,
    'int32': 4,
    'int64': 8,

    'float': 4,
    'double': 8,
    
    'char': 1,
    'string': 13,//todo
};
