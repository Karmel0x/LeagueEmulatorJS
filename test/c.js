
var CanDie = (C) => class CanDie extends C {
	xd1(){
		console.log(1, this);
	}
}
var CanAttack = (C) => class CanAttack extends C {
	xd2(){
		console.log(2, this);
	}
}

class EmptyClass {}
const creator = (allParts, part) => {console.log(allParts, part);return part(allParts)};
const extender = (...parts) => parts.reduce(creator, EmptyClass);




class Unit extends extender(CanDie, CanAttack) {
	constructor(){
		super();

		console.log(this);
		this.xd1();
		this.xd2();
	}
}

var unit = new Unit();
