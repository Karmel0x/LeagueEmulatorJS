/*
var StatsUnit = require('./Unit');

class turretsTypes {
	static OUTER_TURRET = 0;
	static INNER_TURRET = 1;
	static INHIBITOR_TURRET = 2;
	static FOUNTAIN_TURRET = 3;
	static NEXUS_TURRET = 4;
}

class StatsTurret extends StatsUnit {

    getTurretStats(turret){

        this.Armor.BaseValue = 100.0;
        this.MagicResist.BaseValue = 100.0;

        switch(turret.type)
        {
            case(turretsTypes.OUTER_TURRET):
            {
                this.HealthPoints.BaseValue = 2000;
                this.AttackDamage.BaseValue = 100;
                this.Range.BaseValue = 905.0;
                this.AttackSpeed.BaseValue = 0.83;
                this.AttackDamage.BaseValue = 152.0;
                break;
            }
            case(turretsTypes.INNER_TURRET):
            {
                this.HealthPoints.BaseValue = 2000;
                this.Range.BaseValue = 905;
                this.AttackSpeed.BaseValue = 0.83;
                this.AttackDamage.BaseValue = 170.0;
                break;
            }
            case(turretsTypes.INHIBITOR_TURRET):
            {
                this.HealthPoints.BaseValue = 2500;
                this.HealthRegeneration.BaseValue = 5;
                //this.ArmorPenetration.PercentBonus = 0.825;
                this.Range.BaseValue = 905.0;
                this.AttackSpeed.BaseValue = 0.83;
                this.AttackDamage.BaseValue = 190.0;
                break;
            }
            case(turretsTypes.FOUNTAIN_TURRET):
            {
                this.AttackSpeed.BaseValue = 1.6;
                //this.GrowthAttackSpeed.BaseValue = 2.125;
                this.HealthPoints.BaseValue = 9999;
                this.AttackDamage.BaseValue = 999.0;
                this.Range.BaseValue = 1250.0;
                break;
            }
            case(turretsTypes.NEXUS_TURRET):
            {
                this.HealthPoints.BaseValue = 2500;
                this.HealthRegeneration.BaseValue = 5;
                //this.ArmorPenetration.PercentBonus = 0.825;
                this.Range.BaseValue = 905.0;
                this.AttackSpeed.BaseValue = 0.83;
                this.AttackDamage.BaseValue = 180.0;
                break;
            }
        }
    }
}

module.exports = StatsTurret;

*/