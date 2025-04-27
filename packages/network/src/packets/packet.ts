
import RelativeDataView from '../relative-data-view';


export type PacketModel = {
	//[key: string]: any;
};

export class PacketDebugger {

	static offsets: { [property: string]: string } = {};
	static readATM: any = {};
	//static lastOffset = 0;

	static trimDot(str: string) {
		return str.replace(/^\./, '');
	}

	static getProxy(dvr: RelativeDataView, payload: PacketModel, reset = true) {
		if (reset) {
			this.offsets = {};
			//this.lastOffset = 1;
		}

		const proxyHandler: (parent: string) => ProxyHandler<any> = (parent) => {
			return {
				set: (target, property, value) => {
					if (value) {
						if (Array.isArray(value)) {
							value = value.map((item, index) => {
								if (typeof item === 'object') {
									return new Proxy(item, proxyHandler(`${parent}.${property as string}.${index}`));
								}
								return item;
							});

							//value.push = new Proxy(value.push, {
							//	apply: (target, thisArg, argumentsList) => {
							//		let index = value.length;
							//		let item = argumentsList[0];
							//
							//		if (typeof item === 'object') {
							//			item = new Proxy(item, proxyHandler(`${parent}.${property as string}[${index}]`));
							//		}
							//
							//		value[index] = item;
							//		return target.apply(thisArg, argumentsList);
							//	},
							//});
						}

						if (typeof value === 'object') {
							value = new Proxy(value, proxyHandler(`${parent}.${property as string}`));
						}

					}

					if (!Array.isArray(value) || value.length > 0)
						this.offsets[this.trimDot(`${parent}.${property as string}`)] = `${dvr.offset - dvr.lastFieldSize}-${dvr.offset}`;
					//this.lastOffset = dvr.offset;

					target[property as string] = value;
					return true;
				},
			};
		};

		payload = new Proxy(payload, proxyHandler(''));
		this.readATM = payload;
		return payload;
	}

}

export type PacketMessage = {
	data: ArrayBufferLike;
	channel: number;
	flags?: number;
};

export default class Packet {

	static baseSize = 10240;
	static debug = true;

	static channel = -1;
	static id = -1;

	static from(content: PacketModel | RelativeDataView | ArrayBuffer) {
		if (content instanceof RelativeDataView || content instanceof ArrayBuffer)
			return this.read(content);

		return this.write(content);
	}

	static read(dvr: RelativeDataView | ArrayBuffer, payload: Partial<PacketModel> | undefined = undefined) {
		if (dvr instanceof ArrayBuffer)
			dvr = RelativeDataView.from(dvr);

		payload = payload || {};

		if (this.debug)
			payload = PacketDebugger.getProxy(dvr, payload);

		this.reader(dvr, payload);
		return payload;
	}

	static write(payload: PacketModel, dvr: RelativeDataView | ArrayBuffer | undefined = undefined) {
		if (!dvr)
			dvr = RelativeDataView.alloc(this.baseSize);

		if (dvr instanceof ArrayBuffer)
			dvr = RelativeDataView.from(dvr);

		this.writer(dvr, payload);
		return dvr.buffer.slice(0, dvr.offset);
	}

	static create(payload: Partial<PacketModel>) {
		try {
			const data = this.write(payload);
			if (data.byteLength <= 0)
				throw new Error('empty packet');

			return {
				payload,// for debug
				data,
				//id: this.id,
				channel: this.channel,
				//flags: this.channel === /*channels.s2cUnreliable*/4 ? packetFlag.unsequenced : undefined,
			} as PacketMessage;
		}
		catch (e) {
			if (e instanceof Error) {
				if (e.message.includes('no replication units changed'))
					return;

				console.error(e);
			}
		}
	}

	/**
	 * @abstract
	 */
	static reader(dvr: RelativeDataView, payload: PacketModel) {

	}

	/**
	 * @abstract
	 */
	static writer(dvr: RelativeDataView, payload: PacketModel) {

	}

}
