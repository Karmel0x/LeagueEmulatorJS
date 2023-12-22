
export class BasicTypes {
    static bool = 'bool' as unknown as boolean;
    static uint8 = 'uint8' as unknown as number;
    static uint16 = 'uint16' as unknown as number;
    static uint32 = 'uint32' as unknown as number;
    static uint64 = 'uint64' as unknown as number;
    static int8 = 'int8' as unknown as number;
    static int16 = 'int16' as unknown as number;
    static int32 = 'int32' as unknown as number;
    static int64 = 'int64' as unknown as number;
    static float = 'float' as unknown as number;
    static double = 'double' as unknown as number;
    static char = 'char' as unknown as string;
    static string = 'string' as unknown as string;
    static string_ = 'string_' as unknown as string;
    static string0 = 'string0' as unknown as string;
    static null = '' as unknown as null;
}

export class Types extends BasicTypes {

    static bitfield<T>(obj: T) {
        return ['bitfield', obj] as T;
    };

    static bitnum(num: number) {
        return num as unknown as boolean;
    };

    static array<T>(type: T, length = 0) {
        return [type, length] as T[];
    };
}


export default class PacketReaderWriter {

    static from(buffer: ArrayBufferLike | Buffer) {
        if (buffer instanceof Buffer)
            buffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

        const dv = new DataView(buffer);
        return new PacketReaderWriter(dv);
    }

    static fromSize(length: number) {
        let buffer = new ArrayBuffer(length);
        return this.from(buffer);
    }

    dv: DataView;
    littleEndian = true;
    offset = 0;

    get length() {
        return this.dv.byteLength;
    }

    get buffer() {
        return this.dv.buffer;
    }

    debugOffsets: { [key: string]: number; } = {};

    constructor(dv: DataView, littleEndian: boolean = true) {
        this.dv = dv;
        this.littleEndian = littleEndian;
    }

    /**
     * reads a type from {typeof Types} or {Object} tree of {typeof Types}
     */
    read<T>(type: T) {
        //console.log(type);
        const dv = this.dv;

        if (type === Types.bool)
            return !!dv.getUint8(this.offset++) as T;

        if (type === Types.uint8)
            return dv.getUint8(this.offset++) as T;

        if (type === Types.uint16)
            return dv.getUint16((this.offset += 2) - 2, this.littleEndian) as T;

        if (type === Types.uint32)
            return dv.getUint32((this.offset += 4) - 4, this.littleEndian) as T;

        if (type === Types.uint64)
            return dv.getBigUint64((this.offset += 8) - 8, this.littleEndian) as T;

        if (type === Types.int8)
            return dv.getInt8(this.offset++) as T;

        if (type === Types.int16)
            return dv.getInt16((this.offset += 2) - 2, this.littleEndian) as T;

        if (type === Types.int32)
            return dv.getInt32((this.offset += 4) - 4, this.littleEndian) as T;

        if (type === Types.int64)
            return dv.getBigInt64((this.offset += 8) - 8, this.littleEndian) as T;

        if (type === Types.float)
            return dv.getFloat32((this.offset += 4) - 4, this.littleEndian) as T;

        if (type === Types.double)
            return dv.getFloat64((this.offset += 8) - 8, this.littleEndian) as T;

        if (type === Types.char)
            return String.fromCharCode(dv.getUint8(this.offset++)) as T;

        if (type === Types.string) {
            let stringLength = dv.getInt32(this.offset, this.littleEndian);
            this.offset += 4;
            let str = '';
            for (let i = 0; i < stringLength; i++) {
                str += String.fromCharCode(dv.getUint8(this.offset++));
            }
            return str as T;
        }

        if (type === Types.string_) {
            let stringLength = dv.getInt32(this.offset, this.littleEndian);
            this.offset += 4;
            let str = '';
            for (let i = 0; i < stringLength; i++)
                str += String.fromCharCode(dv.getUint8(this.offset++));

            return str as T;
        }

        if (type === Types.string0) {
            let str = '';
            while (this.offset < dv.byteLength) {
                let s = dv.getUint8(this.offset++);
                if (s == 0x00)
                    break;

                str += String.fromCharCode(s);
            }
            return str as T;
        }

        if (type === Types.null)
            return null as T;

        if (Array.isArray(type)) {
            if (type[0] === 'bitfield') {
                let bitfield = dv.getUint8(this.offset++);

                let obj = {} as any;

                for (let i in type[1])
                    obj[i] = (bitfield & type[1][i]) != 0;

                return obj as T;
            }

            if (type[0] === 'bitfield64') {
                let bitfield = dv.getBigUint64(this.offset, this.littleEndian);
                this.offset += 8;

                let obj = {} as any;

                for (let i in type[1])
                    obj[i] = (bitfield & BigInt(type[1][i])) != 0n;

                return obj as T;
            }

            let array = [] as any[];
            let arrayLength = type[1] ?? dv.getUint8(this.offset++);
            for (let i = 0; i < arrayLength; i++)
                array.push(this.read(type[0]));

            if (type[0] === 'char')
                return array.join('') as T;

            return array as T;
        }

        if (typeof type === 'object') {
            let obj = {} as T;

            for (let key in type) {
                let typeType = type[key];

                this.debugOffsets[key] = this.offset;
                obj[key] = this.read(typeType);
            }

            return obj as T;
        }

        throw new Error('Unknown type: ' + type);
    }

