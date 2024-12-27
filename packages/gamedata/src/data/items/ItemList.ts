import _Item from '@repo/gameserver/src/game/basedata/item';

const ItemList1 = [
	class Item extends _Item { //Boots of Speed
		itemId = 1001;
		price = 325;
		stats = {
			moveSpeed: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Faerie Charm
		itemId = 1004;
		price = 180;
	},
	class Item extends _Item { //Rejuvenation Bead
		itemId = 1006;
		price = 180;
	},
	class Item extends _Item { //Giant's Belt
		itemId = 1011;
		price = 1000;
		stats = {
			health: {
				flatBonus: 380
			}
		};
	},
	class Item extends _Item { //Cloak of Agility
		itemId = 1018;
		price = 730;
		stats = {
			crit: {
				flatBonus: 0.15
			}
		};
	},
	class Item extends _Item { //Blasting Wand
		itemId = 1026;
		price = 860;
		stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Sapphire Crystal
		itemId = 1027;
		price = 400;
		stats = {
			mana: {
				flatBonus: 200
			}
		};
	},
	class Item extends _Item { //Ruby Crystal
		itemId = 1028;
		price = 400;
		stats = {
			health: {
				flatBonus: 150
			}
		};
	},
	class Item extends _Item { //Cloth armor
		itemId = 1029;
		price = 300;
		stats = {
			armor: {
				flatBonus: 15
			}
		};
	},
	class Item extends _Item { //Chain Vest
		itemId = 1031;
		price = 750;
		from = [1029];
		stats = {
			armor: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Null-Magic Mantle
		itemId = 1033;
		price = 500;
		stats = {
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Long Sword
		itemId = 1036;
		price = 360;
		stats = {
			attackDamage: {
				flatBonus: 10
			}
		};
	},
	class Item extends _Item { //Pickaxe
		itemId = 1037;
		price = 875;
		stats = {
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //B. F. Sword
		itemId = 1038;
		price = 1550;
		stats = {
			attackDamage: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Hunter's Machete
		itemId = 1039;
		price = 400;
	},
	class Item extends _Item { //Dagger
		itemId = 1042;
		price = 450;
		stats = {
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	class Item extends _Item { //Recurve Bow
		itemId = 1043;
		price = 900;
		stats = {
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	class Item extends _Item { //Brawler's Gloves
		itemId = 1051;
		price = 400;
		stats = {
			crit: {
				flatBonus: 0.08
			}
		};
	},
	class Item extends _Item { //Amplifying Tome
		itemId = 1052;
		price = 435;
		stats = {
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Vampiric Scepter
		itemId = 1053;
		price = 800;
		from = [1036];
		stats = {
			attackDamage: {
				flatBonus: 10
			},
			lifeSteal: {
				percentBonus: 8
			}
		};
	},
	class Item extends _Item { //Doran's Shield
		itemId = 1054;
		price = 440;
		stats = {
			health: {
				flatBonus: 80
			},
			healthRegen: {
				flatBonus: 1.2
			}
		};
	},
	class Item extends _Item { //Doran's Blade
		itemId = 1055;
		price = 440;
		stats = {
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
	class Item extends _Item { //Doran's Ring
		itemId = 1056;
		price = 400;
		stats = {
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
	class Item extends _Item { //Needlessly Large Rod
		itemId = 1058;
		price = 1600;
		stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	class Item extends _Item { //Prospector's Blade
		itemId = 1062;
		price = 950;
		stats = {
			attackDamage: {
				flatBonus: 16
			},
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	class Item extends _Item { //Prospector's Ring
		itemId = 1063;
		price = 950;
		stats = {
			manaRegen: {
				flatBonus: 1.2
			},
			abilityPower: {
				flatBonus: 35
			}
		};
	},
	class Item extends _Item { //Doran's Shield (Showdown)
		itemId = 1074;
		price = 440;
		stats = {
			health: {
				flatBonus: 100
			},
			healthRegen: {
				flatBonus: 2
			}
		};
	},
	class Item extends _Item { //Doran's Blade (Showdown)
		itemId = 1075;
		price = 440;
		stats = {
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
	class Item extends _Item { //Doran's Ring (Showdown)
		itemId = 1076;
		price = 400;
		stats = {
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
	class Item extends _Item { //Spirit Stone
		itemId = 1080;
		price = 775;
		from = [1039, 1004, 1006];
	},
	class Item extends _Item { //Health Potion
		itemId = 2003;
		price = 35;
		consumable = true;
		maxStack = 5;
	},
	class Item extends _Item { //Mana Potion
		itemId = 2004;
		price = 35;
		consumable = true;
		maxStack = 5;
	},
	class Item extends _Item { //Total Biscuit of Rejuvenation
		itemId = 2009;
		price = 0;
	},
	class Item extends _Item { //Total Biscuit of Rejuvenation
		itemId = 2010;
		price = 35;
		maxStack = 5;
	},
	class Item extends _Item { //Elixir of Fortitude
		itemId = 2037;
		price = 350;
		consumable = true;
		maxStack = 3;
	},
	class Item extends _Item { //Elixir of Brilliance
		itemId = 2039;
		price = 250;
		consumable = true;
		maxStack = 3;
	},
	class Item extends _Item { //Ichor of Rage
		itemId = 2040;
		price = 500;
		consumable = true;
		maxStack = 3;
	},
	class Item extends _Item { //Crystalline Flask
		itemId = 2041;
		price = 345;
		consumable = true;
		active = true;
	},
	class Item extends _Item { //Vision Ward
		itemId = 2043;
		price = 100;
		consumable = true;
		maxStack = 2;
	},
	class Item extends _Item { //Stealth Ward
		itemId = 2044;
		price = 75;
		consumable = true;
		maxStack = 3;
	},
	class Item extends _Item { //Ruby Sightstone
		itemId = 2045;
		price = 1600;
		from = [2049, 1028];
		active = true;
		stats = {
			health: {
				flatBonus: 400
			}
		};
	},
	class Item extends _Item { //Oracle's Extract
		itemId = 2047;
		price = 250;
		consumable = true;
	},
	class Item extends _Item { //Ichor of Illumination
		itemId = 2048;
		price = 500;
		consumable = true;
		maxStack = 3;
	},
	class Item extends _Item { //Sightstone
		itemId = 2049;
		price = 800;
		from = [1028];
		active = true;
		stats = {
			health: {
				flatBonus: 150
			}
		};
	},
	class Item extends _Item { //Explorer's Ward
		itemId = 2050;
		price = 0;
		consumable = true;
	},
	class Item extends _Item { //Guardian's Horn
		itemId = 2051;
		price = 1025;
		from = [1006, 1028];
		active = true;
		stats = {
			health: {
				flatBonus: 180
			}
		};
	},
	class Item extends _Item { //Poro-Snax
		itemId = 2052;
		price = 0;
	},
	class Item extends _Item { //Raptor Cloak
		itemId = 2053;
		price = 1000;
		from = [1006, 1029];
		stats = {
			armor: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Elixir of Ruin
		itemId = 2137;
		price = 400;
		consumable = true;
	},
	class Item extends _Item { //Elixir of Iron
		itemId = 2138;
		price = 400;
		consumable = true;
	},
	class Item extends _Item { //Elixir of Sorcery
		itemId = 2139;
		price = 400;
		consumable = true;
	},
	class Item extends _Item { //Elixir of Wrath
		itemId = 2140;
		price = 400;
		consumable = true;
	},
	class Item extends _Item { //Abyssal Scepter
		itemId = 3001;
		price = 2440;
		from = [1026, 1033, 1033];
		stats = {
			abilityPower: {
				flatBonus: 70
			},
			resist: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Archangel's Staff
		itemId = 3003;
		price = 2700;
		from = [3070, 1026];
		stats = {
			mana: {
				flatBonus: 250
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Manamune
		itemId = 3004;
		price = 2200;
		from = [3070, 1037];
		stats = {
			mana: {
				flatBonus: 250
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Atma's Impaler
		itemId = 3005;
		price = 2250;
		from = [1031, 3093];
		stats = {
			armor: {
				flatBonus: 45
			},
			crit: {
				flatBonus: 0.15
			}
		};
	},
	class Item extends _Item { //Berserker's Greaves
		itemId = 3006;
		price = 1000;
		from = [1001, 1042];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Archangel's Staff (Crystal Scar)
		itemId = 3007;
		price = 2700;
		from = [3073, 1026];
		stats = {
			health: {
				flatBonus: 250
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Manamune (Crystal Scar)
		itemId = 3008;
		price = 2200;
		from = [3073, 1037];
		stats = {
			health: {
				flatBonus: 250
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Boots of Swiftness
		itemId = 3009;
		price = 1000;
		from = [1001];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Catalyst the Protector
		itemId = 3010;
		price = 1200;
		from = [1028, 1027];
		stats = {
			health: {
				flatBonus: 200
			},
			mana: {
				flatBonus: 300
			}
		};
	},
	class Item extends _Item { //Sorcerer's Shoes
		itemId = 3020;
		price = 1100;
		from = [1001];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Frozen Mallet
		itemId = 3022;
		price = 3300;
		from = [1028, 1011, 1037];
		stats = {
			health: {
				flatBonus: 700
			},
			attackDamage: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Twin Shadows
		itemId = 3023;
		price = 2400;
		from = [3108, 3113];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 80
			},
			moveSpeed: {
				percentBonus: 6
			}
		};
	},
	class Item extends _Item { //Glacial Shroud
		itemId = 3024;
		price = 950;
		from = [1027, 1029];
		stats = {
			mana: {
				flatBonus: 250
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Iceborn Gauntlet
		itemId = 3025;
		price = 2900;
		from = [3057, 3024];
		stats = {
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
	class Item extends _Item { //Guardian Angel
		itemId = 3026;
		price = 2750;
		from = [1033, 1031];
		stats = {
			armor: {
				flatBonus: 50
			},
			resist: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Rod of Ages
		itemId = 3027;
		price = 2800;
		from = [3010, 1026];
		stats = {
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
	class Item extends _Item { //Chalice of Harmony
		itemId = 3028;
		price = 1000;
		from = [1004, 1033, 1004];
		stats = {
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Rod of Ages (Crystal Scar)
		itemId = 3029;
		price = 2800;
		from = [3010, 1026];
		stats = {
			health: {
				flatBonus: 450
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Infinity Edge
		itemId = 3031;
		price = 3800;
		from = [1038, 1037, 1018];
		stats = {
			attackDamage: {
				flatBonus: 80
			},
			crit: {
				flatBonus: 0.25
			}
		};
	},
	class Item extends _Item { //Last Whisper
		itemId = 3035;
		price = 2300;
		from = [1037, 1036];
		stats = {
			attackDamage: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Seraph's Embrace
		itemId = 3040;
		price = 2700;
		from = [3003];
		active = true;
		stats = {
			health: {
				flatBonus: 1000
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Mejai's Soulstealer
		itemId = 3041;
		price = 1400;
		from = [1052];
		stats = {
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Muramana
		itemId = 3042;
		price = 2200;
		from = [3004];
		stats = {
			health: {
				flatBonus: 1000
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Muramana
		itemId = 3043;
		price = 2200;
		from = [3008];
		stats = {
			health: {
				flatBonus: 1000
			},
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Phage
		itemId = 3044;
		price = 1325;
		from = [1028, 1036];
		stats = {
			health: {
				flatBonus: 200
			},
			attackDamage: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Phantom Dancer
		itemId = 3046;
		price = 2800;
		from = [1018, 3086, 1042];
		stats = {
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
	class Item extends _Item { //Ninja Tabi
		itemId = 3047;
		price = 1000;
		from = [1001, 1029];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Seraph's Embrace
		itemId = 3048;
		price = 2700;
		from = [3007];
		active = true;
		stats = {
			health: {
				flatBonus: 1000
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Zeke's Herald
		itemId = 3050;
		price = 2450;
		from = [3067, 1053];
		stats = {
			health: {
				flatBonus: 250
			}
		};
	},
	class Item extends _Item { //Ohmwrecker
		itemId = 3056;
		price = 2600;
		from = [2053, 3067];
		active = true;
		stats = {
			health: {
				flatBonus: 300
			},
			armor: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Sheen
		itemId = 3057;
		price = 1200;
		from = [1027, 1052];
		stats = {
			mana: {
				flatBonus: 200
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Banner of Command
		itemId = 3060;
		price = 3000;
		from = [3105, 3108];
		active = true;
		stats = {
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
	class Item extends _Item { //Spirit Visage
		itemId = 3065;
		price = 2750;
		from = [3211, 3067];
		stats = {
			health: {
				flatBonus: 400
			},
			resist: {
				flatBonus: 55
			}
		};
	},
	class Item extends _Item { //Kindlegem
		itemId = 3067;
		price = 850;
		from = [1028];
		stats = {
			health: {
				flatBonus: 200
			}
		};
	},
	class Item extends _Item { //Sunfire Cape
		itemId = 3068;
		price = 2600;
		from = [1031, 1011];
		stats = {
			health: {
				flatBonus: 450
			},
			armor: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Talisman of Ascension
		itemId = 3069;
		price = 2100;
		from = [3096, 3114];
		active = true;
	},
	class Item extends _Item { //Tear of the Goddess
		itemId = 3070;
		price = 720;
		from = [1027, 1004];
		stats = {
			mana: {
				flatBonus: 250
			}
		};
	},
	class Item extends _Item { //The Black Cleaver
		itemId = 3071;
		price = 3000;
		from = [3134, 1028];
		stats = {
			health: {
				flatBonus: 200
			},
			attackDamage: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //The Bloodthirster
		itemId = 3072;
		price = 3500;
		from = [1053, 1038];
		stats = {
			attackDamage: {
				flatBonus: 80
			}
		};
	},
	class Item extends _Item { //Tear of the Goddess (Crystal Scar)
		itemId = 3073;
		price = 720;
		from = [1027, 1004];
		stats = {
			mana: {
				flatBonus: 250
			}
		};
	},
	class Item extends _Item { //Ravenous Hydra (Melee Only)
		itemId = 3074;
		price = 3300;
		from = [3077, 1053];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 75
			},
			lifeSteal: {
				percentBonus: 12
			}
		};
	},
	class Item extends _Item { //Thornmail
		itemId = 3075;
		price = 2100;
		from = [1029, 1031];
		stats = {
			armor: {
				flatBonus: 100
			}
		};
	},
	class Item extends _Item { //Tiamat (Melee Only)
		itemId = 3077;
		price = 1900;
		from = [1037, 1036, 1006, 1006];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Trinity Force
		itemId = 3078;
		price = 3703;
		from = [3086, 3057, 3044];
		stats = {
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
	class Item extends _Item { //Warden's Mail
		itemId = 3082;
		price = 1050;
		from = [1029, 1029];
		stats = {
			armor: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Warmog's armor
		itemId = 3083;
		price = 2500;
		from = [3801, 1011, 3801];
		stats = {
			health: {
				flatBonus: 800
			}
		};
	},
	class Item extends _Item { //Overlord's Bloodmail
		itemId = 3084;
		price = 2455;
		from = [1011, 1028];
		stats = {
			health: {
				flatBonus: 850
			}
		};
	},
	class Item extends _Item { //Runaan's Hurricane (Ranged Only)
		itemId = 3085;
		price = 2400;
		from = [1042, 1043, 1042];
		stats = {
			attackSpeed: {
				percentBonus: 70
			}
		};
	},
	class Item extends _Item { //Zeal
		itemId = 3086;
		price = 1100;
		from = [1051, 1042];
		stats = {
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
	class Item extends _Item { //Statikk Shiv
		itemId = 3087;
		price = 2500;
		from = [3086, 3093];
		stats = {
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
	class Item extends _Item { //Rabadon's Deathcap
		itemId = 3089;
		price = 3300;
		from = [1026, 1058];
		stats = {
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	class Item extends _Item { //Wooglet's Witchcap
		itemId = 3090;
		price = 3540;
		from = [3191, 1026, 1052];
		active = true;
		stats = {
			armor: {
				flatBonus: 45
			},
			abilityPower: {
				flatBonus: 100
			}
		};
	},
	class Item extends _Item { //Wit's End
		itemId = 3091;
		price = 2600;
		from = [1043, 1033, 1042];
		stats = {
			attackSpeed: {
				percentBonus: 50
			},
			resist: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Frost Queen's Claim
		itemId = 3092;
		price = 2200;
		from = [3098, 3108];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Avarice Blade
		itemId = 3093;
		price = 800;
		from = [1051];
		stats = {
			crit: {
				flatBonus: 0.1
			}
		};
	},
	class Item extends _Item { //Nomad's Medallion
		itemId = 3096;
		price = 865;
		from = [3301];
		active = true;
	},
	class Item extends _Item { //Targon's Brace
		itemId = 3097;
		price = 865;
		from = [3302];
		stats = {
			health: {
				flatBonus: 175
			}
		};
	},
	class Item extends _Item { //Frostfang
		itemId = 3098;
		price = 865;
		from = [3303];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 10
			}
		};
	},
	class Item extends _Item { //Lich Bane
		itemId = 3100;
		price = 3000;
		from = [3057, 3113];
		stats = {
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
	class Item extends _Item { //Stinger
		itemId = 3101;
		price = 1250;
		from = [1042, 1042];
		stats = {
			attackSpeed: {
				percentBonus: 40
			}
		};
	},
	class Item extends _Item { //Banshee's Veil
		itemId = 3102;
		price = 2750;
		from = [3211, 1028];
		stats = {
			health: {
				flatBonus: 450
			},
			resist: {
				flatBonus: 55
			}
		};
	},
	class Item extends _Item { //Lord Van Damm's Pillager
		itemId = 3104;
		price = 3800;
		from = [3122, 1037, 1018];
		stats = {
			attackDamage: {
				flatBonus: 80
			},
			crit: {
				flatBonus: 0.25
			}
		};
	},
	class Item extends _Item { //Aegis of the Legion
		itemId = 3105;
		price = 1900;
		from = [1028, 1033, 1006];
		stats = {
			health: {
				flatBonus: 200
			},
			resist: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Madred's Razors
		itemId = 3106;
		price = 450;
		from = [1042];
		stats = {
			attackSpeed: {
				percentBonus: 15
			}
		};
	},
	class Item extends _Item { //Fiendish Codex
		itemId = 3108;
		price = 820;
		from = [1052];
		stats = {
			abilityPower: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Frozen Heart
		itemId = 3110;
		price = 2450;
		from = [3082, 3024];
		stats = {
			mana: {
				flatBonus: 400
			},
			armor: {
				flatBonus: 100
			}
		};
	},
	class Item extends _Item { //Mercury's Treads
		itemId = 3111;
		price = 1200;
		from = [1001, 1033];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Orb of Winter
		itemId = 3112;
		price = 2210;
		from = [1006, 1006, 1033, 1033];
		stats = {
			resist: {
				flatBonus: 70
			}
		};
	},
	class Item extends _Item { //Aether Wisp
		itemId = 3113;
		price = 950;
		from = [1052];
		stats = {
			abilityPower: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Forbidden Idol
		itemId = 3114;
		price = 600;
		from = [1004, 1004];
	},
	class Item extends _Item { //Nashor's Tooth
		itemId = 3115;
		price = 2920;
		from = [3101, 3108];
		stats = {
			abilityPower: {
				flatBonus: 60
			},
			attackSpeed: {
				percentBonus: 50
			}
		};
	},
	class Item extends _Item { //Rylai's Crystal Scepter
		itemId = 3116;
		price = 2900;
		from = [1026, 1052, 1011];
		stats = {
			health: {
				flatBonus: 400
			},
			abilityPower: {
				flatBonus: 100
			}
		};
	},
	class Item extends _Item { //Boots of Mobility
		itemId = 3117;
		price = 800;
		from = [1001];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Wicked Hatchet
		itemId = 3122;
		price = 1200;
		from = [1051, 1036];
		stats = {
			attackDamage: {
				flatBonus: 20
			},
			crit: {
				flatBonus: 0.1
			}
		};
	},
	class Item extends _Item { //Executioner's Calling
		itemId = 3123;
		price = 1900;
		from = [3093, 1036];
		stats = {
			attackDamage: {
				flatBonus: 25
			},
			crit: {
				flatBonus: 0.2
			}
		};
	},
	class Item extends _Item { //Guinsoo's Rageblade
		itemId = 3124;
		price = 2600;
		from = [1026, 1037];
		stats = {
			attackDamage: {
				flatBonus: 30
			},
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Deathfire Grasp
		itemId = 3128;
		price = 3100;
		from = [1058, 3108];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	class Item extends _Item { //Sword of the Divine
		itemId = 3131;
		price = 2150;
		from = [1043, 1042];
		active = true;
	},
	class Item extends _Item { //The Brutalizer
		itemId = 3134;
		price = 1337;
		from = [1036, 1036];
		stats = {
			attackDamage: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Void Staff
		itemId = 3135;
		price = 2295;
		from = [1026, 1052];
		stats = {
			abilityPower: {
				flatBonus: 70
			}
		};
	},
	class Item extends _Item { //Haunting Guise
		itemId = 3136;
		price = 1485;
		from = [1028, 1052];
		stats = {
			health: {
				flatBonus: 200
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Dervish Blade
		itemId = 3137;
		price = 2700;
		from = [3140, 3101];
		active = true;
		stats = {
			attackSpeed: {
				percentBonus: 50
			},
			resist: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Mercurial Scimitar
		itemId = 3139;
		price = 3700;
		from = [1038, 3140];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 80
			},
			resist: {
				flatBonus: 35
			}
		};
	},
	class Item extends _Item { //Quicksilver Sash
		itemId = 3140;
		price = 1250;
		from = [1033];
		active = true;
		stats = {
			resist: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Sword of the Occult
		itemId = 3141;
		price = 1400;
		from = [1036];
		stats = {
			attackDamage: {
				flatBonus: 10
			}
		};
	},
	class Item extends _Item { //Youmuu's Ghostblade
		itemId = 3142;
		price = 2700;
		from = [3093, 3134];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 30
			},
			crit: {
				flatBonus: 0.15
			}
		};
	},
	class Item extends _Item { //Randuin's Omen
		itemId = 3143;
		price = 2850;
		from = [3082, 1011];
		active = true;
		stats = {
			health: {
				flatBonus: 500
			},
			armor: {
				flatBonus: 70
			}
		};
	},
	class Item extends _Item { //Bilgewater Cutlass
		itemId = 3144;
		price = 1400;
		from = [1036, 1053];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 25
			},
			lifeSteal: {
				percentBonus: 8
			}
		};
	},
	class Item extends _Item { //Hextech Revolver
		itemId = 3145;
		price = 1200;
		from = [1052, 1052];
		stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Hextech Gunblade
		itemId = 3146;
		price = 3400;
		from = [3144, 3145];
		active = true;
		stats = {
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
	class Item extends _Item { //Liandry's Torment
		itemId = 3151;
		price = 2900;
		from = [3136, 1052];
		stats = {
			health: {
				flatBonus: 300
			},
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Will of the Ancients
		itemId = 3152;
		price = 2500;
		from = [3145, 3108];
		stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	class Item extends _Item { //Blade of the Ruined King
		itemId = 3153;
		price = 3200;
		from = [1042, 3144, 1042];
		active = true;
		stats = {
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
	class Item extends _Item { //Wriggle's Lantern
		itemId = 3154;
		price = 1475;
		from = [3106, 1036, 1042];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 12
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	class Item extends _Item { //Hexdrinker
		itemId = 3155;
		price = 1450;
		from = [1036, 1033];
		stats = {
			attackDamage: {
				flatBonus: 25
			},
			resist: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Maw of Malmortius
		itemId = 3156;
		price = 3200;
		from = [3155, 1037];
		stats = {
			attackDamage: {
				flatBonus: 60
			},
			resist: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Zhonya's Hourglass
		itemId = 3157;
		price = 3300;
		from = [3191, 1058];
		active = true;
		stats = {
			armor: {
				flatBonus: 50
			},
			abilityPower: {
				flatBonus: 120
			}
		};
	},
	class Item extends _Item { //Ionian Boots of Lucidity
		itemId = 3158;
		price = 1000;
		from = [1001];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Grez's Spectral Lantern
		itemId = 3159;
		price = 1440;
		from = [3106, 1036, 1042];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 15
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	class Item extends _Item { //Feral Flare
		itemId = 3160;
		price = 1800;
		from = [3154];
		stats = {
			attackDamage: {
				flatBonus: 12
			},
			attackSpeed: {
				percentBonus: 30
			}
		};
	},
	class Item extends _Item { //Morellonomicon
		itemId = 3165;
		price = 2100;
		from = [3108, 3114];
		stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3166;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3167;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3168;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3169;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Moonflair Spellblade
		itemId = 3170;
		price = 2620;
		from = [3191, 1033];
		stats = {
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
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3171;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Zephyr
		itemId = 3172;
		price = 2850;
		from = [3101, 1037];
		stats = {
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
	class Item extends _Item { //Athene's Unholy Grail
		itemId = 3174;
		price = 2700;
		from = [3108, 3028];
		stats = {
			abilityPower: {
				flatBonus: 60
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Head of Kha'Zix
		itemId = 3175;
		price = 0;
		isTrinket = true;
		from = [3169];
		active = true;
	},
	class Item extends _Item { //Odyn's Veil
		itemId = 3180;
		price = 2500;
		from = [1033, 3010];
		active = true;
		stats = {
			health: {
				flatBonus: 350
			},
			resist: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Sanguine Blade
		itemId = 3181;
		price = 2275;
		from = [1037, 1053];
		stats = {
			attackDamage: {
				flatBonus: 45
			},
			lifeSteal: {
				percentBonus: 10
			}
		};
	},
	class Item extends _Item { //Entropy
		itemId = 3184;
		price = 2700;
		from = [3044, 1037];
		active = true;
		stats = {
			health: {
				flatBonus: 275
			},
			attackDamage: {
				flatBonus: 55
			}
		};
	},
	class Item extends _Item { //The Lightbringer
		itemId = 3185;
		price = 2280;
		from = [3122, 1018];
		active = true;
		stats = {
			attackDamage: {
				flatBonus: 30
			},
			crit: {
				flatBonus: 0.3
			}
		};
	},
	class Item extends _Item { //Hextech Sweeper
		itemId = 3187;
		price = 2130;
		from = [3024, 3067];
		active = true;
		stats = {
			health: {
				flatBonus: 225
			},
			armor: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Blackfire Torch
		itemId = 3188;
		price = 2650;
		from = [1026, 3108];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 80
			}
		};
	},
	class Item extends _Item { //Locket of the Iron Solari
		itemId = 3190;
		price = 2800;
		from = [3105, 3067];
		active = true;
		stats = {
			health: {
				flatBonus: 400
			},
			resist: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Seeker's Armguard
		itemId = 3191;
		price = 1200;
		from = [1029, 1052];
		stats = {
			armor: {
				flatBonus: 30
			},
			abilityPower: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //The Hex Core mk-1
		itemId = 3196;
		price = 1000;
		from = [3200];
		stats = {
			health: {
				flatBonus: 150
			},
			abilityPower: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //The Hex Core mk-2
		itemId = 3197;
		price = 2000;
		from = [3196];
		stats = {
			health: {
				flatBonus: 300
			},
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Perfect Hex Core
		itemId = 3198;
		price = 3000;
		from = [3197];
		stats = {
			health: {
				flatBonus: 500
			},
			abilityPower: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Prototype Hex Core
		itemId = 3200;
		price = 0;
	},
	class Item extends _Item { //Quill Coat
		itemId = 3204;
		price = 775;
		from = [1039, 1029];
		active = true;
		stats = {
			armor: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Quill Coat
		itemId = 3205;
		price = 775;
		from = [1039, 1029];
		active = true;
		stats = {
			armor: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Spirit of the Spectral Wraith
		itemId = 3206;
		price = 2075;
		from = [1080, 3108];
		stats = {
			abilityPower: {
				flatBonus: 50
			}
		};
	},
	class Item extends _Item { //Spirit of the Ancient Golem
		itemId = 3207;
		price = 2075;
		from = [3205, 3067];
		active = true;
		stats = {
			health: {
				flatBonus: 200
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Spirit of the Ancient Golem
		itemId = 3208;
		price = 2075;
		from = [3204, 3067];
		active = true;
		stats = {
			health: {
				flatBonus: 200
			},
			armor: {
				flatBonus: 20
			}
		};
	},
	class Item extends _Item { //Spirit of the Elder Lizard
		itemId = 3209;
		price = 2075;
		from = [1080, 1036, 1036];
		stats = {
			attackDamage: {
				flatBonus: 30
			}
		};
	},
	class Item extends _Item { //Spectre's Cowl
		itemId = 3211;
		price = 1200;
		from = [1028, 1033];
		stats = {
			health: {
				flatBonus: 200
			},
			resist: {
				flatBonus: 35
			}
		};
	},
	class Item extends _Item { //Mikael's Crucible
		itemId = 3222;
		price = 2450;
		from = [3028, 3114];
		active = true;
		stats = {
			resist: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3250;
		price = 1475;
		from = [3006];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3251;
		price = 1600;
		from = [3006];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3252;
		price = 1475;
		from = [3006];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3253;
		price = 1475;
		from = [3006];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3254;
		price = 1475;
		from = [3006];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			attackSpeed: {
				percentBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3255;
		price = 1575;
		from = [3020];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3256;
		price = 1700;
		from = [3020];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3257;
		price = 1575;
		from = [3020];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3258;
		price = 1575;
		from = [3020];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3259;
		price = 1575;
		from = [3020];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3260;
		price = 1475;
		from = [3047];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3261;
		price = 1600;
		from = [3047];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3262;
		price = 1475;
		from = [3047];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3263;
		price = 1475;
		from = [3047];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3264;
		price = 1475;
		from = [3047];
		stats = {
			armor: {
				flatBonus: 25
			},
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3265;
		price = 1675;
		from = [3111];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3266;
		price = 1800;
		from = [3111];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3267;
		price = 1675;
		from = [3111];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3268;
		price = 1675;
		from = [3111];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3269;
		price = 1675;
		from = [3111];
		stats = {
			moveSpeed: {
				flatBonus: 45
			},
			resist: {
				flatBonus: 25
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3270;
		price = 1275;
		from = [3117];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3271;
		price = 1400;
		from = [3117];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3272;
		price = 1275;
		from = [3117];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3273;
		price = 1275;
		from = [3117];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3274;
		price = 1275;
		from = [3117];
		stats = {
			moveSpeed: {
				flatBonus: 105
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3275;
		price = 1475;
		from = [3158];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3276;
		price = 1600;
		from = [3158];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3277;
		price = 1475;
		from = [3158];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3278;
		price = 1475;
		from = [3158];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3279;
		price = 1475;
		from = [3158];
		stats = {
			moveSpeed: {
				flatBonus: 45
			}
		};
	},
	class Item extends _Item { //Enchantment: Homeguard
		itemId = 3280;
		price = 1475;
		from = [3009];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Enchantment: Captain
		itemId = 3281;
		price = 1600;
		from = [3009];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Enchantment: Furor
		itemId = 3282;
		price = 1475;
		from = [3009];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Enchantment: Distortion
		itemId = 3283;
		price = 1475;
		from = [3009];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Enchantment: Alacrity
		itemId = 3284;
		price = 1475;
		from = [3009];
		stats = {
			moveSpeed: {
				flatBonus: 60
			}
		};
	},
	class Item extends _Item { //Twin Shadows
		itemId = 3290;
		price = 2400;
		from = [3108, 3113];
		active = true;
		stats = {
			abilityPower: {
				flatBonus: 80
			},
			moveSpeed: {
				percentBonus: 6
			}
		};
	},
	class Item extends _Item { //Ancient Coin
		itemId = 3301;
		price = 365;
	},
	class Item extends _Item { //Relic Shield
		itemId = 3302;
		price = 365;
		stats = {
			health: {
				flatBonus: 75
			}
		};
	},
	class Item extends _Item { //Spellthief's Edge
		itemId = 3303;
		price = 365;
		stats = {
			abilityPower: {
				flatBonus: 5
			}
		};
	},
	class Item extends _Item { //Warding Totem (Trinket)
		itemId = 3340;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Sweeping Lens (Trinket)
		itemId = 3341;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Scrying Orb (Trinket)
		itemId = 3342;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Soul Anchor (Trinket)
		itemId = 3345;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Greater Stealth Totem (Trinket)
		itemId = 3361;
		price = 475;
		isTrinket = true;
		from = [3340];
		active = true;
	},
	class Item extends _Item { //Greater Vision Totem (Trinket)
		itemId = 3362;
		price = 475;
		isTrinket = true;
		from = [3340];
		active = true;
	},
	class Item extends _Item { //Farsight Orb (Trinket)
		itemId = 3363;
		price = 475;
		isTrinket = true;
		from = [3342];
		active = true;
	},
	class Item extends _Item { //Oracle's Lens (Trinket)
		itemId = 3364;
		price = 475;
		isTrinket = true;
		from = [3341];
		active = true;
	},
	class Item extends _Item { //Face of the Mountain
		itemId = 3401;
		price = 2200;
		from = [3097, 3067];
		stats = {
			health: {
				flatBonus: 500
			}
		};
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3405;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3406;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3407;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3408;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3409;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Head of Kha'Zix
		itemId = 3410;
		price = 0;
		isTrinket = true;
		from = [3169];
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3411;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3412;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3413;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3414;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3415;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Head of Kha'Zix
		itemId = 3416;
		price = 0;
		isTrinket = true;
		from = [3169];
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3417;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3418;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3419;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3420;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3421;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Head of Kha'Zix
		itemId = 3422;
		price = 0;
		isTrinket = true;
		from = [3169];
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3450;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3451;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3452;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3453;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Bonetooth Necklace
		itemId = 3454;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Head of Kha'Zix
		itemId = 3455;
		price = 0;
		isTrinket = true;
		from = [3169];
		active = true;
	},
	class Item extends _Item { //Golden Transcendence
		itemId = 3460;
		price = 0;
		isTrinket = true;
		active = true;
	},
	class Item extends _Item { //Ardent Censer
		itemId = 3504;
		price = 2100;
		from = [3114, 3113];
		stats = {
			abilityPower: {
				flatBonus: 40
			}
		};
	},
	class Item extends _Item { //Essence Reaver
		itemId = 3508;
		price = 3200;
		from = [1053, 1038];
		stats = {
			attackDamage: {
				flatBonus: 80
			},
			lifeSteal: {
				percentBonus: 10
			}
		};
	},
	class Item extends _Item { //The Black Spear
		itemId = 3599;
		price = 0;
		active = true;
	},
	class Item extends _Item { //Stalker's Blade
		itemId = 3706;
		price = 750;
		from = [1039];
	},
	class Item extends _Item { //Enchantment: Warrior
		itemId = 3707;
		price = 2250;
		from = [3706, 3134];
	},
	class Item extends _Item { //Enchantment: Magus
		itemId = 3708;
		price = 2250;
		from = [3706, 3108];
	},
	class Item extends _Item { //Enchantment: Juggernaut
		itemId = 3709;
		price = 2250;
		from = [3706, 3067, 1028];
	},
	class Item extends _Item { //Enchantment: Devourer
		itemId = 3710;
		price = 2250;
		from = [3706, 1042, 1042];
	},
	class Item extends _Item { //Poacher's Knife
		itemId = 3711;
		price = 750;
		from = [1039];
	},
	class Item extends _Item { //Ranger's Trailblazer
		itemId = 3713;
		price = 750;
		from = [1039];
	},
	class Item extends _Item { //Enchantment: Warrior
		itemId = 3714;
		price = 2250;
		from = [3715, 3134];
	},
	class Item extends _Item { //Skirmisher's Sabre
		itemId = 3715;
		price = 750;
		from = [1039];
	},
	class Item extends _Item { //Enchantment: Magus
		itemId = 3716;
		price = 2250;
		from = [3715, 3108];
	},
	class Item extends _Item { //Enchantment: Juggernaut
		itemId = 3717;
		price = 2250;
		from = [3715, 3067, 1028];
	},
	class Item extends _Item { //Enchantment: Devourer
		itemId = 3718;
		price = 2250;
		from = [3715, 1042, 1042];
	},
	class Item extends _Item { //Enchantment: Warrior
		itemId = 3719;
		price = 2250;
		from = [3711, 3134];
	},
	class Item extends _Item { //Enchantment: Magus
		itemId = 3720;
		price = 2250;
		from = [3711, 3108];
	},
	class Item extends _Item { //Enchantment: Juggernaut
		itemId = 3721;
		price = 2250;
		from = [3711, 3067, 1028];
	},
	class Item extends _Item { //Enchantment: Devourer
		itemId = 3722;
		price = 2250;
		from = [3711, 1042, 1042];
	},
	class Item extends _Item { //Enchantment: Warrior
		itemId = 3723;
		price = 2250;
		from = [3713, 3134];
	},
	class Item extends _Item { //Enchantment: Magus
		itemId = 3724;
		price = 2250;
		from = [3713, 3108];
	},
	class Item extends _Item { //Enchantment: Juggernaut
		itemId = 3725;
		price = 2250;
		from = [3713, 3067, 1028];
	},
	class Item extends _Item { //Enchantment: Devourer
		itemId = 3726;
		price = 2250;
		from = [3713, 1042, 1042];
	},
	class Item extends _Item { //Righteous Glory
		itemId = 3800;
		price = 2500;
		from = [3010, 3801];
		active = true;
		stats = {
			health: {
				flatBonus: 500
			},
			mana: {
				flatBonus: 300
			}
		};
	},
	class Item extends _Item { //Crystalline Bracer
		itemId = 3801;
		price = 600;
		from = [1028, 1006];
		stats = {
			health: {
				flatBonus: 200
			}
		};
	},
];

const ItemList: Record<number, _Item> = {};
ItemList1.forEach(Item => {
	const item = new Item();
	ItemList[item.itemId] = item;
});

export default ItemList;

export function getItem(itemId: number) {
	return ItemList[itemId];
}
