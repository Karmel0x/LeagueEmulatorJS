
export class BasicTypes {
    static bool = /** @type {boolean} */ (/** @type {any} */ ('bool'));

    static uint8 = /** @type {number} */ (/** @type {any} */ ('uint8'));

    static uint16 = /** @type {number} */ (/** @type {any} */ ('uint16'));

    static uint32 = /** @type {number} */ (/** @type {any} */ ('uint32'));

    static uint64 = /** @type {number} */ (/** @type {any} */ ('uint64'));

    static int8 = /** @type {number} */ (/** @type {any} */ ('int8'));

    static int16 = /** @type {number} */ (/** @type {any} */ ('int16'));

    static int32 = /** @type {number} */ (/** @type {any} */ ('int32'));

    static int64 = /** @type {number} */ (/** @type {any} */ ('int64'));

    static float = /** @type {number} */ (/** @type {any} */ ('float'));

    static double = /** @type {number} */ (/** @type {any} */ ('double'));

    static char = /** @type {string} */ (/** @type {any} */ ('char'));

    static string = /** @type {string} */ (/** @type {any} */ ('string'));

    static string_ = /** @type {string} */ (/** @type {any} */ ('string_'));

    static string0 = /** @type {string} */ (/** @type {any} */ ('string0'));

    static null = /** @type {null} */ (/** @type {any} */ (''));
}

export class Types extends BasicTypes {
    /**
     * @template T
     * @param {T} obj
     * @returns 
     */
    static bitfield = (obj) => {
        return /** @type {T} */ (['bitfield', obj]);
    };

    /**
     * @param {number} num
     * @returns 
     */
    static bitnum = (num) => {
        return /** @type {boolean} */ (/** @type {any} */ (num));
    };

    /**
     * @template T
     * @param {T} type 
     * @param {number} [length]
     * @returns 
     */
    static array = (type, length = 0) => {
        return /** @type {T[]} */ ([type, length]);
    };
}


export default class PacketReaderWriter {

    /**
     * 
     * @param {ArrayBufferLike} buffer // | Buffer
     * @returns 
     */
    static from(buffer) {
        if (buffer instanceof Buffer)
            buffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

        const dv = new DataView(buffer);
        return new PacketReaderWriter(dv);
    }

    /**
     * 
     * @param {number} length 
     * @returns 
     */
    static fromSize(length) {
        let buffer = new ArrayBuffer(length);
        return this.from(buffer);
    }

    /**
     * @type {DataView}
     */
    dv;

    littleEndian = true;

    offset = 0;

    get length() {
        return this.dv.byteLength;
    }

    get buffer() {
        return this.dv.buffer;
    }

    /**
     * @type {{[key: string]: number}}
     */
    debugOffsets = {};

    /**
     * 
     * @param {DataView} dv 
     * @param {boolean} [littleEndian]
     */
    constructor(dv, littleEndian = true) {
        this.dv = dv;
        this.littleEndian = littleEndian;
    }

