var ConstantsUnit = require('../../../Constants/Unit');
const {createPacket, sendPacket} = require("../../../Core/PacketUtilities");
var IStat = require('./IStat');
//const ChampionsStats = require('./ChampionsStats')


class StatsUnit {

	constructor(parent, defaultValues = {}){
		this.parent = parent;

		//if(parent.constructor.name == 'Player')
		//{
		//    defaultValues = ChampionsStats[parent.champion]
		//    this.Levelling = defaultValues.LevelUp
		//}
		//else
		//    defaultValues = {}

		this.MoveSpeed = new IStat(defaultValues.MoveSpeed || 325);
		this.AttackSpeed = new IStat(defaultValues.AttackSpeed || 0.625);
		this.Range = new IStat(defaultValues.Range || 750);
		this.AttackDamage = new IStat(defaultValues.AttackDamage || 50);
		this.AbilityPower = new IStat(defaultValues.AbilityPower || 0);
		this.CriticalChance = new IStat(defaultValues.CriticalChance || 0);
		this.Armor = new IStat(defaultValues.Armor || 0);
		this.MagicResist = new IStat(defaultValues.MagicResist || 0);
		this.HealthRegeneration = new IStat(defaultValues.HealthRegeneration || 0);
		this.ManaRegeneration = new IStat(defaultValues.ManaRegeneration || 0);
		this.AttackSpeedMultiplier = new IStat(defaultValues.AttackSpeedMultiplier || 1);// ? (+ 1)
		this.CooldownReduction = new IStat(defaultValues.CooldownReduction || 0);
		this.LifeSteal = new IStat(defaultValues.LifeSteal || 0);
		this.SpellVamp = new IStat(defaultValues.SpellVamp || 0);
		this.Tenacity = new IStat(defaultValues.Tenacity || 0);

		this.HealthPoints = new IStat(defaultValues.HealthPoints || 400);
		this.ManaPoints = new IStat(defaultValues.ManaPoints || 300);
		this.CurrentHealth = this.HealthPoints.Total;
		this.CurrentMana = this.ManaPoints.Total;

		this.PerceptionRange = new IStat(defaultValues.PerceptionRange || 1);
		this.Size = new IStat(defaultValues.Size || 1);
		this.sightRange = new IStat(defaultValues.sightRange || 1350);

	}

	increaseStats(stats){
		Object.keys(stats).forEach(stat => {
			if(stats[stat].Flat)
				this[stat].FlatBonus += stats[stat].Flat;

			if(stats[stat].Percent)
				this[stat].PercentBonus += stats[stat].Percent;
		});
	}

	decreaseStats(stats){
		Object.keys(stats).forEach(stat => {
			if(stats[stat].Flat)
				this[stat].FlatBonus -= stats[stat].Flat;

			if(stats[stat].Percent)
				this[stat].PercentBonus -= stats[stat].Percent;
		});
	}
}


module.exports = StatsUnit;
