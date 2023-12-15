
import PacketReaderWriter from '../core/network/binary-packet-struct/index.js';

export default class BasePacket {

	static baseSize = 10240;
	static struct_header = /** @type {Object} */({
		cmd: 'uint8',
		netId: 'uint32',
	});
	static struct = {};

	static id = 0;
	static channel = 0;
	static channelName = '';

	/**
	 * 
	 * @param {PacketReaderWriter} packetReaderWriter 
	 * @returns 
	 */
	static from(packetReaderWriter) {
		let packet = new this();
		packet.packetReaderWriter = packetReaderWriter;
		return packet;
	}

	/**
	 * 
	 * @param {Object & BasePacket} content 
	 * @returns 
	 */
	static new(content) {
		let packet = new this();
		Object.assign(this, content);
		return packet;
	}

	/** @type {PacketReaderWriter | undefined} */
	packetReaderWriter = undefined;

	cmd = this.id;

	get id() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.id;
	}
	get name() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.name;
	}

	get channel() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.channel;
	}
	get channelName() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.channelName;
	}

	get baseSize() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.baseSize;
	}
	get struct_header() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.struct_header;
	}
	get struct() {
		let base = /** @type {typeof BasePacket} */(this.constructor);
		return base.struct;
	}

	/**
	 * @param {PacketReaderWriter} packetReaderWriter 
	 */
	reader(packetReaderWriter) {
		Object.assign(this, packetReaderWriter.read(this.struct_header));
		Object.assign(this, packetReaderWriter.read(this.struct));
	}

	/**
	 * @param {PacketReaderWriter} packetReaderWriter 
	 */
	writer(packetReaderWriter) {
		packetReaderWriter.write(this.struct_header, this);
		packetReaderWriter.write(this.struct, this);
	}

	get content() {

		if (this.packetReaderWriter) {
			this.reader(this.packetReaderWriter);

			let { offset, length } = this.packetReaderWriter;
			if (offset != length) {
				console.log(
					`packet structure for ${this.channelName}.${this.name} is incorrect:`,
					`offset(${offset}) != length(${length})`,
					this.packetReaderWriter.buffer
				);
			}

			delete this.packetReaderWriter;
		}

		return this;
	}

	set content(value) {
		Object.assign(this, value);
	}

	get buffer() {

		if (!this.packetReaderWriter) {
			this.packetReaderWriter = PacketReaderWriter.fromSize(this.baseSize);
			this.writer(this.packetReaderWriter);
		}

		return this.packetReaderWriter.buffer.slice(0, this.packetReaderWriter.offset);
	}

}
