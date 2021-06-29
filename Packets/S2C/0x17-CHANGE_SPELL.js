var BasePacket = require('../BasePacket');

const ChangeSlotSpellDataType = {
    TargetingType: 1,
    SpellName: 2,
    Range: 3,
    MaxGrowthRange: 4,
    RangeDisplay: 5,
    IconIndex: 6,
    OffsetTarget: 7,
};

var ChangeSpellData = {
    spellSlot: 'uint8',
    isSummonerSpell: 'uint8',
    ChangeSlotSpellDataType: 'uint32',
};

module.exports = class extends BasePacket {//S2C.CHANGE_SPELL
	struct = {
		ChangeSpellData: ChangeSpellData,
	}
    reader = function(buffer){
        if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.TargetingType){
            this.TargetingType = buffer.read1('uint8');
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.SpellName){
            this.SpellName = buffer.readobj(['char', 128]);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.Range){
            this.CastRange = buffer.read1('float');
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.MaxGrowthRange){
            this.OverrideMaxCastRange = buffer.read1('float');
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.RangeDisplay){
            this.OverrideCastRangeDisplay = buffer.read1('float');
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.IconIndex){
            this.IconIndex = buffer.read1('uint8');
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.OffsetTarget){
            this.Targets_length = buffer.read1('uint8');
            this.Targets = buffer.readobj(['uint32', this.Targets_length]);
        }
    }
    writer = function(buffer){
        if(!this.ChangeSpellData.ChangeSlotSpellDataType){
            if(this.TargetingType)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.TargetingType;
            else if(this.SpellName)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.SpellName;
            else if(this.CastRange)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.Range;
            else if(this.OverrideMaxCastRange)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.MaxGrowthRange;
            else if(this.OverrideCastRangeDisplay)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.RangeDisplay;
            else if(this.IconIndex)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.IconIndex;
            else if(this.Targets)
                this.ChangeSpellData.ChangeSlotSpellDataType = ChangeSlotSpellDataType.OffsetTarget;
        }

        if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.TargetingType){
            buffer.write1('uint8', this.TargetingType);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.SpellName){
            buffer.writeobj(['char', 128], this.SpellName);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.Range){
            buffer.write1('float', this.CastRange);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.MaxGrowthRange){
            buffer.write1('float', this.OverrideMaxCastRange);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.RangeDisplay){
            buffer.write1('float', this.OverrideCastRangeDisplay);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.IconIndex){
            buffer.write1('uint8', this.IconIndex);
        }
        else if(this.ChangeSpellData.ChangeSlotSpellDataType == ChangeSlotSpellDataType.OffsetTarget){
            buffer.write1('uint8', this.Targets.length);
            buffer.writeobj(['uint32', this.Targets.length], this.Targets);
        }
    }
};
