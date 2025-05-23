
export default class RelativeDataView {

    static from(arrayBuffer: ArrayBufferLike) {
        const dv = new DataView(arrayBuffer);
        return new RelativeDataView(dv);
    }

    static fromBuffer(buffer: Buffer) {
        const byteOffset = buffer.byteOffset;
        const arrayBuffer = buffer.buffer.slice(byteOffset, byteOffset + buffer.byteLength);
        return this.from(arrayBuffer);
    }

    static alloc(length: number) {
        const buffer = new ArrayBuffer(length);
        return this.from(buffer);
    }

    dv: DataView;
    littleEndian = true;
    offset = 0;
    lastFieldSize = 0;

    /** buffer byte length */
    get length() {
        return this.dv.byteLength;
    }

    get bytesLeft() {
        return this.length - this.offset;
    }

    get buffer() {
        return this.dv.buffer;
    }

    get data() {
        return this.dv.buffer.slice(0, this.offset);
    }

    constructor(dv: DataView, littleEndian: boolean = true) {
        this.dv = dv;
        this.littleEndian = littleEndian;
    }

    readUint8() {
        const fieldSize = 1;
        this.lastFieldSize = fieldSize;
        return this.dv.getUint8((this.offset += fieldSize) - fieldSize);
    }

    readUint16() {
        const fieldSize = 2;
        this.lastFieldSize = fieldSize;
        return this.dv.getUint16((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readUint32() {
        const fieldSize = 4;
        this.lastFieldSize = fieldSize;
        return this.dv.getUint32((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readBigUint64() {
        const fieldSize = 8;
        this.lastFieldSize = fieldSize;
        return this.dv.getBigUint64((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readUint64() {
        return Number(this.readBigUint64());
    }

    readInt8() {
        const fieldSize = 1;
        this.lastFieldSize = fieldSize;
        return this.dv.getInt8((this.offset += fieldSize) - fieldSize);
    }

    readInt16() {
        const fieldSize = 2;
        this.lastFieldSize = fieldSize;
        return this.dv.getInt16((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readInt32() {
        const fieldSize = 4;
        this.lastFieldSize = fieldSize;
        return this.dv.getInt32((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readBigInt64() {
        const fieldSize = 8;
        this.lastFieldSize = fieldSize;
        return this.dv.getBigInt64((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readInt64() {
        return Number(this.readBigInt64());
    }

    readFloat32() {
        const fieldSize = 4;
        this.lastFieldSize = fieldSize;
        return this.dv.getFloat32((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readFloat() {
        return this.readFloat32();
    }

    readFloat64() {
        const fieldSize = 8;
        this.lastFieldSize = fieldSize;
        return this.dv.getFloat64((this.offset += fieldSize) - fieldSize, this.littleEndian);
    }

    readDouble() {
        return this.readFloat64();
    }

    readBool() {
        return !!this.readUint8();
    }

    readUint8Array(length: number) {
        const result = new Uint8Array(length);
        for (let i = 0; i < length; i++)
            result[i] = this.readUint8();

        this.lastFieldSize = length;
        return result;
    }

    readByteArray(length: number) {
        return this.readUint8Array(length);
    }

    readChar() {
        return String.fromCharCode(this.readUint8());
    }

    readString() {
        let str = '';
        const off = this.offset;
        let length = this.readUint32();

        for (let i = 0; i < length; i++) {
            let s = this.readUint8();
            str += String.fromCharCode(s);
        }

        this.lastFieldSize = this.offset - off;
        return str;
    }

    readCharArray(length: number | undefined = undefined) {
        let str = '';
        const off = this.offset;
        length = length ?? this.readUint32();

        for (let i = 0; i < length; i++) {
            let s = this.readUint8();
            if (s === 0x00)
                break;

            str += String.fromCharCode(s);
        }

        this.offset += Math.max(0, length - (str.length + 1));
        this.lastFieldSize = this.offset - off;
        return str;
    }

    readStringNullTerminated(maxLength = 0) {
        let str = '';
        const off = this.offset;

        while (this.offset < this.dv.byteLength) {
            let s = this.readUint8();
            if (s === 0x00)
                break;

            str += String.fromCharCode(s);
            if (maxLength && str.length >= maxLength)
                break;
        }

        this.lastFieldSize = this.offset - off;
        return str;
    }

    unpackIntegerBitfield<T extends { [name: string]: number }>(fields: T, bitfield: number) {
        const result = {} as { [K in keyof T]: number };

        for (const i in fields) {
            const field = fields[i]!;
            result[i] = bitfield & ((1 << field) - 1);
            bitfield >>= field;
        }

        return result;
    }

    readIntegerBitfield<T extends { [name: string]: number }>(fields: T) {
        const bitfield = this.readUint8();
        return this.unpackIntegerBitfield(fields, bitfield);
    }

    unpackBooleanBitfield<T extends { [name: string]: number }>(fields: T, bitfield: number) {
        const result = {} as { [K in keyof T]: boolean };

        for (const i in fields) {
            const field = fields[i]!;
            result[i] = (bitfield & field) !== 0;
        }

        return result;
    }

    readBitfield<T extends { [name: string]: number }>(fields: T) {
        const bitfield = this.readUint8();
        return this.unpackBooleanBitfield(fields, bitfield);
    }

    readBitfield64<T extends { [name: string]: number }>(fields: T) {
        const bitfield = this.readUint64();
        return this.unpackBooleanBitfield(fields, Number(bitfield));
    }

    readArray<T extends (...args: any[]) => any>(reader: T, length: number | undefined = undefined) {
        const result = [] as ReturnType<T>[];
        const off = this.offset;
        length = length ?? this.readUint8();

        for (let i = 0; i < length; i++)
            result.push(reader());

        this.lastFieldSize = this.offset - off;
        return result;
    }

    writeUint8(value: number | undefined) {
        return this.dv.setUint8(this.offset++, value || 0);
    }

    writeUint16(value: number | undefined) {
        return this.dv.setUint16((this.offset += 2) - 2, value || 0, this.littleEndian);
    }

    writeUint32(value: number | undefined) {
        return this.dv.setUint32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeBigUint64(value: bigint | undefined) {
        return this.dv.setBigUint64((this.offset += 8) - 8, value || 0n, this.littleEndian);
    }

    writeUint64(value: number | undefined) {
        return this.writeBigUint64(BigInt(value || 0));
    }

    writeInt8(value: number | undefined) {
        return this.dv.setInt8(this.offset++, value || 0);
    }

    writeInt16(value: number | undefined) {
        return this.dv.setInt16((this.offset += 2) - 2, value || 0, this.littleEndian);
    }

    writeInt32(value: number | undefined) {
        return this.dv.setInt32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeBigInt64(value: bigint | undefined) {
        return this.dv.setBigInt64((this.offset += 8) - 8, value || 0n, this.littleEndian);
    }

    writeInt64(value: number | undefined) {
        return this.writeBigInt64(BigInt(value || 0));
    }

    writeFloat32(value: number | undefined) {
        return this.dv.setFloat32((this.offset += 4) - 4, value || 0, this.littleEndian);
    }

    writeFloat(value: number | undefined) {
        return this.writeFloat32(value || 0);
    }

    writeFloat64(value: number | undefined) {
        return this.dv.setFloat64((this.offset += 8) - 8, value || 0, this.littleEndian);
    }

    writeDouble(value: number | undefined) {
        return this.writeFloat64(value || 0);
    }

    writeBool(value: boolean | undefined) {
        return this.writeUint8(value ? 1 : 0);
    }

    writeByteArray(value: Uint8Array | number[] | undefined, length: number | undefined = undefined) {
        value = value || [];
        length = length ?? value.length;
        for (let i = 0; i < length; i++)
            this.writeUint8(value[i]);
    }

    writeChar(value: string | number | undefined) {
        if (typeof value === 'string')
            value = value.charCodeAt(0);

        return this.writeUint8(value || 0);
    }

    writeString(value: string | undefined) {
        value = value || '';
        let length = value.length;
        this.writeUint32(length);

        for (let i = 0; i < length; i++)
            this.writeUint8(value.charCodeAt(i) || 0);
    }

    writeCharArray(value: string | undefined, length: number | undefined = undefined) {
        value = value || '';
        if (length === undefined) {
            length = value.length;
            this.writeUint32(length);
        }

        for (let i = 0; i < length; i++) {
            if (i < value.length)
                this.writeUint8(value.charCodeAt(i));
            else
                this.writeUint8(0x00);
        }
    }

    writeStringNullTerminated(value: string | undefined, maxLength = 0) {
        value = value || '';
        if (!maxLength)
            maxLength = value.length + 1;

        for (let i = 0; i < maxLength; i++) {
            if (i < value.length)
                this.writeUint8(value.charCodeAt(i));
            else {
                this.writeUint8(0x00);
                break;
            }
        }
    }

    packIntegerBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: number }) {
        let bitfield = 0;
        let shifted = 0;
        for (const i in fields) {
            const field = fields[i]!;
            const value = values[i];

            if (value)
                bitfield |= value << shifted;

            shifted += field;
        }
        return bitfield;
    }

    writeIntegerBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: number }) {
        const bitfield = this.packIntegerBitfield(fields, values);
        this.writeUint8(bitfield);
    }

    packBooleanBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        let bitfield = 0;
        for (const i in values) {
            if (values[i]) {
                bitfield |= fields[i]!;
            }
        }
        return bitfield;
    }

    writeBitfield<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        const bitfield = this.packBooleanBitfield(fields, values);
        this.writeUint8(bitfield);
    }

    writeBitfield64<T extends { [name: string]: number }>(fields: T, values: { [K in keyof Partial<T>]: boolean }) {
        const bitfield = this.packBooleanBitfield(fields, values);
        this.writeUint64(bitfield);
    }

    writeArray<U extends any, T extends (value: U) => void>(value: U[] | undefined, writer: T, length = 0) {
        value = value || [];

        if (!length) {
            length = value.length;
            this.writeUint8(length);
        }

        for (let i = 0; i < length; i++)
            writer(value[i]!);
    }

}