    /**
     * reads a type from {keyof typeof Types}
     * //deprecated {this.read} is preferred to use
     */
    readStringified<T extends keyof typeof BasicTypes>(type: T) {
        return this.read(type) as unknown as typeof Types[T];
        //return this.read(Types[type]) as typeof Types[T];
    }

    ///**
    // * reads a {Object} tree of {keyof typeof Types}
    // * @//deprecated this will not give you proper return types
    // * @//template {Object.<string, any>} U
    // * @//param {U} type
    // * @//returns 
    // */
    //readStringifiedObject(type) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64')
    //            return this.read(type);
    //
    //        let array = /** @//type {any[]} */ ([]);
    //        let arrayLength = type[1] || this.read(Types.uint8);
    //        for (let i = 0; i < arrayLength; i++)
    //            array.push(this.readStringifiedObject(type[0]));
    //
    //        return /** @//type {U} */ (/** @//type {any} */ (array));
    //    }
    //
    //    if (type instanceof Object) {
    //        let obj = /** @//type {U} */ ({});
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            obj[key] = /** @//type {any} */ (this.readStringifiedObject(typeType));
    //        }
    //
    //        return /** @//type {U} */ (obj);
    //    }
    //
    //    return /** @//type {U} */ (this.readStringified(type));
    //}
    ///**
    // * reads a {Object} tree of {keyof typeof Types}
    // * @//deprecated this will not give you proper return types
    // * @//template {Object.<string, any>} U
    // * @//param {U} type
    // * @//returns 
    // */
    //readStringifiedObject(type) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64')
    //            return this.read(type);
    //
    //        let array = /** @//type {any[]} */ ([]);
    //        let arrayLength = type[1] || this.read(Types.uint8);
    //        for (let i = 0; i < arrayLength; i++)
    //            array.push(this.readStringifiedObject(type[0]));
    //
    //        return /** @//type {U} */ (/** @//type {any} */ (array));
    //    }
    //
    //    if (type instanceof Object) {
    //        let obj = /** @//type {U} */ ({});
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            obj[key] = /** @//type {any} */ (this.readStringifiedObject(typeType));
    //        }
    //
    //        return /** @//type {U} */ (obj);
    //    }
    //
    //    return /** @//type {U} */ (this.readStringified(type));
    //}

