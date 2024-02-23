import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum QuestTypes {
	primaryQuest = 0,
	secondaryQuest = 1,
	objective = 2,
	//numQuestTypes = 3,
}

export enum QuestCommands {
	activate = 0,
	complete = 1,
	remove = 2,
}

export type HandleQuestUpdateModel = BasePacketModel & {
	objective: string,
	icon: string,
	tooltip: string,
	reward: string,
	questType: QuestTypes,
	questCommand: QuestCommands,
	handleRollovers: boolean,
	ceremony: boolean,
	success: boolean,
	questId: number,
};

/**
 * shows blue quest list box on right of the screen
 * max 3 quests per type
 */
export default class HandleQuestUpdate extends BasePacket {
	static create(payload: Partial<HandleQuestUpdateModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		handleRollovers: 1 << 0,
		ceremony: 1 << 1,
		success: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: HandleQuestUpdateModel) {
		super.reader(dvr, payload);

		payload.objective = dvr.readCharArray(128);
		payload.icon = dvr.readCharArray(128);
		payload.tooltip = dvr.readCharArray(128);
		payload.reward = dvr.readCharArray(128);
		payload.questType = dvr.readUint8();
		payload.questCommand = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.handleRollovers = bitfield1.handleRollovers;
		payload.ceremony = bitfield1.ceremony;
		payload.success = bitfield1.success;

		payload.questId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: HandleQuestUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.objective, 128);
		dvr.writeCharArray(payload.icon, 128);
		dvr.writeCharArray(payload.tooltip, 128);
		dvr.writeCharArray(payload.reward, 128);
		dvr.writeUint8(payload.questType);
		dvr.writeUint8(payload.questCommand);

		dvr.writeBitfield(this.bitfield1, {
			handleRollovers: payload.handleRollovers,
			ceremony: payload.ceremony,
			success: payload.success,
		});

		dvr.writeUint32(payload.questId);
	}
}
