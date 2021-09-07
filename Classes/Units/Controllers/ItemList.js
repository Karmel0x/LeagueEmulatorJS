
var ItemList = {
	1: class Item {
		static GoldCost = 100;
		use(target = undefined){
			
		}
	},
	1001: class Item { // Boots of Speed
		id = 1001;
		static GoldCost = 325;
		static GoldSell = 227;
	},
	1018: class Item { // Cloak of Agility
		id = 1018;
		static GoldCost = 730;
		static GoldSell = 511;
	},
	1037: class Item { // Pickaxe
		id = 1037;
		static GoldCost = 875;
		static GoldSell = 613;
	},
	1038: class Item { // B. F. Sword
		id = 1038;
		static GoldCost = 1550;
		static GoldSell = 1085;
	},
	1055: class Item { // doran's blade
		id = 1055;
		static GoldCost = 440;
		static GoldSell = 176;
	},
	2003: class Item { // health potion
		id = 2003;
		static GoldCost = 35;
		static GoldSell = 14;
		isConsumable = true;
		static isStackable = true;
		use(target = undefined){

		}
	},
	3031: class Item { // Infinity Edge
		id = 3031;
		static GoldCost = 3800;
		static GoldSell = 2660;
		static from = [ 1038, 1037, 1018 ]
	},
	3340: class Item { // yellow trinket
		id = 3340;
		static GoldCost = 0;
		static GoldSell = 0;
		static isTrinket = true;
		use(target = undefined){
			
		}
	}
};

module.exports = ItemList;