    /**
     * reads a type from {typeof Types} or {Object} tree of {typeof Types}
     * @template T
     * @param {T} type 
     * @returns 
     */
    read(type) {
        //console.log(type);
        const dv = this.dv;

        if (type === Types.bool)
            return /** @type {T} */ (!!dv.getUint8(this.offset++));

        if (type === Types.uint8)
            return /** @type {T} */ (dv.getUint8(this.offset++));

        if (type === Types.uint16)
            return /** @type {T} */ (dv.getUint16((this.offset += 2) - 2, this.littleEndian));

        if (type === Types.uint32)
            return /** @type {T} */ (dv.getUint32((this.offset += 4) - 4, this.littleEndian));

        if (type === Types.uint64)
            return /** @type {T} */ (dv.getBigUint64((this.offset += 8) - 8, this.littleEndian));

        if (type === Types.int8)
            return /** @type {T} */ (dv.getInt8(this.offset++));

        if (type === Types.int16)
            return /** @type {T} */ (dv.getInt16((this.offset += 2) - 2, this.littleEndian));

        if (type === Types.int32)
            return /** @type {T} */ (dv.getInt32((this.offset += 4) - 4, this.littleEndian));

        if (type === Types.int64)
            return /** @type {T} */ (dv.getBigInt64((this.offset += 8) - 8, this.littleEndian));

        if (type === Types.float)
            return /** @type {T} */ (dv.getFloat32((this.offset += 4) - 4, this.littleEndian));

        if (type === Types.double)
            return /** @type {T} */ (dv.getFloat64((this.offset += 8) - 8, this.littleEndian));

        if (type === Types.char)
            return /** @type {T} */ (String.fromCharCode(dv.getUint8(this.offset++)));

        if (type === Types.string) {
            let stringLength = dv.getInt32(this.offset, this.littleEndian);
            this.offset += 4;
            let str = '';
            for (let i = 0; i < stringLength; i++) {
                str += String.fromCharCode(dv.getUint8(this.offset++));
            }
            return /** @type {T} */ (str);
        }

        if (type === Types.string_) {
            let stringLength = dv.getInt32(this.offset, this.littleEndian);
            this.offset += 4;
            let str = '';
            for (let i = 0; i < stringLength; i++)
                str += String.fromCharCode(dv.getUint8(this.offset++));

            return /** @type {T} */ (str);
        }

        if (type === Types.string0) {
            let str = '';
            while (this.offset < dv.byteLength) {
                let s = dv.getUint8(this.offset++);
                if (s == 0x00)
                    break;

                str += String.fromCharCode(s);
            }
            return /** @type {T} */ (str);
        }

        if (type === Types.null)
            return /** @type {T} */ (null);

        if (Array.isArray(type)) {
            if (type[0] === 'bitfield') {
                let bitfield = dv.getUint8(this.offset++);

                let obj = /** @type {any} */ ({});

                for (let i in type[1])
                    obj[i] = (bitfield & type[1][i]) != 0;

                return /** @type {T} */ (obj);
            }

            if (type[0] === 'bitfield64') {
                let bitfield = dv.getBigUint64(this.offset, this.littleEndian);
                this.offset += 8;

                let obj = /** @type {any} */ ({});

                for (let i in type[1])
                    obj[i] = (bitfield & BigInt(type[1][i])) != 0n;

                return /** @type {T} */ (obj);
            }

            let array = /** @type {any[]} */ ([]);
            let arrayLength = type[1] ?? dv.getUint8(this.offset++);
            for (let i = 0; i < arrayLength; i++)
                array.push(this.read(type[0]));

            if (type[0] === 'char')
                return /** @type {T} */ (array.join(''));

            return /** @type {T} */ (array);
        }

        if (typeof type === 'object') {
            let obj = /** @type {T} */ ({});

            for (let key in type) {
                let typeType = type[key];

                this.debugOffsets[key] = this.offset;
                obj[key] = this.read(typeType);
            }

            return /** @type {T} */ (obj);
        }

        throw new Error('Unknown type: ' + type);
    }

    /**
     * reads a type from {keyof typeof Types}
     * //deprecated {this.read} is preferred to use
     * @template {keyof typeof BasicTypes} T
     * @param {T} type
     * @returns 
     */
    readStringified(type) {
        return /** @type {typeof Types[T]} */ (/** @type {any} */(this.read(type)));
        //return /** @type {typeof Types[T]} */ (this.read(Types[type]));
    }

