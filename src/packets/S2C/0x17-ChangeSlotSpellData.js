const BasePacket = require('../BasePacket');

const ChangeSlotSpellDataType = {
	targetingType: 1,
	spellName: 2,
	range: 3,
	maxGrowthRange: 4,
	rangeDisplay: 5,
	iconIndex: 6,
	offsetTarget: 7,
};

const ChangeSpellData = {
	spellSlot: 'uint8',
	bitfield: ['bitfield', {
		isSummonerSpell: 1,
	}],
	changeSlotSpellDataType: 'uint32',
};

module.exports = class ChangeSlotSpellData extends BasePacket {
	static struct = {
		changeSpellData: ChangeSpellData,
	};

	reader(buffer) {
		super.reader(buffer);
		let changeSpellData = this.changeSpellData;

		if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.targetingType) {
			this.targetingType = buffer.read1('uint8');
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.spellName) {
			this.spellName = buffer.read1('string0');//buffer.readobj(['char', 128]);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.range) {
			this.CastRange = buffer.read1('float');
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.maxGrowthRange) {
			this.OverrideMaxCastRange = buffer.read1('float');
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.rangeDisplay) {
			this.OverrideCastRangeDisplay = buffer.read1('float');
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.iconIndex) {
			this.iconIndex = buffer.read1('uint8');
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.offsetTarget) {
			this.targets_length = buffer.read1('uint8');
			this.targets = buffer.readobj(['uint32', this.targets_length]);
		}
	}

	writer(buffer) {
		super.writer(buffer);
		let changeSpellData = this.changeSpellData;

		if (!changeSpellData.changeSlotSpellDataType) {
			if (this.targetingType)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.targetingType;
			else if (this.spellName)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.spellName;
			else if (this.CastRange)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.range;
			else if (this.OverrideMaxCastRange)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.maxGrowthRange;
			else if (this.OverrideCastRangeDisplay)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.rangeDisplay;
			else if (this.iconIndex)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.iconIndex;
			else if (this.targets)
				changeSpellData.changeSlotSpellDataType = ChangeSlotSpellDataType.offsetTarget;
		}

		if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.targetingType) {
			buffer.write1('uint8', this.targetingType);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.spellName) {
			buffer.write1('string0', this.spellName);//buffer.writeobj(['char', 128], this.spellName);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.range) {
			buffer.write1('float', this.CastRange);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.maxGrowthRange) {
			buffer.write1('float', this.OverrideMaxCastRange);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.rangeDisplay) {
			buffer.write1('float', this.OverrideCastRangeDisplay);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.iconIndex) {
			buffer.write1('uint8', this.iconIndex);
		}
		else if (changeSpellData.changeSlotSpellDataType == ChangeSlotSpellDataType.offsetTarget) {
			buffer.write1('uint8', this.targets.length);
			buffer.writeobj(['uint32', this.targets.length], this.targets);
		}
	}
};
