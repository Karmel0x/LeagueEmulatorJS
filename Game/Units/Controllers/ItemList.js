
var ItemList = {
	1001: class Item { //Boots of Speed		
		id = 1001		
		static GoldCost = 325
		static stats = {
			MoveSpeed:{
				Flat:25
			}
		}
	},
	1004: class Item { //Faerie Charm		
		id = 1004		
		static GoldCost = 180
	},
	1006: class Item { //Rejuvenation Bead		
		id = 1006		
		static GoldCost = 180
	},
	1011: class Item { //Giant's Belt		
		id = 1011		
		static GoldCost = 1000
		static stats = {
			HealthPoints:{
				Flat:380
			}
		}
	},
	1018: class Item { //Cloak of Agility		
		id = 1018		
		static GoldCost = 730
		static stats = {
			CriticalChance:{
				Flat:0.15
			}
		}
	},
	1026: class Item { //Blasting Wand		
		id = 1026		
		static GoldCost = 860
		static stats = {
			AbilityPower:{
				Flat:40
			}
		}
	},
	1027: class Item { //Sapphire Crystal		
		id = 1027		
		static GoldCost = 400
		static stats = {
			ManaPoints:{
				Flat:200
			}
		}
	},
	1028: class Item { //Ruby Crystal		
		id = 1028		
		static GoldCost = 400
		static stats = {
			HealthPoints:{
				Flat:150
			}
		}
	},
	1029: class Item { //Cloth Armor		
		id = 1029		
		static GoldCost = 300
		static stats = {
			Armor:{
				Flat:15
			}
		}
	},
	1031: class Item { //Chain Vest		
		id = 1031		
		static GoldCost = 750
		static from = [ 1029 ]
		static stats = {
			Armor:{
				Flat:40
			}
		}
	},
	1033: class Item { //Null-Magic Mantle		
		id = 1033		
		static GoldCost = 500
		static stats = {
			MagicResist:{
				Flat:25
			}
		}
	},
	1036: class Item { //Long Sword		
		id = 1036		
		static GoldCost = 360
		static stats = {
			AttackDamage:{
				Flat:10
			}
		}
	},
	1037: class Item { //Pickaxe		
		id = 1037		
		static GoldCost = 875
		static stats = {
			AttackDamage:{
				Flat:25
			}
		}
	},
	1038: class Item { //B. F. Sword		
		id = 1038		
		static GoldCost = 1550
		static stats = {
			AttackDamage:{
				Flat:50
			}
		}
	},
	1039: class Item { //Hunter's Machete		
		id = 1039		
		static GoldCost = 400
	},
	1042: class Item { //Dagger		
		id = 1042		
		static GoldCost = 450
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.15
			}
		}
	},
	1043: class Item { //Recurve Bow		
		id = 1043		
		static GoldCost = 900
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.3
			}
		}
	},
	1051: class Item { //Brawler's Gloves		
		id = 1051		
		static GoldCost = 400
		static stats = {
			CriticalChance:{
				Flat:0.08
			}
		}
	},
	1052: class Item { //Amplifying Tome		
		id = 1052		
		static GoldCost = 435
		static stats = {
			AbilityPower:{
				Flat:20
			}
		}
	},
	1053: class Item { //Vampiric Scepter		
		id = 1053		
		static GoldCost = 800
		static from = [ 1036 ]
		static stats = {
			AttackDamage:{
				Flat:10
			},
			LifeSteal:{
				Percent:0.08
			}
		}
	},
	1054: class Item { //Doran's Shield		
		id = 1054		
		static GoldCost = 440
		static stats = {
			HealthPoints:{
				Flat:80
			},
			HealthRegeneration:{
				Flat:1.2
			}
		}
	},
	1055: class Item { //Doran's Blade		
		id = 1055		
		static GoldCost = 440
		static stats = {
			HealthPoints:{
				Flat:70
			},
			AttackDamage:{
				Flat:7
			},
			LifeSteal:{
				Percent:0.03
			}
		}
	},
	1056: class Item { //Doran's Ring		
		id = 1056		
		static GoldCost = 400
		static stats = {
			HealthPoints:{
				Flat:60
			},
			ManaRegeneration:{
				Flat:0.6
			},
			AbilityPower:{
				Flat:15
			}
		}
	},
	1058: class Item { //Needlessly Large Rod		
		id = 1058		
		static GoldCost = 1600
		static stats = {
			AbilityPower:{
				Flat:80
			}
		}
	},
	1062: class Item { //Prospector's Blade		
		id = 1062		
		static GoldCost = 950
		static stats = {
			AttackDamage:{
				Flat:16
			},
			AttackSpeedMultiplier:{
				Percent:0.15
			}
		}
	},
	1063: class Item { //Prospector's Ring		
		id = 1063		
		static GoldCost = 950
		static stats = {
			ManaRegeneration:{
				Flat:1.2
			},
			AbilityPower:{
				Flat:35
			}
		}
	},
	1074: class Item { //Doran's Shield (Showdown)		
		id = 1074		
		static GoldCost = 440
		static stats = {
			HealthPoints:{
				Flat:100
			},
			HealthRegeneration:{
				Flat:2
			}
		}
	},
	1075: class Item { //Doran's Blade (Showdown)		
		id = 1075		
		static GoldCost = 440
		static stats = {
			HealthPoints:{
				Flat:70
			},
			AttackDamage:{
				Flat:7
			},
			LifeSteal:{
				Percent:0.03
			}
		}
	},
	1076: class Item { //Doran's Ring (Showdown)		
		id = 1076		
		static GoldCost = 400
		static stats = {
			HealthPoints:{
				Flat:60
			},
			ManaRegeneration:{
				Flat:0.6
			},
			AbilityPower:{
				Flat:15
			}
		}
	},
	1080: class Item { //Spirit Stone		
		id = 1080		
		static GoldCost = 775
		static from = [ 1039, 1004, 1006 ]
	},
	2003: class Item { //Health Potion		
		id = 2003		
		static GoldCost = 35
		isConsumable = true
		static isStackable = true
		stacks = 5
	},
	2004: class Item { //Mana Potion		
		id = 2004		
		static GoldCost = 35
		isConsumable = true
		static isStackable = true
		stacks = 5
	},
	2009: class Item { //Total Biscuit of Rejuvenation		
		id = 2009		
		static GoldCost = 0
	},
	2010: class Item { //Total Biscuit of Rejuvenation		
		id = 2010		
		static GoldCost = 35
		static isStackable = true
		stacks = 5
	},
	2037: class Item { //Elixir of Fortitude		
		id = 2037		
		static GoldCost = 350
		isConsumable = true
		static isStackable = true
		stacks = 3
	},
	2039: class Item { //Elixir of Brilliance		
		id = 2039		
		static GoldCost = 250
		isConsumable = true
		static isStackable = true
		stacks = 3
	},
	2040: class Item { //Ichor of Rage		
		id = 2040		
		static GoldCost = 500
		isConsumable = true
		static isStackable = true
		stacks = 3
	},
	2041: class Item { //Crystalline Flask		
		id = 2041		
		static GoldCost = 345
		isConsumable = true
		active = true
	},
	2043: class Item { //Vision Ward		
		id = 2043		
		static GoldCost = 100
		isConsumable = true
		static isStackable = true
		stacks = 2
	},
	2044: class Item { //Stealth Ward		
		id = 2044		
		static GoldCost = 75
		isConsumable = true
		static isStackable = true
		stacks = 3
	},
	2045: class Item { //Ruby Sightstone		
		id = 2045		
		static GoldCost = 1600
		static from = [ 2049, 1028 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:400
			}
		}
	},
	2047: class Item { //Oracle's Extract		
		id = 2047		
		static GoldCost = 250
		isConsumable = true
	},
	2048: class Item { //Ichor of Illumination		
		id = 2048		
		static GoldCost = 500
		isConsumable = true
		static isStackable = true
		stacks = 3
	},
	2049: class Item { //Sightstone		
		id = 2049		
		static GoldCost = 800
		static from = [ 1028 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:150
			}
		}
	},
	2050: class Item { //Explorer's Ward		
		id = 2050		
		static GoldCost = 0
		isConsumable = true
	},
	2051: class Item { //Guardian's Horn		
		id = 2051		
		static GoldCost = 1025
		static from = [ 1006, 1028 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:180
			}
		}
	},
	2052: class Item { //Poro-Snax		
		id = 2052		
		static GoldCost = 0
	},
	2053: class Item { //Raptor Cloak		
		id = 2053		
		static GoldCost = 1000
		static from = [ 1006, 1029 ]
		static stats = {
			Armor:{
				Flat:30
			}
		}
	},
	2137: class Item { //Elixir of Ruin		
		id = 2137		
		static GoldCost = 400
		isConsumable = true
	},
	2138: class Item { //Elixir of Iron		
		id = 2138		
		static GoldCost = 400
		isConsumable = true
	},
	2139: class Item { //Elixir of Sorcery		
		id = 2139		
		static GoldCost = 400
		isConsumable = true
	},
	2140: class Item { //Elixir of Wrath		
		id = 2140		
		static GoldCost = 400
		isConsumable = true
	},
	3001: class Item { //Abyssal Scepter		
		id = 3001		
		static GoldCost = 2440
		static from = [ 1026, 1033, 1033 ]
		static stats = {
			AbilityPower:{
				Flat:70
			},
			MagicResist:{
				Flat:50
			}
		}
	},
	3003: class Item { //Archangel's Staff		
		id = 3003		
		static GoldCost = 2700
		static from = [ 3070, 1026 ]
		static stats = {
			ManaPoints:{
				Flat:250
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3004: class Item { //Manamune		
		id = 3004		
		static GoldCost = 2200
		static from = [ 3070, 1037 ]
		static stats = {
			ManaPoints:{
				Flat:250
			},
			AttackDamage:{
				Flat:25
			}
		}
	},
	3005: class Item { //Atma's Impaler		
		id = 3005		
		static GoldCost = 2250
		static from = [ 1031, 3093 ]
		static stats = {
			Armor:{
				Flat:45
		},
		CriticalChance:{
				Flat:0.15
			}
		}
	},
	3006: class Item { //Berserker's Greaves		
		id = 3006		
		static GoldCost = 1000
		static from = [ 1001, 1042 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3007: class Item { //Archangel's Staff (Crystal Scar)		
		id = 3007		
		static GoldCost = 2700
		static from = [ 3073, 1026 ]
		static stats = {
			HealthPoints:{
				Flat:250
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3008: class Item { //Manamune (Crystal Scar)		
		id = 3008		
		static GoldCost = 2200
		static from = [ 3073, 1037 ]
		static stats = {
			HealthPoints:{
				Flat:250
			},
			AttackDamage:{
				Flat:25
			}
		}
	},
	3009: class Item { //Boots of Swiftness		
		id = 3009		
		static GoldCost = 1000
		static from = [ 1001 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3010: class Item { //Catalyst the Protector		
		id = 3010		
		static GoldCost = 1200
		static from = [ 1028, 1027 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			ManaPoints:{
				Flat:300
			}
		}
	},
	3020: class Item { //Sorcerer's Shoes		
		id = 3020		
		static GoldCost = 1100
		static from = [ 1001 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3022: class Item { //Frozen Mallet		
		id = 3022		
		static GoldCost = 3300
		static from = [ 1028, 1011, 1037 ]
		static stats = {
			HealthPoints:{
				Flat:700
			},
			AttackDamage:{
				Flat:30
			}
		}
	},
	3023: class Item { //Twin Shadows		
		id = 3023		
		static GoldCost = 2400
		static from = [ 3108, 3113 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:80
			},
			MoveSpeed:{
				Percent:0.06
			}
		}
	},
	3024: class Item { //Glacial Shroud		
		id = 3024		
		static GoldCost = 950
		static from = [ 1027, 1029 ]
		static stats = {
			ManaPoints:{
				Flat:250
			},
			Armor:{
				Flat:20
			}
		}
	},
	3025: class Item { //Iceborn Gauntlet		
		id = 3025		
		static GoldCost = 2900
		static from = [ 3057, 3024 ]
		static stats = {
			ManaPoints:{
				Flat:500
			},
			Armor:{
				Flat:60
			},
			AbilityPower:{
				Flat:30
			}
		}
	},
	3026: class Item { //Guardian Angel		
		id = 3026		
		static GoldCost = 2750
		static from = [ 1033, 1031 ]
		static stats = {
			Armor:{
				Flat:50
			},
			MagicResist:{
				Flat:40
			}
		}
	},
	3027: class Item { //Rod of Ages		
		id = 3027		
		static GoldCost = 2800
		static from = [ 3010, 1026 ]
		static stats = {
			HealthPoints:{
				Flat:450
			},
			ManaPoints:{
				Flat:450
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3028: class Item { //Chalice of Harmony		
		id = 3028		
		static GoldCost = 1000
		static from = [ 1004, 1033, 1004 ]
		static stats = {
			MagicResist:{
				Flat:25
			}
		}
	},
	3029: class Item { //Rod of Ages (Crystal Scar)		
		id = 3029		
		static GoldCost = 2800
		static from = [ 3010, 1026 ]
		static stats = {
			HealthPoints:{
				Flat:450
			},
			HealthPoints:{
				Flat:450
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3031: class Item { //Infinity Edge		
		id = 3031		
		static GoldCost = 3800
		static from = [ 1038, 1037, 1018 ]
		static stats = {
			AttackDamage:{
				Flat:80
			},
			CriticalChance:{
				Flat:0.25
			}
		}
	},
	3035: class Item { //Last Whisper		
		id = 3035		
		static GoldCost = 2300
		static from = [ 1037, 1036 ]
		static stats = {
			AttackDamage:{
				Flat:40
			}
		}
	},
	3040: class Item { //Seraph's Embrace		
		id = 3040		
		static GoldCost = 2700
		static from = [ 3003 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:1000
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3041: class Item { //Mejai's Soulstealer		
		id = 3041		
		static GoldCost = 1400
		static from = [ 1052 ]
		static stats = {
			AbilityPower:{
				Flat:20
			}
		}
	},
	3042: class Item { //Muramana		
		id = 3042		
		static GoldCost = 2200
		static from = [ 3004 ]
		static stats = {
			HealthPoints:{
				Flat:1000
			},
			AttackDamage:{
				Flat:25
			}
		}
	},
	3043: class Item { //Muramana		
		id = 3043		
		static GoldCost = 2200
		static from = [ 3008 ]
		static stats = {
			HealthPoints:{
				Flat:1000
			},
			AttackDamage:{
				Flat:25
			}
		}
	},
	3044: class Item { //Phage		
		id = 3044		
		static GoldCost = 1325
		static from = [ 1028, 1036 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			AttackDamage:{
				Flat:20
			}
		}
	},
	3046: class Item { //Phantom Dancer		
		id = 3046		
		static GoldCost = 2800
		static from = [ 1018, 3086, 1042 ]
		static stats = {
			MoveSpeed:{
				Percent:0.05
			},
			AttackSpeedMultiplier:{
				Percent:0.5
			},
			CriticalChance:{
				Flat:0.3
			}
		}
	},
	3047: class Item { //Ninja Tabi		
		id = 3047		
		static GoldCost = 1000
		static from = [ 1001, 1029 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3048: class Item { //Seraph's Embrace		
		id = 3048		
		static GoldCost = 2700
		static from = [ 3007 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:1000
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3050: class Item { //Zeke's Herald		
		id = 3050		
		static GoldCost = 2450
		static from = [ 3067, 1053 ]
		static stats = {
			HealthPoints:{
				Flat:250
			}
		}
	},
	3056: class Item { //Ohmwrecker		
		id = 3056		
		static GoldCost = 2600
		static from = [ 2053, 3067 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:300
			},
			Armor:{
				Flat:50
			}
		}
	},
	3057: class Item { //Sheen		
		id = 3057		
		static GoldCost = 1200
		static from = [ 1027, 1052 ]
		static stats = {
			ManaPoints:{
				Flat:200
			},
			AbilityPower:{
				Flat:25
			}
		}
	},
	3060: class Item { //Banner of Command		
		id = 3060		
		static GoldCost = 3000
		static from = [ 3105, 3108 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:200
			},
			AbilityPower:{
				Flat:60
			},
			MagicResist:{
				Flat:20
			}
		}
	},
	3065: class Item { //Spirit Visage		
		id = 3065		
		static GoldCost = 2750
		static from = [ 3211, 3067 ]
		static stats = {
			HealthPoints:{
				Flat:400
			},
			MagicResist:{
				Flat:55
			}
		}
	},
	3067: class Item { //Kindlegem		
		id = 3067		
		static GoldCost = 850
		static from = [ 1028 ]
		static stats = {
			HealthPoints:{
				Flat:200
			}
		}
	},
	3068: class Item { //Sunfire Cape		
		id = 3068		
		static GoldCost = 2600
		static from = [ 1031, 1011 ]
		static stats = {
			HealthPoints:{
				Flat:450
			},
			Armor:{
				Flat:45
			}
		}
	},
	3069: class Item { //Talisman of Ascension		
		id = 3069		
		static GoldCost = 2100
		static from = [ 3096, 3114 ]
		active = true
	},
	3070: class Item { //Tear of the Goddess		
		id = 3070		
		static GoldCost = 720
		static from = [ 1027, 1004 ]
		static stats = {
			ManaPoints:{
				Flat:250
			}
		}
	},
	3071: class Item { //The Black Cleaver		
		id = 3071		
		static GoldCost = 3000
		static from = [ 3134, 1028 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			AttackDamage:{
				Flat:50
			}
		}
	},
	3072: class Item { //The Bloodthirster		
		id = 3072		
		static GoldCost = 3500
		static from = [ 1053, 1038 ]
		static stats = {
			AttackDamage:{
				Flat:80
			}
		}
	},
	3073: class Item { //Tear of the Goddess (Crystal Scar)		
		id = 3073		
		static GoldCost = 720
		static from = [ 1027, 1004 ]
		static stats = {
			ManaPoints:{
				Flat:250
			}
		}
	},
	3074: class Item { //Ravenous Hydra (Melee Only)		
		id = 3074		
		static GoldCost = 3300
		static from = [ 3077, 1053 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:75
			},
			LifeSteal:{
				Percent:0.12
			}
		}
	},
	3075: class Item { //Thornmail		
		id = 3075		
		static GoldCost = 2100
		static from = [ 1029, 1031 ]
		static stats = {
			Armor:{
				Flat:100
			}
		}
	},
	3077: class Item { //Tiamat (Melee Only)		
		id = 3077		
		static GoldCost = 1900
		static from = [ 1037, 1036, 1006, 1006 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:40
			}
		}
	},
	3078: class Item { //Trinity Force		
		id = 3078		
		static GoldCost = 3703
		static from = [ 3086, 3057, 3044 ]
		static stats = {
			HealthPoints:{
				Flat:250
			},
			ManaPoints:{
				Flat:200
			},
			AttackDamage:{
				Flat:30
			},
			AbilityPower:{
				Flat:30
			},
			MoveSpeed:{
				Percent:0.08
			},
			AttackSpeedMultiplier:{
				Percent:0.3
			},
			CriticalChance:{
				Flat:0.1
			}
		}
	},
	3082: class Item { //Warden's Mail		
		id = 3082		
		static GoldCost = 1050
		static from = [ 1029, 1029 ]
		static stats = {
			Armor:{
				Flat:45
			}
		}
	},
	3083: class Item { //Warmog's Armor		
		id = 3083		
		static GoldCost = 2500
		static from = [ 3801, 1011, 3801 ]
		static stats = {
			HealthPoints:{
				Flat:800
			}
		}
	},
	3084: class Item { //Overlord's Bloodmail		
		id = 3084		
		static GoldCost = 2455
		static from = [ 1011, 1028 ]
		static stats = {
			HealthPoints:{
				Flat:850
			}
		}
	},
	3085: class Item { //Runaan's Hurricane (Ranged Only)		
		id = 3085		
		static GoldCost = 2400
		static from = [ 1042, 1043, 1042 ]
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.7
			}
		}
	},
	3086: class Item { //Zeal		
		id = 3086		
		static GoldCost = 1100
		static from = [ 1051, 1042 ]
		static stats = {
			MoveSpeed:{
				Percent:0.05
			},
			AttackSpeedMultiplier:{
				Percent:0.2
			},
			CriticalChance:{
				Flat:0.1
			}
		}
	},
	3087: class Item { //Statikk Shiv		
		id = 3087		
		static GoldCost = 2500
		static from = [ 3086, 3093 ]
		static stats = {
			MoveSpeed:{
				Percent:0.06
			},
			AttackSpeedMultiplier:{
				Percent:0.4
			},
			CriticalChance:{
				Flat:0.2
			}
		}
	},
	3089: class Item { //Rabadon's Deathcap		
		id = 3089		
		static GoldCost = 3300
		static from = [ 1026, 1058 ]
		static stats = {
			AbilityPower:{
				Flat:120
			}
		}
	},
	3090: class Item { //Wooglet's Witchcap		
		id = 3090		
		static GoldCost = 3540
		static from = [ 3191, 1026, 1052 ]
		active = true
		static stats = {
			Armor:{
				Flat:45
			},
			AbilityPower:{
				Flat:100
			}
		}
	},
	3091: class Item { //Wit's End		
		id = 3091		
		static GoldCost = 2600
		static from = [ 1043, 1033, 1042 ]
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.5
			},
			MagicResist:{
				Flat:30
			}
		}
	},
	3092: class Item { //Frost Queen's Claim		
		id = 3092		
		static GoldCost = 2200
		static from = [ 3098, 3108 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:50
			}
		}
	},
	3093: class Item { //Avarice Blade		
		id = 3093		
		static GoldCost = 800
		static from = [ 1051 ]
		static stats = {
			CriticalChance:{
				Flat:0.1
			}
		}
	},
	3096: class Item { //Nomad's Medallion		
		id = 3096		
		static GoldCost = 865
		static from = [ 3301 ]
		active = true
	},
	3097: class Item { //Targon's Brace		
		id = 3097		
		static GoldCost = 865
		static from = [ 3302 ]
		static stats = {
			HealthPoints:{
				Flat:175
			}
		}
	},
	3098: class Item { //Frostfang		
		id = 3098		
		static GoldCost = 865
		static from = [ 3303 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:10
			}
		}
	},
	3100: class Item { //Lich Bane		
		id = 3100		
		static GoldCost = 3000
		static from = [ 3057, 3113 ]
		static stats = {
			ManaPoints:{
				Flat:250
			},
			AbilityPower:{
				Flat:80
			},
			MoveSpeed:{
				Percent:0.05
			}
		}
	},
	3101: class Item { //Stinger		
		id = 3101		
		static GoldCost = 1250
		static from = [ 1042, 1042 ]
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.4
			}
		}
	},
	3102: class Item { //Banshee's Veil		
		id = 3102		
		static GoldCost = 2750
		static from = [ 3211, 1028 ]
		static stats = {
			HealthPoints:{
				Flat:450
			},
			MagicResist:{
				Flat:55
			}
		}
	},
	3104: class Item { //Lord Van Damm's Pillager		
		id = 3104		
		static GoldCost = 3800
		static from = [ 3122, 1037, 1018 ]
		static stats = {
			AttackDamage:{
				Flat:80
			},
			CriticalChance:{
				Flat:0.25
			}
		}
	},
	3105: class Item { //Aegis of the Legion		
		id = 3105		
		static GoldCost = 1900
		static from = [ 1028, 1033, 1006 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			MagicResist:{
				Flat:20
			}
		}
	},
	3106: class Item { //Madred's Razors		
		id = 3106		
		static GoldCost = 450
		static from = [ 1042 ]
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.15
			}
		}
	},
	3108: class Item { //Fiendish Codex		
		id = 3108		
		static GoldCost = 820
		static from = [ 1052 ]
		static stats = {
			AbilityPower:{
				Flat:30
			}
		}
	},
	3110: class Item { //Frozen Heart		
		id = 3110		
		static GoldCost = 2450
		static from = [ 3082, 3024 ]
		static stats = {
			ManaPoints:{
				Flat:400
			},
			Armor:{
				Flat:100
			}
		}
	},
	3111: class Item { //Mercury's Treads		
		id = 3111		
		static GoldCost = 1200
		static from = [ 1001, 1033 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3112: class Item { //Orb of Winter		
		id = 3112		
		static GoldCost = 2210
		static from = [ 1006, 1006, 1033, 1033 ]
		static stats = {
			MagicResist:{
				Flat:70
			}
		}
	},
	3113: class Item { //Aether Wisp		
		id = 3113		
		static GoldCost = 950
		static from = [ 1052 ]
		static stats = {
			AbilityPower:{
				Flat:30
			}
		}
	},
	3114: class Item { //Forbidden Idol		
		id = 3114		
		static GoldCost = 600
		static from = [ 1004, 1004 ]
	},
	3115: class Item { //Nashor's Tooth		
		id = 3115		
		static GoldCost = 2920
		static from = [ 3101, 3108 ]
		static stats = {
			AbilityPower:{
				Flat:60
			},
			AttackSpeedMultiplier:{
				Percent:0.5
			}
		}
	},
	3116: class Item { //Rylai's Crystal Scepter		
		id = 3116		
		static GoldCost = 2900
		static from = [ 1026, 1052, 1011 ]
		static stats = {
			HealthPoints:{
				Flat:400
			},
			AbilityPower:{
				Flat:100
			}
		}
	},
	3117: class Item { //Boots of Mobility		
		id = 3117		
		static GoldCost = 800
		static from = [ 1001 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3122: class Item { //Wicked Hatchet		
		id = 3122		
		static GoldCost = 1200
		static from = [ 1051, 1036 ]
		static stats = {
			AttackDamage:{
				Flat:20
			},
			CriticalChance:{
				Flat:0.1
			}
		}
	},
	3123: class Item { //Executioner's Calling		
		id = 3123		
		static GoldCost = 1900
		static from = [ 3093, 1036 ]
		static stats = {
			AttackDamage:{
				Flat:25
			},
			CriticalChance:{
				Flat:0.2
			}
		}
	},
	3124: class Item { //Guinsoo's Rageblade		
		id = 3124		
		static GoldCost = 2600
		static from = [ 1026, 1037 ]
		static stats = {
			AttackDamage:{
				Flat:30
			},
			AbilityPower:{
				Flat:40
			}
		}
	},
	3128: class Item { //Deathfire Grasp		
		id = 3128		
		static GoldCost = 3100
		static from = [ 1058, 3108 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:120
			}
		}
	},
	3131: class Item { //Sword of the Divine		
		id = 3131		
		static GoldCost = 2150
		static from = [ 1043, 1042 ]
		active = true
	},
	3134: class Item { //The Brutalizer		
		id = 3134		
		static GoldCost = 1337
		static from = [ 1036, 1036 ]
		static stats = {
			AttackDamage:{
				Flat:25
			}
		}
	},
	3135: class Item { //Void Staff		
		id = 3135		
		static GoldCost = 2295
		static from = [ 1026, 1052 ]
		static stats = {
			AbilityPower:{
				Flat:70
			}
		}
	},
	3136: class Item { //Haunting Guise		
		id = 3136		
		static GoldCost = 1485
		static from = [ 1028, 1052 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			AbilityPower:{
				Flat:25
			}
		}
	},
	3137: class Item { //Dervish Blade		
		id = 3137		
		static GoldCost = 2700
		static from = [ 3140, 3101 ]
		active = true
		static stats = {
			AttackSpeedMultiplier:{
				Percent:0.5
			},
			MagicResist:{
				Flat:45
			}
		}
	},
	3139: class Item { //Mercurial Scimitar		
		id = 3139		
		static GoldCost = 3700
		static from = [ 1038, 3140 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:80
			},
			MagicResist:{
				Flat:35
			}
		}
	},
	3140: class Item { //Quicksilver Sash		
		id = 3140		
		static GoldCost = 1250
		static from = [ 1033 ]
		active = true
		static stats = {
			MagicResist:{
				Flat:30
			}
		}
	},
	3141: class Item { //Sword of the Occult		
		id = 3141		
		static GoldCost = 1400
		static from = [ 1036 ]
		static stats = {
			AttackDamage:{
				Flat:10
			}
		}
	},
	3142: class Item { //Youmuu's Ghostblade		
		id = 3142		
		static GoldCost = 2700
		static from = [ 3093, 3134 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:30
			},
			CriticalChance:{
				Flat:0.15
			}
		}
	},
	3143: class Item { //Randuin's Omen		
		id = 3143		
		static GoldCost = 2850
		static from = [ 3082, 1011 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:500
			},
			Armor:{
				Flat:70
			}
		}
	},
	3144: class Item { //Bilgewater Cutlass		
		id = 3144		
		static GoldCost = 1400
		static from = [ 1036, 1053 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:25
			},
			LifeSteal:{
				Percent:0.08
			}
		}
	},
	3145: class Item { //Hextech Revolver		
		id = 3145		
		static GoldCost = 1200
		static from = [ 1052, 1052 ]
		static stats = {
			AbilityPower:{
				Flat:40
			}
		}
	},
	3146: class Item { //Hextech Gunblade		
		id = 3146		
		static GoldCost = 3400
		static from = [ 3144, 3145 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:45
			},
			AbilityPower:{
				Flat:65
			},
			LifeSteal:{
				Percent:0.12
			}
		}
	},
	3151: class Item { //Liandry's Torment		
		id = 3151		
		static GoldCost = 2900
		static from = [ 3136, 1052 ]
		static stats = {
			HealthPoints:{
				Flat:300
			},
			AbilityPower:{
				Flat:50
			}
		}
	},
	3152: class Item { //Will of the Ancients		
		id = 3152		
		static GoldCost = 2500
		static from = [ 3145, 3108 ]
		static stats = {
			AbilityPower:{
				Flat:80
			}
		}
	},
	3153: class Item { //Blade of the Ruined King		
		id = 3153		
		static GoldCost = 3200
		static from = [ 1042, 3144, 1042 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:25
			},
			AttackSpeedMultiplier:{
				Percent:0.4
			},
			LifeSteal:{
				Percent:0.1
			}
		}
	},
	3154: class Item { //Wriggle's Lantern		
		id = 3154		
		static GoldCost = 1475
		static from = [ 3106, 1036, 1042 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:12
			},
			AttackSpeedMultiplier:{
				Percent:0.3
			}
		}
	},
	3155: class Item { //Hexdrinker		
		id = 3155		
		static GoldCost = 1450
		static from = [ 1036, 1033 ]
		static stats = {
			AttackDamage:{
				Flat:25
			},
			MagicResist:{
				Flat:30
			}
		}
	},
	3156: class Item { //Maw of Malmortius		
		id = 3156		
		static GoldCost = 3200
		static from = [ 3155, 1037 ]
		static stats = {
			AttackDamage:{
				Flat:60
			},
			MagicResist:{
				Flat:40
			}
		}
	},
	3157: class Item { //Zhonya's Hourglass		
		id = 3157		
		static GoldCost = 3300
		static from = [ 3191, 1058 ]
		active = true
		static stats = {
			Armor:{
				Flat:50
			},
			AbilityPower:{
				Flat:120
			}
		}
	},
	3158: class Item { //Ionian Boots of Lucidity		
		id = 3158		
		static GoldCost = 1000
		static from = [ 1001 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3159: class Item { //Grez's Spectral Lantern		
		id = 3159		
		static GoldCost = 1440
		static from = [ 3106, 1036, 1042 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:15
			},
			AttackSpeedMultiplier:{
				Percent:0.3
			}
		}
	},
	3160: class Item { //Feral Flare		
		id = 3160		
		static GoldCost = 1800
		static from = [ 3154 ]
		static stats = {
			AttackDamage:{
				Flat:12
			},
			AttackSpeedMultiplier:{
				Percent:0.3
			}
		}
	},
	3165: class Item { //Morellonomicon		
		id = 3165		
		static GoldCost = 2100
		static from = [ 3108, 3114 ]
		static stats = {
			AbilityPower:{
				Flat:80
			}
		}
	},
	3166: class Item { //Bonetooth Necklace		
		id = 3166		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3167: class Item { //Bonetooth Necklace		
		id = 3167		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3168: class Item { //Bonetooth Necklace		
		id = 3168		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3169: class Item { //Bonetooth Necklace		
		id = 3169		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3170: class Item { //Moonflair Spellblade		
		id = 3170		
		static GoldCost = 2620
		static from = [ 3191, 1033 ]
		static stats = {
			Armor:{
				Flat:50
			},
			AbilityPower:{
				Flat:50
			},
			MagicResist:{
				Flat:50
			}
		}
	},
	3171: class Item { //Bonetooth Necklace		
		id = 3171		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3172: class Item { //Zephyr		
		id = 3172		
		static GoldCost = 2850
		static from = [ 3101, 1037 ]
		static stats = {
			AttackDamage:{
				Flat:25
			},
			MoveSpeed:{
				Percent:0.1
			},
			AttackSpeedMultiplier:{
				Percent:0.5
			}
		}
	},
	3174: class Item { //Athene's Unholy Grail		
		id = 3174		
		static GoldCost = 2700
		static from = [ 3108, 3028 ]
		static stats = {
			AbilityPower:{
				Flat:60
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3175: class Item { //Head of Kha'Zix		
		id = 3175		
		static GoldCost = 0
		static isTrinket = true
		static from = [ 3169 ]
		active = true
	},
	3180: class Item { //Odyn's Veil		
		id = 3180		
		static GoldCost = 2500
		static from = [ 1033, 3010 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:350
			},
			HealthPoints:{
				Flat:350
			},
			MagicResist:{
				Flat:50
			}
		}
	},
	3181: class Item { //Sanguine Blade		
		id = 3181		
		static GoldCost = 2275
		static from = [ 1037, 1053 ]
		static stats = {
			AttackDamage:{
				Flat:45
			},
			LifeSteal:{
				Percent:0.1
			}
		}
	},
	3184: class Item { //Entropy		
		id = 3184		
		static GoldCost = 2700
		static from = [ 3044, 1037 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:275
			},
			AttackDamage:{
				Flat:55
			}
		}
	},
	3185: class Item { //The Lightbringer		
		id = 3185		
		static GoldCost = 2280
		static from = [ 3122, 1018 ]
		active = true
		static stats = {
			AttackDamage:{
				Flat:30
			},
			CriticalChance:{
				Flat:0.3
			}
		}
	},
	3187: class Item { //Hextech Sweeper		
		id = 3187		
		static GoldCost = 2130
		static from = [ 3024, 3067 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:225
			},
			HealthPoints:{
				Flat:250
			},
			Armor:{
				Flat:25
			}
		}
	},
	3188: class Item { //Blackfire Torch		
		id = 3188		
		static GoldCost = 2650
		static from = [ 1026, 3108 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:80
			}
		}
	},
	3190: class Item { //Locket of the Iron Solari		
		id = 3190		
		static GoldCost = 2800
		static from = [ 3105, 3067 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:400
			},
			MagicResist:{
				Flat:20
			}
		}
	},
	3191: class Item { //Seeker's Armguard		
		id = 3191		
		static GoldCost = 1200
		static from = [ 1029, 1052 ]
		static stats = {
			Armor:{
				Flat:30
			},
			AbilityPower:{
				Flat:25
			}
		}
	},
	3196: class Item { //The Hex Core mk-1		
		id = 3196		
		static GoldCost = 1000
		static from = [ 3200 ]
		static stats = {
			HealthPoints:{
				Flat:150
			},
			AbilityPower:{
				Flat:20
			}
		}
	},
	3197: class Item { //The Hex Core mk-2		
		id = 3197		
		static GoldCost = 2000
		static from = [ 3196 ]
		static stats = {
			HealthPoints:{
				Flat:300
			},
			AbilityPower:{
				Flat:40
			}
		}
	},
	3198: class Item { //Perfect Hex Core		
		id = 3198		
		static GoldCost = 3000
		static from = [ 3197 ]
		static stats = {
			HealthPoints:{
				Flat:500
			},
			AbilityPower:{
				Flat:60
			}
		}
	},
	3200: class Item { //Prototype Hex Core		
		id = 3200		
		static GoldCost = 0
	},
	3204: class Item { //Quill Coat		
		id = 3204		
		static GoldCost = 775
		static from = [ 1039, 1029 ]
		active = true
		static stats = {
			Armor:{
				Flat:20
			}
		}
	},
	3205: class Item { //Quill Coat		
		id = 3205		
		static GoldCost = 775
		static from = [ 1039, 1029 ]
		active = true
		static stats = {
			Armor:{
				Flat:20
			}
		}
	},
	3206: class Item { //Spirit of the Spectral Wraith		
		id = 3206		
		static GoldCost = 2075
		static from = [ 1080, 3108 ]
		static stats = {
			AbilityPower:{
				Flat:50
			}
		}
	},
	3207: class Item { //Spirit of the Ancient Golem		
		id = 3207		
		static GoldCost = 2075
		static from = [ 3205, 3067 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:200
			},
			Armor:{
				Flat:20
			}
		}
	},
	3208: class Item { //Spirit of the Ancient Golem		
		id = 3208		
		static GoldCost = 2075
		static from = [ 3204, 3067 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:200
			},
			Armor:{
				Flat:20
			}
		}
	},
	3209: class Item { //Spirit of the Elder Lizard		
		id = 3209		
		static GoldCost = 2075
		static from = [ 1080, 1036, 1036 ]
		static stats = {
			AttackDamage:{
				Flat:30
			}
		}
	},
	3211: class Item { //Spectre's Cowl		
		id = 3211		
		static GoldCost = 1200
		static from = [ 1028, 1033 ]
		static stats = {
			HealthPoints:{
				Flat:200
			},
			MagicResist:{
				Flat:35
			}
		}
	},
	3222: class Item { //Mikael's Crucible		
		id = 3222		
		static GoldCost = 2450
		static from = [ 3028, 3114 ]
		active = true
		static stats = {
			MagicResist:{
				Flat:40
			}
		}
	},
	3250: class Item { //Enchantment: Homeguard		
		id = 3250		
		static GoldCost = 1475
		static from = [ 3006 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3251: class Item { //Enchantment: Captain		
		id = 3251		
		static GoldCost = 1600
		static from = [ 3006 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3252: class Item { //Enchantment: Furor		
		id = 3252		
		static GoldCost = 1475
		static from = [ 3006 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3253: class Item { //Enchantment: Distortion		
		id = 3253		
		static GoldCost = 1475
		static from = [ 3006 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3254: class Item { //Enchantment: Alacrity		
		id = 3254		
		static GoldCost = 1475
		static from = [ 3006 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			AttackSpeedMultiplier:{
				Percent:0.25
			}
		}
	},
	3255: class Item { //Enchantment: Homeguard		
		id = 3255		
		static GoldCost = 1575
		static from = [ 3020 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3256: class Item { //Enchantment: Captain		
		id = 3256		
		static GoldCost = 1700
		static from = [ 3020 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3257: class Item { //Enchantment: Furor		
		id = 3257		
		static GoldCost = 1575
		static from = [ 3020 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3258: class Item { //Enchantment: Distortion		
		id = 3258		
		static GoldCost = 1575
		static from = [ 3020 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3259: class Item { //Enchantment: Alacrity		
		id = 3259		
		static GoldCost = 1575
		static from = [ 3020 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3260: class Item { //Enchantment: Homeguard		
		id = 3260		
		static GoldCost = 1475
		static from = [ 3047 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3261: class Item { //Enchantment: Captain		
		id = 3261		
		static GoldCost = 1600
		static from = [ 3047 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3262: class Item { //Enchantment: Furor		
		id = 3262		
		static GoldCost = 1475
		static from = [ 3047 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3263: class Item { //Enchantment: Distortion		
		id = 3263		
		static GoldCost = 1475
		static from = [ 3047 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3264: class Item { //Enchantment: Alacrity		
		id = 3264		
		static GoldCost = 1475
		static from = [ 3047 ]
		static stats = {
			Armor:{
				Flat:25
			},
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3265: class Item { //Enchantment: Homeguard		
		id = 3265		
		static GoldCost = 1675
		static from = [ 3111 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3266: class Item { //Enchantment: Captain		
		id = 3266		
		static GoldCost = 1800
		static from = [ 3111 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3267: class Item { //Enchantment: Furor		
		id = 3267		
		static GoldCost = 1675
		static from = [ 3111 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3268: class Item { //Enchantment: Distortion		
		id = 3268		
		static GoldCost = 1675
		static from = [ 3111 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3269: class Item { //Enchantment: Alacrity		
		id = 3269		
		static GoldCost = 1675
		static from = [ 3111 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			},
			MagicResist:{
				Flat:25
			}
		}
	},
	3270: class Item { //Enchantment: Homeguard		
		id = 3270		
		static GoldCost = 1275
		static from = [ 3117 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3271: class Item { //Enchantment: Captain		
		id = 3271		
		static GoldCost = 1400
		static from = [ 3117 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3272: class Item { //Enchantment: Furor		
		id = 3272		
		static GoldCost = 1275
		static from = [ 3117 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3273: class Item { //Enchantment: Distortion		
		id = 3273		
		static GoldCost = 1275
		static from = [ 3117 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3274: class Item { //Enchantment: Alacrity		
		id = 3274		
		static GoldCost = 1275
		static from = [ 3117 ]
		static stats = {
			MoveSpeed:{
				Flat:105
			}
		}
	},
	3275: class Item { //Enchantment: Homeguard		
		id = 3275		
		static GoldCost = 1475
		static from = [ 3158 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3276: class Item { //Enchantment: Captain		
		id = 3276		
		static GoldCost = 1600
		static from = [ 3158 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3277: class Item { //Enchantment: Furor		
		id = 3277		
		static GoldCost = 1475
		static from = [ 3158 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3278: class Item { //Enchantment: Distortion		
		id = 3278		
		static GoldCost = 1475
		static from = [ 3158 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3279: class Item { //Enchantment: Alacrity		
		id = 3279		
		static GoldCost = 1475
		static from = [ 3158 ]
		static stats = {
			MoveSpeed:{
				Flat:45
			}
		}
	},
	3280: class Item { //Enchantment: Homeguard		
		id = 3280		
		static GoldCost = 1475
		static from = [ 3009 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3281: class Item { //Enchantment: Captain		
		id = 3281		
		static GoldCost = 1600
		static from = [ 3009 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3282: class Item { //Enchantment: Furor		
		id = 3282		
		static GoldCost = 1475
		static from = [ 3009 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3283: class Item { //Enchantment: Distortion		
		id = 3283		
		static GoldCost = 1475
		static from = [ 3009 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3284: class Item { //Enchantment: Alacrity		
		id = 3284		
		static GoldCost = 1475
		static from = [ 3009 ]
		static stats = {
			MoveSpeed:{
				Flat:60
			}
		}
	},
	3290: class Item { //Twin Shadows		
		id = 3290		
		static GoldCost = 2400
		static from = [ 3108, 3113 ]
		active = true
		static stats = {
			AbilityPower:{
				Flat:80
			},
			MoveSpeed:{
				Percent:0.06
			}
		}
	},
	3301: class Item { //Ancient Coin		
		id = 3301		
		static GoldCost = 365
	},
	3302: class Item { //Relic Shield		
		id = 3302		
		static GoldCost = 365
		static stats = {
			HealthPoints:{
				Flat:75
			}
		}
	},
	3303: class Item { //Spellthief's Edge		
		id = 3303		
		static GoldCost = 365
		static stats = {
			AbilityPower:{
				Flat:5
			}
		}
	},
	3340: class Item { //Warding Totem (Trinket)		
		id = 3340		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3341: class Item { //Sweeping Lens (Trinket)		
		id = 3341		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3342: class Item { //Scrying Orb (Trinket)		
		id = 3342		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3345: class Item { //Soul Anchor (Trinket)		
		id = 3345		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3361: class Item { //Greater Stealth Totem (Trinket)		
		id = 3361		
		static GoldCost = 475
		static isTrinket = true
		static from = [ 3340 ]
		active = true
	},
	3362: class Item { //Greater Vision Totem (Trinket)		
		id = 3362		
		static GoldCost = 475
		static isTrinket = true
		static from = [ 3340 ]
		active = true
	},
	3363: class Item { //Farsight Orb (Trinket)		
		id = 3363		
		static GoldCost = 475
		static isTrinket = true
		static from = [ 3342 ]
		active = true
	},
	3364: class Item { //Oracle's Lens (Trinket)		
		id = 3364		
		static GoldCost = 475
		static isTrinket = true
		static from = [ 3341 ]
		active = true
	},
	3401: class Item { //Face of the Mountain		
		id = 3401		
		static GoldCost = 2200
		static from = [ 3097, 3067 ]
		static stats = {
			HealthPoints:{
				Flat:500
			}
		}
	},
	3405: class Item { //Bonetooth Necklace		
		id = 3405		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3406: class Item { //Bonetooth Necklace		
		id = 3406		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3407: class Item { //Bonetooth Necklace		
		id = 3407		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3408: class Item { //Bonetooth Necklace		
		id = 3408		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3409: class Item { //Bonetooth Necklace		
		id = 3409		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3410: class Item { //Head of Kha'Zix		
		id = 3410		
		static GoldCost = 0
		static isTrinket = true
		static from = [ 3169 ]
		active = true
	},
	3411: class Item { //Bonetooth Necklace		
		id = 3411		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3412: class Item { //Bonetooth Necklace		
		id = 3412		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3413: class Item { //Bonetooth Necklace		
		id = 3413		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3414: class Item { //Bonetooth Necklace		
		id = 3414		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3415: class Item { //Bonetooth Necklace		
		id = 3415		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3416: class Item { //Head of Kha'Zix		
		id = 3416		
		static GoldCost = 0
		static isTrinket = true
		static from = [ 3169 ]
		active = true
	},
	3417: class Item { //Bonetooth Necklace		
		id = 3417		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3418: class Item { //Bonetooth Necklace		
		id = 3418		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3419: class Item { //Bonetooth Necklace		
		id = 3419		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3420: class Item { //Bonetooth Necklace		
		id = 3420		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3421: class Item { //Bonetooth Necklace		
		id = 3421		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3422: class Item { //Head of Kha'Zix		
		id = 3422		
		static GoldCost = 0
		static isTrinket = true
		static from = [ 3169 ]
		active = true
	},
	3450: class Item { //Bonetooth Necklace		
		id = 3450		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3451: class Item { //Bonetooth Necklace		
		id = 3451		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3452: class Item { //Bonetooth Necklace		
		id = 3452		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3453: class Item { //Bonetooth Necklace		
		id = 3453		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3454: class Item { //Bonetooth Necklace		
		id = 3454		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3455: class Item { //Head of Kha'Zix		
		id = 3455		
		static GoldCost = 0
		static isTrinket = true
		static from = [ 3169 ]
		active = true
	},
	3460: class Item { //Golden Transcendence		
		id = 3460		
		static GoldCost = 0
		static isTrinket = true
		active = true
	},
	3504: class Item { //Ardent Censer		
		id = 3504		
		static GoldCost = 2100
		static from = [ 3114, 3113 ]
		static stats = {
			AbilityPower:{
				Flat:40
			}
		}
	},
	3508: class Item { //Essence Reaver		
		id = 3508		
		static GoldCost = 3200
		static from = [ 1053, 1038 ]
		static stats = {
			AttackDamage:{
				Flat:80
			},
			LifeSteal:{
				Percent:0.1
			}
		}
	},
	3599: class Item { //The Black Spear		
		id = 3599		
		static GoldCost = 0
		active = true
	},
	3706: class Item { //Stalker's Blade		
		id = 3706		
		static GoldCost = 750
		static from = [ 1039 ]
	},
	3707: class Item { //Enchantment: Warrior		
		id = 3707		
		static GoldCost = 2250
		static from = [ 3706, 3134 ]
	},
	3708: class Item { //Enchantment: Magus		
		id = 3708		
		static GoldCost = 2250
		static from = [ 3706, 3108 ]
	},
	3709: class Item { //Enchantment: Juggernaut		
		id = 3709		
		static GoldCost = 2250
		static from = [ 3706, 3067, 1028 ]
	},
	3710: class Item { //Enchantment: Devourer		
		id = 3710		
		static GoldCost = 2250
		static from = [ 3706, 1042, 1042 ]
	},
	3711: class Item { //Poacher's Knife		
		id = 3711		
		static GoldCost = 750
		static from = [ 1039 ]
	},
	3713: class Item { //Ranger's Trailblazer		
		id = 3713		
		static GoldCost = 750
		static from = [ 1039 ]
	},
	3714: class Item { //Enchantment: Warrior		
		id = 3714		
		static GoldCost = 2250
		static from = [ 3715, 3134 ]
	},
	3715: class Item { //Skirmisher's Sabre		
		id = 3715		
		static GoldCost = 750
		static from = [ 1039 ]
	},
	3716: class Item { //Enchantment: Magus		
		id = 3716		
		static GoldCost = 2250
		static from = [ 3715, 3108 ]
	},
	3717: class Item { //Enchantment: Juggernaut		
		id = 3717		
		static GoldCost = 2250
		static from = [ 3715, 3067, 1028 ]
	},
	3718: class Item { //Enchantment: Devourer		
		id = 3718		
		static GoldCost = 2250
		static from = [ 3715, 1042, 1042 ]
	},
	3719: class Item { //Enchantment: Warrior		
		id = 3719		
		static GoldCost = 2250
		static from = [ 3711, 3134 ]
	},
	3720: class Item { //Enchantment: Magus		
		id = 3720		
		static GoldCost = 2250
		static from = [ 3711, 3108 ]
	},
	3721: class Item { //Enchantment: Juggernaut		
		id = 3721		
		static GoldCost = 2250
		static from = [ 3711, 3067, 1028 ]
	},
	3722: class Item { //Enchantment: Devourer		
		id = 3722		
		static GoldCost = 2250
		static from = [ 3711, 1042, 1042 ]
	},
	3723: class Item { //Enchantment: Warrior		
		id = 3723		
		static GoldCost = 2250
		static from = [ 3713, 3134 ]
	},
	3724: class Item { //Enchantment: Magus		
		id = 3724		
		static GoldCost = 2250
		static from = [ 3713, 3108 ]
	},
	3725: class Item { //Enchantment: Juggernaut		
		id = 3725		
		static GoldCost = 2250
		static from = [ 3713, 3067, 1028 ]
	},
	3726: class Item { //Enchantment: Devourer		
		id = 3726		
		static GoldCost = 2250
		static from = [ 3713, 1042, 1042 ]
	},
	3800: class Item { //Righteous Glory		
		id = 3800		
		static GoldCost = 2500
		static from = [ 3010, 3801 ]
		active = true
		static stats = {
			HealthPoints:{
				Flat:500
			},
			ManaPoints:{
				Flat:300
			}
		}
	},
	3801: class Item { //Crystalline Bracer		
		id = 3801		
		static GoldCost = 600
		static from = [ 1028, 1006 ]
		static stats = {
			HealthPoints:{
				Flat:200
			}
		}
	}
};

module.exports = ItemList;
