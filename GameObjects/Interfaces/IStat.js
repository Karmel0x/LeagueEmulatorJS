
class IStat {
	baseValue = 0;
	flatBonus = 0;
	percentBonus = 0;
	
	get total(){
		return this.baseValue + this.flatBonus + (this.baseValue * this.percentBonus / 100);
	}

	constructor(baseValue = 0){
		this.baseValue = baseValue;
	}
}


module.exports = IStat;