    ///**
    // * reads a {Object} tree of {keyof typeof Types}
    // * @deprecated this will not give you proper return types
    // * @template {Object.<string, any>} U
    // * @param {U} type
    // * @returns 
    // */
    //readStringifiedObject(type) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64')
    //            return this.read(type);
    //
    //        let array = /** @type {any[]} */ ([]);
    //        let arrayLength = type[1] || this.read(Types.uint8);
    //        for (let i = 0; i < arrayLength; i++)
    //            array.push(this.readStringifiedObject(type[0]));
    //
    //        return /** @type {U} */ (/** @type {any} */ (array));
    //    }
    //
    //    if (type instanceof Object) {
    //        let obj = /** @type {U} */ ({});
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            obj[key] = /** @type {any} */ (this.readStringifiedObject(typeType));
    //        }
    //
    //        return /** @type {U} */ (obj);
    //    }
    //
    //    return /** @type {U} */ (this.readStringified(type));
    //}
    ///**
    // * reads a {Object} tree of {keyof typeof Types}
    // * @deprecated this will not give you proper return types
    // * @template {Object.<string, any>} U
    // * @param {U} type
    // * @returns 
    // */
    //readStringifiedObject(type) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64')
    //            return this.read(type);
    //
    //        let array = /** @type {any[]} */ ([]);
    //        let arrayLength = type[1] || this.read(Types.uint8);
    //        for (let i = 0; i < arrayLength; i++)
    //            array.push(this.readStringifiedObject(type[0]));
    //
    //        return /** @type {U} */ (/** @type {any} */ (array));
    //    }
    //
    //    if (type instanceof Object) {
    //        let obj = /** @type {U} */ ({});
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            obj[key] = /** @type {any} */ (this.readStringifiedObject(typeType));
    //        }
    //
    //        return /** @type {U} */ (obj);
    //    }
    //
    //    return /** @type {U} */ (this.readStringified(type));
    //}

    /**
     * @template T
     * @param {T} type 
     * @param {T} value
     */
    write(type, value) {
        //console.log(type, value);
        const dv = this.dv;

        if (type === Types.bool)
            return dv.setUint8(this.offset++, /** @type {number} */(/** @type {any} */ (!!value)));

        if (type === Types.uint8)
            return dv.setUint8(this.offset++, /** @type {number} */(value || 0));

        if (type === Types.uint16)
            return dv.setUint16((this.offset += 2) - 2, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.uint32)
            return dv.setUint32((this.offset += 4) - 4, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.uint64)
            return dv.setBigUint64((this.offset += 8) - 8, BigInt(/** @type {bigint | number} */(value || 0n)), this.littleEndian);

        if (type === Types.int8)
            return dv.setInt8(this.offset++, /** @type {number} */(value || 0));

        if (type === Types.int16)
            return dv.setInt16((this.offset += 2) - 2, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.int32)
            return dv.setInt32((this.offset += 4) - 4, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.int64)
            return dv.setBigInt64((this.offset += 8) - 8, BigInt(/** @type {bigint | number} */(value || 0n)), this.littleEndian);

        if (type === Types.float)
            return dv.setFloat32((this.offset += 4) - 4, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.double)
            return dv.setFloat64((this.offset += 8) - 8, /** @type {number} */(value || 0), this.littleEndian);

        if (type === Types.char) {
            let val = value || 0;
            if (typeof val === 'string') val = val.charCodeAt(0) || 0;
            return dv.setUint8(this.offset++, /** @type {number} */(val));
        }

        if (type === Types.string) {
            let val = /** @type {string} */ (value || '');
            let stringLength = val.length;
            dv.setInt32(this.offset, stringLength, this.littleEndian);
            this.offset += 4;

            for (let i = 0; i < stringLength; i++)
                dv.setUint8(this.offset++, val.charCodeAt(i) || 0);

            return;
        }

        if (type === Types.string_) {
            let val = /** @type {string} */ (value || '');
            let stringLength = val.length;
            dv.setInt32(this.offset, stringLength + 1, this.littleEndian);
            this.offset += 4;

            for (let i = 0; i < stringLength; i++)
                dv.setUint8(this.offset++, val.charCodeAt(i) || 0);

            dv.setUint8(this.offset++, 0);
            return;
        }

        if (type === Types.string0) {
            let val = /** @type {string} */ (value || '');
            let stringLength = val.length;

            for (let i = 0; i < stringLength; i++)
                dv.setUint8(this.offset++, val.charCodeAt(i) || 0);

            dv.setUint8(this.offset++, 0);
            return;
        }

        if (type === Types.null)
            return;

        if (Array.isArray(type)) {
            if (type[0] === 'bitfield') {
                let bitfield = 0;
                let val = /** @type {any} */ (value || {});

                for (let i in type[1]) {
                    if (val[i])
                        bitfield |= /** @type {number} */ (type[1][i]);
                }

                dv.setUint8(this.offset++, bitfield);
                return;
            }

            if (type[0] === 'bitfield64') {
                let bitfield = 0n;
                let val = /** @type {any} */ (value || {});

                for (let i in type[1]) {
                    if (val[i])
                        bitfield |= BigInt(type[1][i]);
                }

                dv.setBigUint64(this.offset, bitfield);
                this.offset += 8;
                return;
            }

            let val = /** @type {any[]} */ (value || []);
            let arrayLength = type[1];
            if (arrayLength === undefined) {
                arrayLength = val.length;
                dv.setUint8(this.offset++, arrayLength);
            }

            for (let i = 0; i < arrayLength; i++)
                this.write(type[0], val[i]);

            return;
        }

        if (typeof type === 'object') {
            let val = /** @type {any} */ (value || {});
            for (let key in type) {
                let typeType = type[key];

                this.debugOffsets[key] = this.offset;
                this.write(typeType, val[key]);
            }

            return;
        }

        throw new Error('Unknown type: ' + type);
    }

