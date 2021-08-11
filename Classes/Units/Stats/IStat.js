
class IStat {
    BaseValue = 0;
    FlatBonus = 0;
    PercentBonus = 0;
    get Total(){
        return this.BaseValue + this.FlatBonus + (this.BaseValue * this.PercentBonus / 100);
    }

    constructor(BaseValue = 0){
        this.BaseValue = BaseValue;
    }
}


module.exports = IStat;
