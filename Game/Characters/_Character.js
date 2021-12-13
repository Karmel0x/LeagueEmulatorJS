

module.exports = class _Character {
	PackageHash = 0;
	attackWindupPercent = 20;
	constructor(parent){
		this.parent = parent;

	}
	get name(){
		return this.constructor.name;
	}
	get model(){
		return this.constructor.name;
	}
};
