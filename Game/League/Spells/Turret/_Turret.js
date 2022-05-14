
const spellHash = {
	//HA_AP_ChaosTurretBasicAttack: 199991003,
	//HA_AP_ChaosTurret2BasicAttack: 42476875,
	//HA_AP_ChaosTurret3BasicAttack: 43525451,
	//HA_AP_ChaosTurretShrineBasicAttack: 256009787,
	//HA_AP_ChaosTurretTutorialBasicAttack: 215545067,
	//HA_AP_OrderShrineTurretBasicAttack: 85299451,
	//HA_AP_OrderTurretBasicAttack: 31221787,
	//HA_AP_OrderTurret2BasicAttack: 32983531,
	//HA_AP_OrderTurret3BasicAttack: 31934955,
	//HA_AP_OrderTurretTutorialBasicAttack: 221134555,
	//SRUAP_Turret_Chaos1BasicAttack: 113239723,
	//SRUAP_Turret_Chaos2BasicAttack: 105899691,
	//SRUAP_Turret_Chaos3BasicAttack: 106948267,
	//SRUAP_Turret_Chaos3_TestBasicAttack: 266242091,
	//SRUAP_Turret_Chaos4BasicAttack: 107996843,
	//SRUAP_Turret_Chaos5BasicAttack: 109045419,
	//SRUAP_Turret_Order1BasicAttack: 94405643,
	//SRUAP_Turret_Order2BasicAttack: 89162763,
	//SRUAP_Turret_Order3BasicAttack: 88114187,
	//SRUAP_Turret_Order3_TestBasicAttack: 99450379,
	//SRUAP_Turret_Order4BasicAttack: 91259915,
	//SRUAP_Turret_Order5BasicAttack: 90211339,
	//ARAMChaosTurretFrontBasicAttack: 67858443,
	//ARAMChaosTurretInhibBasicAttack: 237744011,
	//ARAMChaosTurretNexusBasicAttack: 221964187,
	//ARAMChaosTurretNexusBasicAttack2: 61765938,
	//ARAMChaosTurretShrineBasicAttack: 262309611,
	//ARAMOrderTurretFrontBasicAttack: 111676763,
	//ARAMOrderTurretFrontBasicAttack2: 176215426,
	//ARAMOrderTurretInhibBasicAttack: 210252027,
	//ARAMOrderTurretNexusBasicAttack: 262117611,
	//ARAMOrderTurretShrineBasicAttack: 93679883,
	//ChaosTurretGiantBasicAttack: 209921147,
	//ChaosTurretNormalBasicAttack: 129592923,
	//ChaosTurretShrineBasicAttack: 120036971,
	//ChaosTurretTutorialBasicAttack: 188566667,
	//ChaosTurretWorm2BasicAttack: 161626731,
	ChaosTurretWormBasicAttack: 163135275,
	//ChaosTurretWormBasicAttack2: 194245234,
	//OdinChaosTurretShrineBasicAttack: 203785787,
	//OdinOrderTurretShrineBasicAttack: 102002939,
	//OrderTurretAngelBasicAttack: 60874923,
	//OrderTurretDragonBasicAttack: 267651435,
	//OrderTurretNormal2BasicAttack: 44011291,
	//OrderTurretNormalBasicAttack: 32171131,
	//OrderTurretNormalBasicAttack2: 246302706,
	//OrderTurretShrineBasicAttack: 219576203,
	//OrderTurretTutorialBasicAttack: 147809979,
	//SRTurretSecondaryShielderBuff: 199551254,
	//SRTurretShielderLines: 246722627,
	//TestTurretBasicAttack: 261659947,
	//TT_ChaosTurret1BasicAttack: 236345211,
	//TT_ChaosTurret2BasicAttack: 249976699,
	//TT_ChaosTurret3BasicAttack: 251025275,
	//TT_ChaosTurret4BasicAttack: 247879547,
	//TT_OrderTurret1BasicAttack: 220806107,
	//TT_OrderTurret2BasicAttack: 232340443,
	//TT_OrderTurret3BasicAttack: 231291867,
	//TT_OrderTurret4BasicAttack: 234437595,
	//'Turret Idle': 203240613,
	//'Turret Shield': 207058996,
	//TurretFortification: 121146702,
	//TurretInitialArmor: 191963730,
  
};
const particleHash = {
};
const boneHash = {
};

{
	// just for development
	const { HashStringObject } = require("../../../../Functions/HashString");
	HashStringObject(spellHash);
	HashStringObject(particleHash);
	HashStringObject(boneHash);
}

module.exports = class _Turret {
	PackageHash = 465603924;

    static hashes = {
        spellHash, particleHash, boneHash
    };

};
