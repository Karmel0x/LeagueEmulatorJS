
var ItemList = {
	1: class Item {
		static GoldCost = 100;
		use(target = undefined){
			
		}
	},
	3340: class Item { // yellow trinket
		id = 3340;
		static GoldCost = 0;
		static isTrinket = true;
		use(target = undefined){
			
		}
	},
	1055: class Item { // doran's blade
		id = 1055;
		static GoldCost = 440;
	},
	2003: class Item { // health potion
		id = 2003;
		static GoldCost = 35;
		isConsumable = true;
		static isStackable = true;
		use(target = undefined){

		}
	}
};

module.exports = ItemList;