    write<T>(type: T, value: T) {
        //console.log(type, value);
        const dv = this.dv;

        if (type === Types.bool)
            return dv.setUint8(this.offset++, !!value as unknown as number);

        if (type === Types.uint8)
            return dv.setUint8(this.offset++, (value || 0) as number);

        if (type === Types.uint16)
            return dv.setUint16((this.offset += 2) - 2, (value || 0) as number, this.littleEndian);

        if (type === Types.uint32)
            return dv.setUint32((this.offset += 4) - 4, (value || 0) as number, this.littleEndian);

        if (type === Types.uint64)
            return dv.setBigUint64((this.offset += 8) - 8, BigInt(value as number || 0n), this.littleEndian);

        if (type === Types.int8)
            return dv.setInt8(this.offset++, (value || 0) as number);

        if (type === Types.int16)
            return dv.setInt16((this.offset += 2) - 2, (value || 0) as number, this.littleEndian);

        if (type === Types.int32)
            return dv.setInt32((this.offset += 4) - 4, (value || 0) as number, this.littleEndian);

        if (type === Types.int64)
            return dv.setBigInt64((this.offset += 8) - 8, BigInt(value as number || 0n), this.littleEndian);

        if (type === Types.float)
            return dv.setFloat32((this.offset += 4) - 4, (value || 0) as number, this.littleEndian);

        if (type === Types.double)
            return dv.setFloat64((this.offset += 8) - 8, (value || 0) as number, this.littleEndian);

        if (type === Types.char) {
            let val = value || 0;
            if (typeof val === 'string') val = val.charCodeAt(0) || 0;
            return dv.setUint8(this.offset++, val as number);
        }

        if (type === Types.string) {
            let val = (value || '') as string;
            let stringLength = val.length;
            dv.setInt32(this.offset, stringLength, this.littleEndian);
            this.offset += 4;

            for (let i = 0; i < stringLength; i++)
                dv.setUint8(this.offset++, val.charCodeAt(i) || 0);

            return;
        }

        if (type === Types.string_) {
            let val = (value || '') as string;
            let stringLength = val.length;
            dv.setInt32(this.offset, stringLength + 1, this.littleEndian);
            this.offset += 4;

            for (let i = 0; i < stringLength; i++)
                dv.setUint8(this.offset++, val.charCodeAt(i) || 0);

            dv.setUint8(this.offset++, 0);
            return;
        }

        if (type === Types.string0) {
            let val = (value || '') as string;
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
                let val = (value || {}) as any;

                for (let i in type[1]) {
                    if (val[i])
                        bitfield |= (type[1][i]) as number;
                }

                dv.setUint8(this.offset++, bitfield);
                return;
            }

            if (type[0] === 'bitfield64') {
                let bitfield = 0n;
                let val = (value || {}) as any;

                for (let i in type[1]) {
                    if (val[i])
                        bitfield |= BigInt(type[1][i]);
                }

                dv.setBigUint64(this.offset, bitfield);
                this.offset += 8;
                return;
            }

            let val = (value || []) as any[];
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
            let val = (value || {}) as any;
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
     */
    writeStringified<T extends keyof typeof BasicTypes>(type: T, value: (typeof BasicTypes)[T]) {
        this.write(type, value as any);
        //this.write(Types[type], value);
    }

    ///**
    // * writes a {Object} tree of {keyof typeof Types}
    // * @//deprecated {this.read} is preferred to use
    // * @//template {Object.<string, any>} U
    // * @//param {U} type
    // * @//param {U} value
    // */
    //writeStringifiedObject(type, value) {
    //    if (Array.isArray(type)) {
    //        if (type[0] === 'bitfield' || type[0] === 'bitfield64') {
    //            this.write(type, value);
    //            return;
    //        }
    //
    //        let arrayLength = /** @//type {any} */ (value).length;
    //        type[1] || this.write(Types.uint8, arrayLength);
    //        for (let i = 0; i < arrayLength; i++)
    //            this.writeStringified(type[0], /** @//type {any} */(value)[i]);
    //
    //        return;
    //    }
    //    if (type instanceof Object) {
    //
    //        for (let key in type) {
    //            let typeType = type[key];
    //
    //            this.debugOffsets[key] = this.offset;
    //            this.writeStringifiedObject(typeType, /** @//type {any} */(value)[key]);
    //        }
    //
    //        return;
    //    }
    //
    //    this.writeStringified(type, /** @//type {never} */(value));
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
