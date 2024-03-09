import _Item from '@workspace/gameserver/src/game/basedata/item';

const ItemList = {
	1001: class Item extends _Item { //Boots of Speed
		id = 1001;
		static goldCost = 325;
		static stats = {
			moveSpeed: {
				flatBonus: 25
			}
		};
	},
	1004: class Item extends _Item { //Faerie Charm
		id = 1004;
		static goldCost = 180;
	},
	1006: class Item extends _Item { //Rejuvenation Bead
		id = 1006;
		static goldCost = 180;
	},
	1011: class Item extends _Item { //Giant's Belt
		id = 1011;
		static goldCost = 1000;
		static stats = {
			health: {
				flatBonus: 380
			}
		};
	},
	1018: class Item extends _Item { //Cloak of Agility
		id = 1018;
		static goldCost = 730;
		static stats = {
			crit: {
				flatBonus: 0.15
			}
		};
	},
	1026: class Item extends _Item { //Blasting Wand
		id = 1026;
		static goldCost = 860;
		static stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	1027: class Item extends _Item { //Sapphire Crystal
		id = 1027;
		static goldCost = 400;
		static stats = {
			mana: {
				flatBonus: 200
			}
		};
	},
	1028: class Item extends _Item { //Ruby Crystal
		id = 1028;
		static goldCost = 400;
		static stats = {
			health: {
				flatBonus: 150
			}
		};
	},
	1029: class Item extends _Item { //Cloth armor
		id = 1029;
		static goldCost = 300;
		static stats = {
			armor: {
				flatBonus: 15
			}
		};
	},
	1031: class Item extends _Item { //Chain Vest
		id = 1031;
		static goldCost = 750;
		static from = [1029];
		static stats = {
			armor: {
				flatBonus: 40
			}
		};
	},
	1033: class Item extends _Item { //Null-Magic Mantle
		id = 1033;
		static goldCost = 500;
		static stats = {
			resist: {
				flatBonus: 25
			}
		};
	},
	1036: class Item extends _Item { //Long Sword
		id = 1036;
		static goldCost = 360;
		static stats = {
			attackDamage: {
				flatBonus: 10
			}
		};
	},
	1037: class Item extends _Item { //Pickaxe
		id = 1037;
		static goldCost = 875;
		static stats = {
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	1038: class Item extends _Item { //B. F. Sword
		id = 1038;
		static goldCost = 1550;
		static stats = {
			attackDamage: {
				flatBonus: 50
			}
		};
	},
	1039: class Item extends _Item { //Hunter's Machete
		id = 1039;
		static goldCost = 400;
	},
	1042: class Item extends _Item { //Dagger
		id = 1042;
		static goldCost = 450;
		static stats = {
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	1043: class Item extends _Item { //Recurve Bow
		id = 1043;
		static goldCost = 900;
		static stats = {
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	1051: class Item extends _Item { //Brawler's Gloves
		id = 1051;
		static goldCost = 400;
		static stats = {
			crit: {
				flatBonus: 0.08
			}
		};
	},
	1052: class Item extends _Item { //Amplifying Tome
		id = 1052;
		static goldCost = 435;
		static stats = {
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	1053: class Item extends _Item { //Vampiric Scepter
		id = 1053;
		static goldCost = 800;
		static from = [1036];
		static stats = {
			attackDamage: {
				flatBonus: 10
			},
			lifeSteal: {
				percentBonus: 8
			}
		};
	},
	1054: class Item extends _Item { //Doran's Shield
		id = 1054;
		static goldCost = 440;
		static stats = {
			health: {
				flatBonus: 80
			},
			healthRegen: {
				flatBonus: 1.2
			}
		};
	},
	1055: class Item extends _Item { //Doran's Blade
		id = 1055;
		static goldCost = 440;
		static stats = {
			health: {
				flatBonus: 70
			},
			attackDamage: {
				flatBonus: 7
			},
			lifeSteal: {
				percentBonus: 3
			}
		};
	},
	1056: class Item extends _Item { //Doran's Ring
		id = 1056;
		static goldCost = 400;
		static stats = {
			health: {
				flatBonus: 60
			},
			manaRegen: {
				flatBonus: 0.6
			},
			abilityPower: {
				flatBonus: 15
			}
		};
	},
	1058: class Item extends _Item { //Needlessly Large Rod
		id = 1058;
		static goldCost = 1600;
		static stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	1062: class Item extends _Item { //Prospector's Blade
		id = 1062;
		static goldCost = 950;
		static stats = {
			attackDamage: {
				flatBonus: 16
			},
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	1063: class Item extends _Item { //Prospector's Ring
		id = 1063;
		static goldCost = 950;
		static stats = {
			manaRegen: {
				flatBonus: 1.2
			},
			abilityPower: {
				flatBonus: 35
			}
		};
	},
	1074: class Item extends _Item { //Doran's Shield (Showdown)
		id = 1074;
		static goldCost = 440;
		static stats = {
			health: {
				flatBonus: 100
			},
			healthRegen: {
				flatBonus: 2
			}
		};
	},
	1075: class Item extends _Item { //Doran's Blade (Showdown)
		id = 1075;
		static goldCost = 440;
		static stats = {
			health: {
				flatBonus: 70
			},
			attackDamage: {
				flatBonus: 7
			},
			lifeSteal: {
				percentBonus: 3
			}
		};
	},
	1076: class Item extends _Item { //Doran's Ring (Showdown)
		id = 1076;
		static goldCost = 400;
		static stats = {
			health: {
				flatBonus: 60
			},
			manaRegen: {
				flatBonus: 0.6
			},
			abilityPower: {
				flatBonus: 15
			}
		};
	},
	1080: class Item extends _Item { //Spirit Stone
		id = 1080;
		static goldCost = 775;
		static from = [1039, 1004, 1006];
	},
	2003: class Item extends _Item { //Health Potion
		id = 2003;
		static goldCost = 35;
		isConsumable = true;
		static isStackable = true;
		stacks = 5;
	},
	2004: class Item extends _Item { //Mana Potion
		id = 2004;
		static goldCost = 35;
		isConsumable = true;
		static isStackable = true;
		stacks = 5;
	},
	2009: class Item extends _Item { //Total Biscuit of Rejuvenation
		id = 2009;
		static goldCost = 0;
	},
	2010: class Item extends _Item { //Total Biscuit of Rejuvenation
		id = 2010;
		static goldCost = 35;
		static isStackable = true;
		stacks = 5;
	},
	2037: class Item extends _Item { //Elixir of Fortitude
		id = 2037;
		static goldCost = 350;
		isConsumable = true;
		static isStackable = true;
		stacks = 3;
	},
	2039: class Item extends _Item { //Elixir of Brilliance
		id = 2039;
		static goldCost = 250;
		isConsumable = true;
		static isStackable = true;
		stacks = 3;
	},
	2040: class Item extends _Item { //Ichor of Rage
		id = 2040;
		static goldCost = 500;
		isConsumable = true;
		static isStackable = true;
		stacks = 3;
	},
	2041: class Item extends _Item { //Crystalline Flask
		id = 2041;
		static goldCost = 345;
		isConsumable = true;
		active = true;
	},
	2043: class Item extends _Item { //Vision Ward
		id = 2043;
		static goldCost = 100;
		isConsumable = true;
		static isStackable = true;
		stacks = 2;
	},
	2044: class Item extends _Item { //Stealth Ward
		id = 2044;
		static goldCost = 75;
		isConsumable = true;
		static isStackable = true;
		stacks = 3;
	},
	2045: class Item extends _Item { //Ruby Sightstone
		id = 2045;
		static goldCost = 1600;
		static from = [2049, 1028];
		active = true;
		static stats = {
			health: {
				flatBonus: 400
			}
		};
	},
	2047: class Item extends _Item { //Oracle's Extract
		id = 2047;
		static goldCost = 250;
		isConsumable = true;
	},
	2048: class Item extends _Item { //Ichor of Illumination
		id = 2048;
		static goldCost = 500;
		isConsumable = true;
		static isStackable = true;
		stacks = 3;
	},
	2049: class Item extends _Item { //Sightstone
		id = 2049;
		static goldCost = 800;
		static from = [1028];
		active = true;
		static stats = {
			health: {
				flatBonus: 150
			}
		};
	},
	2050: class Item extends _Item { //Explorer's Ward
		id = 2050;
		static goldCost = 0;
		isConsumable = true;
	},
	2051: class Item extends _Item { //Guardian's Horn
		id = 2051;
		static goldCost = 1025;
		static from = [1006, 1028];
		active = true;
		static stats = {
			health: {
				flatBonus: 180
			}
		};
	},
	2052: class Item extends _Item { //Poro-Snax
		id = 2052;
		static goldCost = 0;
	},
	2053: class Item extends _Item { //Raptor Cloak
		id = 2053;
		static goldCost = 1000;
		static from = [1006, 1029];
		static stats = {
			armor: {
				flatBonus: 30
			}
		};
	},
	2137: class Item extends _Item { //Elixir of Ruin
		id = 2137;
		static goldCost = 400;
		isConsumable = true;
	},
	2138: class Item extends _Item { //Elixir of Iron
		id = 2138;
		static goldCost = 400;
		isConsumable = true;
	},
	2139: class Item extends _Item { //Elixir of Sorcery
		id = 2139;
		static goldCost = 400;
		isConsumable = true;
	},
	2140: class Item extends _Item { //Elixir of Wrath
		id = 2140;
		static goldCost = 400;
		isConsumable = true;
	},
	3001: class Item extends _Item { //Abyssal Scepter
		id = 3001;
		static goldCost = 2440;
		static from = [1026, 1033, 1033];
		static stats = {
			abilityPower: {
				flatBonus: 70
			},
			resist: {
				flatBonus: 50
			}
		};
	},
	3003: class Item extends _Item { //Archangel's Staff
		id = 3003;
		static goldCost = 2700;
		static from = [3070, 1026];
		static stats = {
			mana: {
				flatBonus: 250
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3004: class Item extends _Item { //Manamune
		id = 3004;
		static goldCost = 2200;
		static from = [3070, 1037];
		static stats = {
			mana: {
				flatBonus: 250
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	3005: class Item extends _Item { //Atma's Impaler
		id = 3005;
		static goldCost = 2250;
		static from = [1031, 3093];
		static stats = {
			armor: {
				flatBonus: 45
			},
			crit: {
				flatBonus: 0.15
			}
		};
	},
	3006: class Item extends _Item { //Berserker's Greaves
		id = 3006;
		static goldCost = 1000;
		static from = [1001, 1042];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3007: class Item extends _Item { //Archangel's Staff (Crystal Scar)
		id = 3007;
		static goldCost = 2700;
		static from = [3073, 1026];
		static stats = {
			health: {
				flatBonus: 250
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3008: class Item extends _Item { //Manamune (Crystal Scar)
		id = 3008;
		static goldCost = 2200;
		static from = [3073, 1037];
		static stats = {
			health: {
				flatBonus: 250
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	3009: class Item extends _Item { //Boots of Swiftness
		id = 3009;
		static goldCost = 1000;
		static from = [1001];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3010: class Item extends _Item { //Catalyst the Protector
		id = 3010;
		static goldCost = 1200;
		static from = [1028, 1027];
		static stats = {
			health: {
				flatBonus: 200
			},
			mana: {
				flatBonus: 300
			}
		};
	},
	3020: class Item extends _Item { //Sorcerer's Shoes
		id = 3020;
		static goldCost = 1100;
		static from = [1001];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3022: class Item extends _Item { //Frozen Mallet
		id = 3022;
		static goldCost = 3300;
		static from = [1028, 1011, 1037];
		static stats = {
			health: {
				flatBonus: 700
			},
			attackDamage: {
				flatBonus: 30
			}
		};
	},
	3023: class Item extends _Item { //Twin Shadows
		id = 3023;
		static goldCost = 2400;
		static from = [3108, 3113];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 80
			},
			moveSpeed: {
				percentBonus: 6
			}
		};
	},
	3024: class Item extends _Item { //Glacial Shroud
		id = 3024;
		static goldCost = 950;
		static from = [1027, 1029];
		static stats = {
			mana: {
				flatBonus: 250
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	3025: class Item extends _Item { //Iceborn Gauntlet
		id = 3025;
		static goldCost = 2900;
		static from = [3057, 3024];
		static stats = {
			mana: {
				flatBonus: 500
			},
			armor: {
				flatBonus: 60
			},
			abilityPower: {
				flatBonus: 30
			}
		};
	},
	3026: class Item extends _Item { //Guardian Angel
		id = 3026;
		static goldCost = 2750;
		static from = [1033, 1031];
		static stats = {
			armor: {
				flatBonus: 50
			},
			resist: {
				flatBonus: 40
			}
		};
	},
	3027: class Item extends _Item { //Rod of Ages
		id = 3027;
		static goldCost = 2800;
		static from = [3010, 1026];
		static stats = {
			health: {
				flatBonus: 450
			},
			mana: {
				flatBonus: 450
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3028: class Item extends _Item { //Chalice of Harmony
		id = 3028;
		static goldCost = 1000;
		static from = [1004, 1033, 1004];
		static stats = {
			resist: {
				flatBonus: 25
			}
		};
	},
	3029: class Item extends _Item { //Rod of Ages (Crystal Scar)
		id = 3029;
		static goldCost = 2800;
		static from = [3010, 1026];
		static stats = {
			health: {
				flatBonus: 450
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3031: class Item extends _Item { //Infinity Edge
		id = 3031;
		static goldCost = 3800;
		static from = [1038, 1037, 1018];
		static stats = {
			attackDamage: {
				flatBonus: 80
			},
			crit: {
				flatBonus: 0.25
			}
		};
	},
	3035: class Item extends _Item { //Last Whisper
		id = 3035;
		static goldCost = 2300;
		static from = [1037, 1036];
		static stats = {
			attackDamage: {
				flatBonus: 40
			}
		};
	},
	3040: class Item extends _Item { //Seraph's Embrace
		id = 3040;
		static goldCost = 2700;
		static from = [3003];
		active = true;
		static stats = {
			health: {
				flatBonus: 1000
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3041: class Item extends _Item { //Mejai's Soulstealer
		id = 3041;
		static goldCost = 1400;
		static from = [1052];
		static stats = {
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	3042: class Item extends _Item { //Muramana
		id = 3042;
		static goldCost = 2200;
		static from = [3004];
		static stats = {
			health: {
				flatBonus: 1000
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	3043: class Item extends _Item { //Muramana
		id = 3043;
		static goldCost = 2200;
		static from = [3008];
		static stats = {
			health: {
				flatBonus: 1000
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	3044: class Item extends _Item { //Phage
		id = 3044;
		static goldCost = 1325;
		static from = [1028, 1036];
		static stats = {
			health: {
				flatBonus: 200
			},
			attackDamage: {
				flatBonus: 20
			}
		};
	},
	3046: class Item extends _Item { //Phantom Dancer
		id = 3046;
		static goldCost = 2800;
		static from = [1018, 3086, 1042];
		static stats = {
			moveSpeed: {
				percentBonus: 5
			},
			attackSpeed: {
				percentBonus: 50
			},
			crit: {
				flatBonus: 0.3
			}
		};
	},
	3047: class Item extends _Item { //Ninja Tabi
		id = 3047;
		static goldCost = 1000;
		static from = [1001, 1029];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3048: class Item extends _Item { //Seraph's Embrace
		id = 3048;
		static goldCost = 2700;
		static from = [3007];
		active = true;
		static stats = {
			health: {
				flatBonus: 1000
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3050: class Item extends _Item { //Zeke's Herald
		id = 3050;
		static goldCost = 2450;
		static from = [3067, 1053];
		static stats = {
			health: {
				flatBonus: 250
			}
		};
	},
	3056: class Item extends _Item { //Ohmwrecker
		id = 3056;
		static goldCost = 2600;
		static from = [2053, 3067];
		active = true;
		static stats = {
			health: {
				flatBonus: 300
			},
			armor: {
				flatBonus: 50
			}
		};
	},
	3057: class Item extends _Item { //Sheen
		id = 3057;
		static goldCost = 1200;
		static from = [1027, 1052];
		static stats = {
			mana: {
				flatBonus: 200
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	3060: class Item extends _Item { //Banner of Command
		id = 3060;
		static goldCost = 3000;
		static from = [3105, 3108];
		active = true;
		static stats = {
			health: {
				flatBonus: 200
			},
			abilityPower: {
				flatBonus: 60
			},
			resist: {
				flatBonus: 20
			}
		};
	},
	3065: class Item extends _Item { //Spirit Visage
		id = 3065;
		static goldCost = 2750;
		static from = [3211, 3067];
		static stats = {
			health: {
				flatBonus: 400
			},
			resist: {
				flatBonus: 55
			}
		};
	},
	3067: class Item extends _Item { //Kindlegem
		id = 3067;
		static goldCost = 850;
		static from = [1028];
		static stats = {
			health: {
				flatBonus: 200
			}
		};
	},
	3068: class Item extends _Item { //Sunfire Cape
		id = 3068;
		static goldCost = 2600;
		static from = [1031, 1011];
		static stats = {
			health: {
				flatBonus: 450
			},
			armor: {
				flatBonus: 45
			}
		};
	},
	3069: class Item extends _Item { //Talisman of Ascension
		id = 3069;
		static goldCost = 2100;
		static from = [3096, 3114];
		active = true;
	},
	3070: class Item extends _Item { //Tear of the Goddess
		id = 3070;
		static goldCost = 720;
		static from = [1027, 1004];
		static stats = {
			mana: {
				flatBonus: 250
			}
		};
	},
	3071: class Item extends _Item { //The Black Cleaver
		id = 3071;
		static goldCost = 3000;
		static from = [3134, 1028];
		static stats = {
			health: {
				flatBonus: 200
			},
			attackDamage: {
				flatBonus: 50
			}
		};
	},
	3072: class Item extends _Item { //The Bloodthirster
		id = 3072;
		static goldCost = 3500;
		static from = [1053, 1038];
		static stats = {
			attackDamage: {
				flatBonus: 80
			}
		};
	},
	3073: class Item extends _Item { //Tear of the Goddess (Crystal Scar)
		id = 3073;
		static goldCost = 720;
		static from = [1027, 1004];
		static stats = {
			mana: {
				flatBonus: 250
			}
		};
	},
	3074: class Item extends _Item { //Ravenous Hydra (Melee Only)
		id = 3074;
		static goldCost = 3300;
		static from = [3077, 1053];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 75
			},
			lifeSteal: {
				percentBonus: 12
			}
		};
	},
	3075: class Item extends _Item { //Thornmail
		id = 3075;
		static goldCost = 2100;
		static from = [1029, 1031];
		static stats = {
			armor: {
				flatBonus: 100
			}
		};
	},
	3077: class Item extends _Item { //Tiamat (Melee Only)
		id = 3077;
		static goldCost = 1900;
		static from = [1037, 1036, 1006, 1006];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 40
			}
		};
	},
	3078: class Item extends _Item { //Trinity Force
		id = 3078;
		static goldCost = 3703;
		static from = [3086, 3057, 3044];
		static stats = {
			health: {
				flatBonus: 250
			},
			mana: {
				flatBonus: 200
			},
			attackDamage: {
				flatBonus: 30
			},
			abilityPower: {
				flatBonus: 30
			},
			moveSpeed: {
				percentBonus: 8
			},
			attackSpeed: {
				percentBonus: 30
			},
			crit: {
				flatBonus: 0.1
			}
		};
	},
	3082: class Item extends _Item { //Warden's Mail
		id = 3082;
		static goldCost = 1050;
		static from = [1029, 1029];
		static stats = {
			armor: {
				flatBonus: 45
			}
		};
	},
	3083: class Item extends _Item { //Warmog's armor
		id = 3083;
		static goldCost = 2500;
		static from = [3801, 1011, 3801];
		static stats = {
			health: {
				flatBonus: 800
			}
		};
	},
	3084: class Item extends _Item { //Overlord's Bloodmail
		id = 3084;
		static goldCost = 2455;
		static from = [1011, 1028];
		static stats = {
			health: {
				flatBonus: 850
			}
		};
	},
	3085: class Item extends _Item { //Runaan's Hurricane (Ranged Only)
		id = 3085;
		static goldCost = 2400;
		static from = [1042, 1043, 1042];
		static stats = {
			attackSpeed: {
				percentBonus: 70
			}
		};
	},
	3086: class Item extends _Item { //Zeal
		id = 3086;
		static goldCost = 1100;
		static from = [1051, 1042];
		static stats = {
			moveSpeed: {
				percentBonus: 5
			},
			attackSpeed: {
				percentBonus: 20
			},
			crit: {
				flatBonus: 0.1
			}
		};
	},
	3087: class Item extends _Item { //Statikk Shiv
		id = 3087;
		static goldCost = 2500;
		static from = [3086, 3093];
		static stats = {
			moveSpeed: {
				percentBonus: 6
			},
			attackSpeed: {
				percentBonus: 40
			},
			crit: {
				flatBonus: 0.2
			}
		};
	},
	3089: class Item extends _Item { //Rabadon's Deathcap
		id = 3089;
		static goldCost = 3300;
		static from = [1026, 1058];
		static stats = {
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	3090: class Item extends _Item { //Wooglet's Witchcap
		id = 3090;
		static goldCost = 3540;
		static from = [3191, 1026, 1052];
		active = true;
		static stats = {
			armor: {
				flatBonus: 45
			},
			abilityPower: {
				flatBonus: 100
			}
		};
	},
	3091: class Item extends _Item { //Wit's End
		id = 3091;
		static goldCost = 2600;
		static from = [1043, 1033, 1042];
		static stats = {
			attackSpeed: {
				percentBonus: 50
			},
			resist: {
				flatBonus: 30
			}
		};
	},
	3092: class Item extends _Item { //Frost Queen's Claim
		id = 3092;
		static goldCost = 2200;
		static from = [3098, 3108];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	3093: class Item extends _Item { //Avarice Blade
		id = 3093;
		static goldCost = 800;
		static from = [1051];
		static stats = {
			crit: {
				flatBonus: 0.1
			}
		};
	},
	3096: class Item extends _Item { //Nomad's Medallion
		id = 3096;
		static goldCost = 865;
		static from = [3301];
		active = true;
	},
	3097: class Item extends _Item { //Targon's Brace
		id = 3097;
		static goldCost = 865;
		static from = [3302];
		static stats = {
			health: {
				flatBonus: 175
			}
		};
	},
	3098: class Item extends _Item { //Frostfang
		id = 3098;
		static goldCost = 865;
		static from = [3303];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 10
			}
		};
	},
	3100: class Item extends _Item { //Lich Bane
		id = 3100;
		static goldCost = 3000;
		static from = [3057, 3113];
		static stats = {
			mana: {
				flatBonus: 250
			},
			abilityPower: {
				flatBonus: 80
			},
			moveSpeed: {
				percentBonus: 5
			}
		};
	},
	3101: class Item extends _Item { //Stinger
		id = 3101;
		static goldCost = 1250;
		static from = [1042, 1042];
		static stats = {
			attackSpeed: {
				percentBonus: 40
			}
		};
	},
	3102: class Item extends _Item { //Banshee's Veil
		id = 3102;
		static goldCost = 2750;
		static from = [3211, 1028];
		static stats = {
			health: {
				flatBonus: 450
			},
			resist: {
				flatBonus: 55
			}
		};
	},
	3104: class Item extends _Item { //Lord Van Damm's Pillager
		id = 3104;
		static goldCost = 3800;
		static from = [3122, 1037, 1018];
		static stats = {
			attackDamage: {
				flatBonus: 80
			},
			crit: {
				flatBonus: 0.25
			}
		};
	},
	3105: class Item extends _Item { //Aegis of the Legion
		id = 3105;
		static goldCost = 1900;
		static from = [1028, 1033, 1006];
		static stats = {
			health: {
				flatBonus: 200
			},
			resist: {
				flatBonus: 20
			}
		};
	},
	3106: class Item extends _Item { //Madred's Razors
		id = 3106;
		static goldCost = 450;
		static from = [1042];
		static stats = {
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	3108: class Item extends _Item { //Fiendish Codex
		id = 3108;
		static goldCost = 820;
		static from = [1052];
		static stats = {
			abilityPower: {
				flatBonus: 30
			}
		};
	},
	3110: class Item extends _Item { //Frozen Heart
		id = 3110;
		static goldCost = 2450;
		static from = [3082, 3024];
		static stats = {
			mana: {
				flatBonus: 400
			},
			armor: {
				flatBonus: 100
			}
		};
	},
	3111: class Item extends _Item { //Mercury's Treads
		id = 3111;
		static goldCost = 1200;
		static from = [1001, 1033];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3112: class Item extends _Item { //Orb of Winter
		id = 3112;
		static goldCost = 2210;
		static from = [1006, 1006, 1033, 1033];
		static stats = {
			resist: {
				flatBonus: 70
			}
		};
	},
	3113: class Item extends _Item { //Aether Wisp
		id = 3113;
		static goldCost = 950;
		static from = [1052];
		static stats = {
			abilityPower: {
				flatBonus: 30
			}
		};
	},
	3114: class Item extends _Item { //Forbidden Idol
		id = 3114;
		static goldCost = 600;
		static from = [1004, 1004];
	},
	3115: class Item extends _Item { //Nashor's Tooth
		id = 3115;
		static goldCost = 2920;
		static from = [3101, 3108];
		static stats = {
			abilityPower: {
				flatBonus: 60
			},
			attackSpeed: {
				percentBonus: 50
			}
		};
	},
	3116: class Item extends _Item { //Rylai's Crystal Scepter
		id = 3116;
		static goldCost = 2900;
		static from = [1026, 1052, 1011];
		static stats = {
			health: {
				flatBonus: 400
			},
			abilityPower: {
				flatBonus: 100
			}
		};
	},
	3117: class Item extends _Item { //Boots of Mobility
		id = 3117;
		static goldCost = 800;
		static from = [1001];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3122: class Item extends _Item { //Wicked Hatchet
		id = 3122;
		static goldCost = 1200;
		static from = [1051, 1036];
		static stats = {
			attackDamage: {
				flatBonus: 20
			},
			crit: {
				flatBonus: 0.1
			}
		};
	},
	3123: class Item extends _Item { //Executioner's Calling
		id = 3123;
		static goldCost = 1900;
		static from = [3093, 1036];
		static stats = {
			attackDamage: {
				flatBonus: 25
			},
			crit: {
				flatBonus: 0.2
			}
		};
	},
	3124: class Item extends _Item { //Guinsoo's Rageblade
		id = 3124;
		static goldCost = 2600;
		static from = [1026, 1037];
		static stats = {
			attackDamage: {
				flatBonus: 30
			},
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	3128: class Item extends _Item { //Deathfire Grasp
		id = 3128;
		static goldCost = 3100;
		static from = [1058, 3108];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	3131: class Item extends _Item { //Sword of the Divine
		id = 3131;
		static goldCost = 2150;
		static from = [1043, 1042];
		active = true;
	},
	3134: class Item extends _Item { //The Brutalizer
		id = 3134;
		static goldCost = 1337;
		static from = [1036, 1036];
		static stats = {
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	3135: class Item extends _Item { //Void Staff
		id = 3135;
		static goldCost = 2295;
		static from = [1026, 1052];
		static stats = {
			abilityPower: {
				flatBonus: 70
			}
		};
	},
	3136: class Item extends _Item { //Haunting Guise
		id = 3136;
		static goldCost = 1485;
		static from = [1028, 1052];
		static stats = {
			health: {
				flatBonus: 200
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	3137: class Item extends _Item { //Dervish Blade
		id = 3137;
		static goldCost = 2700;
		static from = [3140, 3101];
		active = true;
		static stats = {
			attackSpeed: {
				percentBonus: 50
			},
			resist: {
				flatBonus: 45
			}
		};
	},
	3139: class Item extends _Item { //Mercurial Scimitar
		id = 3139;
		static goldCost = 3700;
		static from = [1038, 3140];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 80
			},
			resist: {
				flatBonus: 35
			}
		};
	},
	3140: class Item extends _Item { //Quicksilver Sash
		id = 3140;
		static goldCost = 1250;
		static from = [1033];
		active = true;
		static stats = {
			resist: {
				flatBonus: 30
			}
		};
	},
	3141: class Item extends _Item { //Sword of the Occult
		id = 3141;
		static goldCost = 1400;
		static from = [1036];
		static stats = {
			attackDamage: {
				flatBonus: 10
			}
		};
	},
	3142: class Item extends _Item { //Youmuu's Ghostblade
		id = 3142;
		static goldCost = 2700;
		static from = [3093, 3134];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 30
			},
			crit: {
				flatBonus: 0.15
			}
		};
	},
	3143: class Item extends _Item { //Randuin's Omen
		id = 3143;
		static goldCost = 2850;
		static from = [3082, 1011];
		active = true;
		static stats = {
			health: {
				flatBonus: 500
			},
			armor: {
				flatBonus: 70
			}
		};
	},
	3144: class Item extends _Item { //Bilgewater Cutlass
		id = 3144;
		static goldCost = 1400;
		static from = [1036, 1053];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 25
			},
			lifeSteal: {
				percentBonus: 8
			}
		};
	},
	3145: class Item extends _Item { //Hextech Revolver
		id = 3145;
		static goldCost = 1200;
		static from = [1052, 1052];
		static stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	3146: class Item extends _Item { //Hextech Gunblade
		id = 3146;
		static goldCost = 3400;
		static from = [3144, 3145];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 45
			},
			abilityPower: {
				flatBonus: 65
			},
			lifeSteal: {
				percentBonus: 12
			}
		};
	},
	3151: class Item extends _Item { //Liandry's Torment
		id = 3151;
		static goldCost = 2900;
		static from = [3136, 1052];
		static stats = {
			health: {
				flatBonus: 300
			},
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	3152: class Item extends _Item { //Will of the Ancients
		id = 3152;
		static goldCost = 2500;
		static from = [3145, 3108];
		static stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	3153: class Item extends _Item { //Blade of the Ruined King
		id = 3153;
		static goldCost = 3200;
		static from = [1042, 3144, 1042];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 25
			},
			attackSpeed: {
				percentBonus: 40
			},
			lifeSteal: {
				percentBonus: 10
			}
		};
	},
	3154: class Item extends _Item { //Wriggle's Lantern
		id = 3154;
		static goldCost = 1475;
		static from = [3106, 1036, 1042];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 12
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	3155: class Item extends _Item { //Hexdrinker
		id = 3155;
		static goldCost = 1450;
		static from = [1036, 1033];
		static stats = {
			attackDamage: {
				flatBonus: 25
			},
			resist: {
				flatBonus: 30
			}
		};
	},
	3156: class Item extends _Item { //Maw of Malmortius
		id = 3156;
		static goldCost = 3200;
		static from = [3155, 1037];
		static stats = {
			attackDamage: {
				flatBonus: 60
			},
			resist: {
				flatBonus: 40
			}
		};
	},
	3157: class Item extends _Item { //Zhonya's Hourglass
		id = 3157;
		static goldCost = 3300;
		static from = [3191, 1058];
		active = true;
		static stats = {
			armor: {
				flatBonus: 50
			},
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	3158: class Item extends _Item { //Ionian Boots of Lucidity
		id = 3158;
		static goldCost = 1000;
		static from = [1001];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3159: class Item extends _Item { //Grez's Spectral Lantern
		id = 3159;
		static goldCost = 1440;
		static from = [3106, 1036, 1042];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 15
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	3160: class Item extends _Item { //Feral Flare
		id = 3160;
		static goldCost = 1800;
		static from = [3154];
		static stats = {
			attackDamage: {
				flatBonus: 12
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	3165: class Item extends _Item { //Morellonomicon
		id = 3165;
		static goldCost = 2100;
		static from = [3108, 3114];
		static stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	3166: class Item extends _Item { //Bonetooth Necklace
		id = 3166;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3167: class Item extends _Item { //Bonetooth Necklace
		id = 3167;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3168: class Item extends _Item { //Bonetooth Necklace
		id = 3168;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3169: class Item extends _Item { //Bonetooth Necklace
		id = 3169;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3170: class Item extends _Item { //Moonflair Spellblade
		id = 3170;
		static goldCost = 2620;
		static from = [3191, 1033];
		static stats = {
			armor: {
				flatBonus: 50
			},
			abilityPower: {
				flatBonus: 50
			},
			resist: {
				flatBonus: 50
			}
		};
	},
	3171: class Item extends _Item { //Bonetooth Necklace
		id = 3171;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3172: class Item extends _Item { //Zephyr
		id = 3172;
		static goldCost = 2850;
		static from = [3101, 1037];
		static stats = {
			attackDamage: {
				flatBonus: 25
			},
			moveSpeed: {
				percentBonus: 10
			},
			attackSpeed: {
				percentBonus: 50
			}
		};
	},
	3174: class Item extends _Item { //Athene's Unholy Grail
		id = 3174;
		static goldCost = 2700;
		static from = [3108, 3028];
		static stats = {
			abilityPower: {
				flatBonus: 60
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3175: class Item extends _Item { //Head of Kha'Zix
		id = 3175;
		static goldCost = 0;
		static isTrinket = true;
		static from = [3169];
		active = true;
	},
	3180: class Item extends _Item { //Odyn's Veil
		id = 3180;
		static goldCost = 2500;
		static from = [1033, 3010];
		active = true;
		static stats = {
			health: {
				flatBonus: 350
			},
			resist: {
				flatBonus: 50
			}
		};
	},
	3181: class Item extends _Item { //Sanguine Blade
		id = 3181;
		static goldCost = 2275;
		static from = [1037, 1053];
		static stats = {
			attackDamage: {
				flatBonus: 45
			},
			lifeSteal: {
				percentBonus: 10
			}
		};
	},
	3184: class Item extends _Item { //Entropy
		id = 3184;
		static goldCost = 2700;
		static from = [3044, 1037];
		active = true;
		static stats = {
			health: {
				flatBonus: 275
			},
			attackDamage: {
				flatBonus: 55
			}
		};
	},
	3185: class Item extends _Item { //The Lightbringer
		id = 3185;
		static goldCost = 2280;
		static from = [3122, 1018];
		active = true;
		static stats = {
			attackDamage: {
				flatBonus: 30
			},
			crit: {
				flatBonus: 0.3
			}
		};
	},
	3187: class Item extends _Item { //Hextech Sweeper
		id = 3187;
		static goldCost = 2130;
		static from = [3024, 3067];
		active = true;
		static stats = {
			health: {
				flatBonus: 225
			},
			armor: {
				flatBonus: 25
			}
		};
	},
	3188: class Item extends _Item { //Blackfire Torch
		id = 3188;
		static goldCost = 2650;
		static from = [1026, 3108];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	3190: class Item extends _Item { //Locket of the Iron Solari
		id = 3190;
		static goldCost = 2800;
		static from = [3105, 3067];
		active = true;
		static stats = {
			health: {
				flatBonus: 400
			},
			resist: {
				flatBonus: 20
			}
		};
	},
	3191: class Item extends _Item { //Seeker's Armguard
		id = 3191;
		static goldCost = 1200;
		static from = [1029, 1052];
		static stats = {
			armor: {
				flatBonus: 30
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	3196: class Item extends _Item { //The Hex Core mk-1
		id = 3196;
		static goldCost = 1000;
		static from = [3200];
		static stats = {
			health: {
				flatBonus: 150
			},
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	3197: class Item extends _Item { //The Hex Core mk-2
		id = 3197;
		static goldCost = 2000;
		static from = [3196];
		static stats = {
			health: {
				flatBonus: 300
			},
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	3198: class Item extends _Item { //Perfect Hex Core
		id = 3198;
		static goldCost = 3000;
		static from = [3197];
		static stats = {
			health: {
				flatBonus: 500
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	3200: class Item extends _Item { //Prototype Hex Core
		id = 3200;
		static goldCost = 0;
	},
	3204: class Item extends _Item { //Quill Coat
		id = 3204;
		static goldCost = 775;
		static from = [1039, 1029];
		active = true;
		static stats = {
			armor: {
				flatBonus: 20
			}
		};
	},
	3205: class Item extends _Item { //Quill Coat
		id = 3205;
		static goldCost = 775;
		static from = [1039, 1029];
		active = true;
		static stats = {
			armor: {
				flatBonus: 20
			}
		};
	},
	3206: class Item extends _Item { //Spirit of the Spectral Wraith
		id = 3206;
		static goldCost = 2075;
		static from = [1080, 3108];
		static stats = {
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	3207: class Item extends _Item { //Spirit of the Ancient Golem
		id = 3207;
		static goldCost = 2075;
		static from = [3205, 3067];
		active = true;
		static stats = {
			health: {
				flatBonus: 200
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	3208: class Item extends _Item { //Spirit of the Ancient Golem
		id = 3208;
		static goldCost = 2075;
		static from = [3204, 3067];
		active = true;
		static stats = {
			health: {
				flatBonus: 200
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	3209: class Item extends _Item { //Spirit of the Elder Lizard
		id = 3209;
		static goldCost = 2075;
		static from = [1080, 1036, 1036];
		static stats = {
			attackDamage: {
				flatBonus: 30
			}
		};
	},
	3211: class Item extends _Item { //Spectre's Cowl
		id = 3211;
		static goldCost = 1200;
		static from = [1028, 1033];
		static stats = {
			health: {
				flatBonus: 200
			},
			resist: {
				flatBonus: 35
			}
		};
	},
	3222: class Item extends _Item { //Mikael's Crucible
		id = 3222;
		static goldCost = 2450;
		static from = [3028, 3114];
		active = true;
		static stats = {
			resist: {
				flatBonus: 40
			}
		};
	},
	3250: class Item extends _Item { //Enchantment: Homeguard
		id = 3250;
		static goldCost = 1475;
		static from = [3006];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3251: class Item extends _Item { //Enchantment: Captain
		id = 3251;
		static goldCost = 1600;
		static from = [3006];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3252: class Item extends _Item { //Enchantment: Furor
		id = 3252;
		static goldCost = 1475;
		static from = [3006];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3253: class Item extends _Item { //Enchantment: Distortion
		id = 3253;
		static goldCost = 1475;
		static from = [3006];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3254: class Item extends _Item { //Enchantment: Alacrity
		id = 3254;
		static goldCost = 1475;
		static from = [3006];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	3255: class Item extends _Item { //Enchantment: Homeguard
		id = 3255;
		static goldCost = 1575;
		static from = [3020];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3256: class Item extends _Item { //Enchantment: Captain
		id = 3256;
		static goldCost = 1700;
		static from = [3020];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3257: class Item extends _Item { //Enchantment: Furor
		id = 3257;
		static goldCost = 1575;
		static from = [3020];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3258: class Item extends _Item { //Enchantment: Distortion
		id = 3258;
		static goldCost = 1575;
		static from = [3020];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3259: class Item extends _Item { //Enchantment: Alacrity
		id = 3259;
		static goldCost = 1575;
		static from = [3020];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3260: class Item extends _Item { //Enchantment: Homeguard
		id = 3260;
		static goldCost = 1475;
		static from = [3047];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3261: class Item extends _Item { //Enchantment: Captain
		id = 3261;
		static goldCost = 1600;
		static from = [3047];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3262: class Item extends _Item { //Enchantment: Furor
		id = 3262;
		static goldCost = 1475;
		static from = [3047];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3263: class Item extends _Item { //Enchantment: Distortion
		id = 3263;
		static goldCost = 1475;
		static from = [3047];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3264: class Item extends _Item { //Enchantment: Alacrity
		id = 3264;
		static goldCost = 1475;
		static from = [3047];
		static stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3265: class Item extends _Item { //Enchantment: Homeguard
		id = 3265;
		static goldCost = 1675;
		static from = [3111];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3266: class Item extends _Item { //Enchantment: Captain
		id = 3266;
		static goldCost = 1800;
		static from = [3111];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3267: class Item extends _Item { //Enchantment: Furor
		id = 3267;
		static goldCost = 1675;
		static from = [3111];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3268: class Item extends _Item { //Enchantment: Distortion
		id = 3268;
		static goldCost = 1675;
		static from = [3111];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3269: class Item extends _Item { //Enchantment: Alacrity
		id = 3269;
		static goldCost = 1675;
		static from = [3111];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	3270: class Item extends _Item { //Enchantment: Homeguard
		id = 3270;
		static goldCost = 1275;
		static from = [3117];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3271: class Item extends _Item { //Enchantment: Captain
		id = 3271;
		static goldCost = 1400;
		static from = [3117];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3272: class Item extends _Item { //Enchantment: Furor
		id = 3272;
		static goldCost = 1275;
		static from = [3117];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3273: class Item extends _Item { //Enchantment: Distortion
		id = 3273;
		static goldCost = 1275;
		static from = [3117];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3274: class Item extends _Item { //Enchantment: Alacrity
		id = 3274;
		static goldCost = 1275;
		static from = [3117];
		static stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	3275: class Item extends _Item { //Enchantment: Homeguard
		id = 3275;
		static goldCost = 1475;
		static from = [3158];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3276: class Item extends _Item { //Enchantment: Captain
		id = 3276;
		static goldCost = 1600;
		static from = [3158];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3277: class Item extends _Item { //Enchantment: Furor
		id = 3277;
		static goldCost = 1475;
		static from = [3158];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3278: class Item extends _Item { //Enchantment: Distortion
		id = 3278;
		static goldCost = 1475;
		static from = [3158];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3279: class Item extends _Item { //Enchantment: Alacrity
		id = 3279;
		static goldCost = 1475;
		static from = [3158];
		static stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	3280: class Item extends _Item { //Enchantment: Homeguard
		id = 3280;
		static goldCost = 1475;
		static from = [3009];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3281: class Item extends _Item { //Enchantment: Captain
		id = 3281;
		static goldCost = 1600;
		static from = [3009];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3282: class Item extends _Item { //Enchantment: Furor
		id = 3282;
		static goldCost = 1475;
		static from = [3009];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3283: class Item extends _Item { //Enchantment: Distortion
		id = 3283;
		static goldCost = 1475;
		static from = [3009];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3284: class Item extends _Item { //Enchantment: Alacrity
		id = 3284;
		static goldCost = 1475;
		static from = [3009];
		static stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	3290: class Item extends _Item { //Twin Shadows
		id = 3290;
		static goldCost = 2400;
		static from = [3108, 3113];
		active = true;
		static stats = {
			abilityPower: {
				flatBonus: 80
			},
			moveSpeed: {
				percentBonus: 6
			}
		};
	},
	3301: class Item extends _Item { //Ancient Coin
		id = 3301;
		static goldCost = 365;
	},
	3302: class Item extends _Item { //Relic Shield
		id = 3302;
		static goldCost = 365;
		static stats = {
			health: {
				flatBonus: 75
			}
		};
	},
	3303: class Item extends _Item { //Spellthief's Edge
		id = 3303;
		static goldCost = 365;
		static stats = {
			abilityPower: {
				flatBonus: 5
			}
		};
	},
	3340: class Item extends _Item { //Warding Totem (Trinket)
		id = 3340;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3341: class Item extends _Item { //Sweeping Lens (Trinket)
		id = 3341;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3342: class Item extends _Item { //Scrying Orb (Trinket)
		id = 3342;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3345: class Item extends _Item { //Soul Anchor (Trinket)
		id = 3345;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3361: class Item extends _Item { //Greater Stealth Totem (Trinket)
		id = 3361;
		static goldCost = 475;
		static isTrinket = true;
		static from = [3340];
		active = true;
	},
	3362: class Item extends _Item { //Greater Vision Totem (Trinket)
		id = 3362;
		static goldCost = 475;
		static isTrinket = true;
		static from = [3340];
		active = true;
	},
	3363: class Item extends _Item { //Farsight Orb (Trinket)
		id = 3363;
		static goldCost = 475;
		static isTrinket = true;
		static from = [3342];
		active = true;
	},
	3364: class Item extends _Item { //Oracle's Lens (Trinket)
		id = 3364;
		static goldCost = 475;
		static isTrinket = true;
		static from = [3341];
		active = true;
	},
	3401: class Item extends _Item { //Face of the Mountain
		id = 3401;
		static goldCost = 2200;
		static from = [3097, 3067];
		static stats = {
			health: {
				flatBonus: 500
			}
		};
	},
	3405: class Item extends _Item { //Bonetooth Necklace
		id = 3405;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3406: class Item extends _Item { //Bonetooth Necklace
		id = 3406;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3407: class Item extends _Item { //Bonetooth Necklace
		id = 3407;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3408: class Item extends _Item { //Bonetooth Necklace
		id = 3408;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3409: class Item extends _Item { //Bonetooth Necklace
		id = 3409;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3410: class Item extends _Item { //Head of Kha'Zix
		id = 3410;
		static goldCost = 0;
		static isTrinket = true;
		static from = [3169];
		active = true;
	},
	3411: class Item extends _Item { //Bonetooth Necklace
		id = 3411;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3412: class Item extends _Item { //Bonetooth Necklace
		id = 3412;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3413: class Item extends _Item { //Bonetooth Necklace
		id = 3413;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3414: class Item extends _Item { //Bonetooth Necklace
		id = 3414;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3415: class Item extends _Item { //Bonetooth Necklace
		id = 3415;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3416: class Item extends _Item { //Head of Kha'Zix
		id = 3416;
		static goldCost = 0;
		static isTrinket = true;
		static from = [3169];
		active = true;
	},
	3417: class Item extends _Item { //Bonetooth Necklace
		id = 3417;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3418: class Item extends _Item { //Bonetooth Necklace
		id = 3418;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3419: class Item extends _Item { //Bonetooth Necklace
		id = 3419;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3420: class Item extends _Item { //Bonetooth Necklace
		id = 3420;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3421: class Item extends _Item { //Bonetooth Necklace
		id = 3421;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3422: class Item extends _Item { //Head of Kha'Zix
		id = 3422;
		static goldCost = 0;
		static isTrinket = true;
		static from = [3169];
		active = true;
	},
	3450: class Item extends _Item { //Bonetooth Necklace
		id = 3450;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3451: class Item extends _Item { //Bonetooth Necklace
		id = 3451;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3452: class Item extends _Item { //Bonetooth Necklace
		id = 3452;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3453: class Item extends _Item { //Bonetooth Necklace
		id = 3453;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3454: class Item extends _Item { //Bonetooth Necklace
		id = 3454;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3455: class Item extends _Item { //Head of Kha'Zix
		id = 3455;
		static goldCost = 0;
		static isTrinket = true;
		static from = [3169];
		active = true;
	},
	3460: class Item extends _Item { //Golden Transcendence
		id = 3460;
		static goldCost = 0;
		static isTrinket = true;
		active = true;
	},
	3504: class Item extends _Item { //Ardent Censer
		id = 3504;
		static goldCost = 2100;
		static from = [3114, 3113];
		static stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	3508: class Item extends _Item { //Essence Reaver
		id = 3508;
		static goldCost = 3200;
		static from = [1053, 1038];
		static stats = {
			attackDamage: {
				flatBonus: 80
			},
			lifeSteal: {
				percentBonus: 10
			}
		};
	},
	3599: class Item extends _Item { //The Black Spear
		id = 3599;
		static goldCost = 0;
		active = true;
	},
	3706: class Item extends _Item { //Stalker's Blade
		id = 3706;
		static goldCost = 750;
		static from = [1039];
	},
	3707: class Item extends _Item { //Enchantment: Warrior
		id = 3707;
		static goldCost = 2250;
		static from = [3706, 3134];
	},
	3708: class Item extends _Item { //Enchantment: Magus
		id = 3708;
		static goldCost = 2250;
		static from = [3706, 3108];
	},
	3709: class Item extends _Item { //Enchantment: Juggernaut
		id = 3709;
		static goldCost = 2250;
		static from = [3706, 3067, 1028];
	},
	3710: class Item extends _Item { //Enchantment: Devourer
		id = 3710;
		static goldCost = 2250;
		static from = [3706, 1042, 1042];
	},
	3711: class Item extends _Item { //Poacher's Knife
		id = 3711;
		static goldCost = 750;
		static from = [1039];
	},
	3713: class Item extends _Item { //Ranger's Trailblazer
		id = 3713;
		static goldCost = 750;
		static from = [1039];
	},
	3714: class Item extends _Item { //Enchantment: Warrior
		id = 3714;
		static goldCost = 2250;
		static from = [3715, 3134];
	},
	3715: class Item extends _Item { //Skirmisher's Sabre
		id = 3715;
		static goldCost = 750;
		static from = [1039];
	},
	3716: class Item extends _Item { //Enchantment: Magus
		id = 3716;
		static goldCost = 2250;
		static from = [3715, 3108];
	},
	3717: class Item extends _Item { //Enchantment: Juggernaut
		id = 3717;
		static goldCost = 2250;
		static from = [3715, 3067, 1028];
	},
	3718: class Item extends _Item { //Enchantment: Devourer
		id = 3718;
		static goldCost = 2250;
		static from = [3715, 1042, 1042];
	},
	3719: class Item extends _Item { //Enchantment: Warrior
		id = 3719;
		static goldCost = 2250;
		static from = [3711, 3134];
	},
	3720: class Item extends _Item { //Enchantment: Magus
		id = 3720;
		static goldCost = 2250;
		static from = [3711, 3108];
	},
	3721: class Item extends _Item { //Enchantment: Juggernaut
		id = 3721;
		static goldCost = 2250;
		static from = [3711, 3067, 1028];
	},
	3722: class Item extends _Item { //Enchantment: Devourer
		id = 3722;
		static goldCost = 2250;
		static from = [3711, 1042, 1042];
	},
	3723: class Item extends _Item { //Enchantment: Warrior
		id = 3723;
		static goldCost = 2250;
		static from = [3713, 3134];
	},
	3724: class Item extends _Item { //Enchantment: Magus
		id = 3724;
		static goldCost = 2250;
		static from = [3713, 3108];
	},
	3725: class Item extends _Item { //Enchantment: Juggernaut
		id = 3725;
		static goldCost = 2250;
		static from = [3713, 3067, 1028];
	},
	3726: class Item extends _Item { //Enchantment: Devourer
		id = 3726;
		static goldCost = 2250;
		static from = [3713, 1042, 1042];
	},
	3800: class Item extends _Item { //Righteous Glory
		id = 3800;
		static goldCost = 2500;
		static from = [3010, 3801];
		active = true;
		static stats = {
			health: {
				flatBonus: 500
			},
			mana: {
				flatBonus: 300
			}
		};
	},
	3801: class Item extends _Item { //Crystalline Bracer
		id = 3801;
		static goldCost = 600;
		static from = [1028, 1006];
		static stats = {
			health: {
				flatBonus: 200
			}
		};
	}
};

export default ItemList;
