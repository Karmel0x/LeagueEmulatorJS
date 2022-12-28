
module.exports = class BasePacket {

	static baseSize = 10240;
	static struct_header = {
		cmd: 'uint8',
		netId: 'uint32',
	};
	static struct = {};


	constructor(buffer = null) {
		if (buffer)
			this._buffer = buffer;
	}

	get id() {
		return this.constructor.id;
	}
	get name() {
		return this.constructor.name;
	}

	get channel() {
		return this.constructor.channel;
	}
	get channelName() {
		return this.constructor.channelName;
	}

	get baseSize() {
		return this.constructor.baseSize;
	}
	get struct_header() {
		return this.constructor.struct_header;
	}
	get struct() {
		return this.constructor.struct;
	}

	//_buffer = null;

	reader(buffer) {
		Object.assign(this, buffer.readobj(this.struct_header));
		Object.assign(this, buffer.readobj(this.struct));
	}

	get content() {

		if (this._buffer) {
			this.reader(this._buffer);

			if (this._buffer.off != this._buffer.length)
				console.log('packet structure is incorrect',
					':', `buffer.off(${this._buffer.off}) != buffer.length(${this._buffer.length})`,
					':', `${this.constructor.channelName}.${this.constructor.name}`,
					this._buffer);

			//this._buffer = null;
			delete this._buffer;
		}

		return this;
	}

	set content(value) {
		Object.assign(this, value);
	}

	writer(buffer) {
		buffer.writeobj(this.struct_header, this);
		buffer.writeobj(this.struct, this);
	}

	get buffer() {

		if (!this._buffer) {
			this._buffer = Buffer.allocUnsafe(this.baseSize);
			this.writer(this._buffer);

			if (this._buffer.off != this._buffer.length) {
				this._buffer = Buffer.concat([this._buffer], this._buffer.off);
				this._buffer.off = this._buffer.length;
			}
		}

		return this._buffer;
	}

	set buffer(value) {
		this._buffer = value;
	}

};
