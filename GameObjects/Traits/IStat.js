
class IStat {
	baseValue = 0;
	flatBonus = 0;
	flatBonus2 = 0;
	percentBonus = 0;
	percentBonus2 = 0;
	
	get total(){
		return this.baseValue + (this.flatBonus + this.flatBonus2) + (this.baseValue * (this.percentBonus + this.percentBonus2) / 100);
	}

	constructor(baseValue = 0){
		this.baseValue = baseValue;
	}
}


module.exports = IStat;
