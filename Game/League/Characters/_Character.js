

module.exports = class _Character {
	PackageHash = 0;
	constructor(parent){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

	}
	get name(){
		return this.constructor.name;
	}
	get model(){
		return this.constructor.name;
	}
};