    /**
     * writes a type from {keyof typeof Types}
     * //deprecated {this.read} is preferred to use
     * @template {keyof typeof BasicTypes} T
     * @param {T} type
     * @param {typeof BasicTypes[T]} value
     */
    writeStringified(type, value) {
        this.write(type, /** @type {any} */(value));
        //this.write(Types[type], value);
    }

    ///**
    // * writes a {Object} tree of {keyof typeof Types}
    // * @deprecated {this.read} is preferred to use
    // * @template {Object.<string, any>} U
    // * @param {U} type
    // * @param {U} value
    // */
    //writeStringifiedObject(type, value) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64') {
    //            this.write(type, value);
    //            return;
    //        }
    //
    //        let arrayLength = /** @type {any} */ (value).length;
    //        type[1] || this.write(Types.uint8, arrayLength);
    //        for (let i = 0; i < arrayLength; i++)
    //            this.writeStringified(type[0], /** @type {any} */(value)[i]);
    //
    //        return;
    //    }
    //    if (type instanceof Object) {
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            this.writeStringifiedObject(typeType, /** @type {any} */(value)[key]);
    //        }
    //
    //        return;
    //    }
    //
    //    this.writeStringified(type, /** @type {never} */(value));
    //}

}

/*
function toArrayInteger() {
    if (this.length <= 0)
        return [];

    const data = new Array(this.length);
    for (let i = 0; i < this.length; ++i)
        data[i] = this[i];
    return data;
};

function packetSize(packet, source = false){

    if (typeof packet === 'string') {
        if (packet == 'string')
            return source.length + 5;
        return Buffer.typeSize[packet];
    }
    if (typeof packet === 'object') {
        if (Array.isArray(packet))
            return packet[1] ? packetSize(packet[0]) * packet[1] : 0;

        let packetSizeCount = 0;
        for (let i in packet) {
            packetSizeCount += packetSize(packet[i], source[i] || 0);
            //console.log(packet[i], packetSizeCount);
        }
        return packetSizeCount;
    }
    return 0;
}
const PacketsSizes = {};
for (let i in packets.cmd)
    if (typeof packets.cmd[i].packet != 'undefined')
        PacketsSizes[packets.cmd[i].id] = packetSize(packets.cmd[i].packet);
*/
