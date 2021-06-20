
module.exports = {
	PLAYER: {
		team: {
			UNKNOWN: {
				id: 0
			},
			BLUE: {//ORDER
				id: 100,
				spawn: [
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
				],
				respawn: {position: {X: 25.9, Y: 280}, rotation: 0},
			},
			RED: {//CHAOS
				id: 200,
				spawn: [
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
				],
				respawn: {position: {X: 13948, Y: 14202}, rotation: 0},
			},
			NEUTRAL: {
				id: 300,
			},
			MAX: {
				id: 400,
			}
		},
		stats: {

		},
	},
	MINION: {
		team: {
			BLUE: {
				id: 0x64,
				spawn: [
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
					{position: {X: 25.9, Y: 280}, rotation: 0},
				],
				respawn: {position: {X: 25.9, Y: 280}, rotation: 0},
			},
			RED: {
				id: 0xC8,
				spawn: [
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
					{position: {X: 13948, Y: 14202}, rotation: 0},
				],
				respawn: {position: {X: 13948, Y: 14202}, rotation: 0},
			},
			NEUTRAL: {
				id: 0x12C,
			}
		},
		stats: {
			MALEE: {
				Base: {
					FactorHPRegen: 0,
					StaticHPRegen: 0,
					FactorHMPRegen: 0,
					StaticMPRegen: 0,
					HP: 455,
					MP: 0,
					CritChance: 0,
					MoveSpeed: 325,
					AttackSpeed: 1.6,
					AttackRange: 110,
					Armor: 0,
					Damage: 12.0,
					ExpGivenOnDeath: 77.0,
					Dodge: 0,
					GoldGivenOnDeath: 20.0,
				},
				PerLevel: {
					AttackSpeed: 0,
					HP: 0,
					MP: 0,
					Crit: 0,
					Damage: 0,
					Armor: 0,
				},
				other: {
					GameplayCollisionRadius: 48.0,
				},
			},
			CASTER: {
				Base: {
					FactorHPRegen: 0,
					StaticHPRegen: 0,
					FactorHMPRegen: 0,
					StaticMPRegen: 0,
					HP: 290,
					MP: 0,
					CritChance: 0,
					MoveSpeed: 325,
					AttackSpeed: 1.6,
					AttackRange: 550,
					Armor: 15,
					Damage: 23.0,
					ExpGivenOnDeath: 51.0,
					Dodge: 0,
					GoldGivenOnDeath: 10.0,
				},
				PerLevel: {
					AttackSpeed: 0,
					HP: 0,
					MP: 0,
					Crit: 0,
					Damage: 0,
					Armor: 0,
				},
				other: {
					GameplayCollisionRadius: 48.0,
				},
			},
			CANNON: {
				Base: {
					FactorHPRegen: 0,
					StaticHPRegen: 0,
					FactorHMPRegen: 0,
					StaticMPRegen: 0,
					HP: 700,
					MP: 0,
					CritChance: 0,
					MoveSpeed: 325,
					AttackSpeed: 2.0,
					AttackRange: 300,
					Armor: 15,
					Damage: 40.0,
					ExpGivenOnDeath: 94.0,
					Dodge: 0,
					GoldGivenOnDeath: 35.0,
				},
				PerLevel: {
					AttackSpeed: 0,
					HP: 0,
					MP: 0,
					Crit: 0,
					Damage: 0,
					Armor: 0,
				},
				other: {
					GameplayCollisionRadius: 65.0,
				},
			},
			SUPER: {
				Base: {
					FactorHPRegen: 0.00150,
					StaticHPRegen: 10,
					FactorHMPRegen: 0,
					StaticMPRegen: 0,
					HP: 1500,
					MP: 0,
					CritChance: 0,
					MoveSpeed: 325,
					AttackSpeed: 2.0,
					AttackRange: 170,
					Armor: 30,
					Damage: 180.0,
					ExpGivenOnDeath: 500.0,
					Dodge: 0,
					GoldGivenOnDeath: 150.0,
				},
				PerLevel: {
					AttackSpeed: 0,
					HP: 0,
					MP: 0,
					Crit: 0,
					Damage: 0,
					Armor: 0,
				},
				other: {
					GameplayCollisionRadius: 65.0,
				},
			},
		},
		respawnTime: false,
		other: {
			ExpRadius: 1400,
			GoldRadius: 1400,
		},
	},
	MONSTER: {
		respawnTime: 20,
	},
	TURRET: {
		respawnTime: false,
	},
};
//MeleeDefaultMinionInfo, l_0_0 = l_0_0, {DefaultNumPerWave = 3, Armor = 0, ArmorUpgrade = 1, MagicResistance = 0, MagicResistanceUpgrade = 0.625, HPBonus = 0, HPUpgrade = 10, HPInhibitor = 0, DamageBonus = 0, DamageUpgrade = 0.5, DamageInhibitor = 0, ExpGiven = 64, ExpBonus = 0, ExpUpgrade = 0, ExpInhibitor = 0, GoldGiven = 18.8, GoldBonus = 0, GoldUpgrade = 0.2, GoldInhibitor = 0, GoldShared = 0, GoldShareUpgrade = 0, GoldMaximumBonus = 12, LocalGoldGiven = 0, LocalGoldBonus = 0}
//CasterDefaultMinionInfo, l_0_0 = l_0_0, {DefaultNumPerWave = 3, Armor = 0, ArmorUpgrade = 0.625, MagicResistance = 0, MagicResistanceUpgrade = 1, HPBonus = 0, HPUpgrade = 7.5, HPInhibitor = 0, DamageBonus = 0, DamageUpgrade = 1, DamageInhibitor = 0, ExpGiven = 32, ExpBonus = 0, ExpUpgrade = 0, ExpInhibitor = 0, GoldGiven = 13.8, GoldBonus = 0, GoldUpgrade = 0.2, GoldInhibitor = 0, GoldShared = 0, GoldShareUpgrade = 0, GoldMaximumBonus = 8, LocalGoldGiven = 0, LocalGoldBonus = 0}
//CannonDefaultMinionInfo, l_0_0 = l_0_0, {DefaultNumPerWave = 0, Armor = 0, ArmorUpgrade = 1.5, MagicResistance = 0, MagicResistanceUpgrade = 1.5, HPBonus = 0, HPUpgrade = 13.5, HPInhibitor = 0, DamageBonus = 0, DamageUpgrade = 1.5, DamageInhibitor = 0, ExpGiven = 100, ExpBonus = 0, ExpUpgrade = 0, ExpInhibitor = 0, GoldGiven = 39.5, GoldBonus = 0, GoldUpgrade = 0.5, GoldInhibitor = 0, GoldShared = 0, GoldShareUpgrade = 0, GoldMaximumBonus = 30, LocalGoldGiven = 0, LocalGoldBonus = 0}
//SuperDefaultMinionInfo, l_0_0 = l_0_0, {DefaultNumPerWave = 0, Armor = 0, ArmorUpgrade = 0, MagicResistance = 0, MagicResistanceUpgrade = 0, HPBonus = 0, HPUpgrade = 100, HPInhibitor = 0, DamageBonus = 0, DamageUpgrade = 5, DamageInhibitor = 0, ExpGiven = 100, ExpBonus = 0, ExpUpgrade = 0, ExpInhibitor = 0, GoldGiven = 39.5, GoldBonus = 0, GoldUpgrade = 0.5, GoldInhibitor = 0, GoldShared = 0, GoldShareUpgrade = 0, GoldMaximumBonus = 30, LocalGoldGiven = 0, LocalGoldBonus = 0}
