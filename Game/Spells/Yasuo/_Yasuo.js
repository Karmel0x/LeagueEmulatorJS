const _Spell = require('../_Spell');

const spellHash = {
	YasuoQ: 0,
	YasuoQ2: 0,
	YasuoQ3: 0,
	YasuoQW: 0,
	YasuoQ2W: 0,
	YasuoQ3W: 0,
	YasuoQMis: 0,
	YasuoQ2Mis: 0,
	YasuoQ3Mis: 0,

	YasuoWMovingWall: 0,
	YasuoDashWrapper: 0,

	YasuoRKnockUpComboW: 0,
	YasuoRDummySpell: 0,
	TempYasuoRMissile: 0,
};
const particleHash = {
	'Yasuo_Base_Q3_Hand.troy': 0,
	'Yasuo_Base_Q3_cast_sound.troy': 0,
};
const boneHash = {
	//'root': 0,
	'L_HAND': 119924804,
};

{
	// just for development
	const { HashStringObject } = require("../../../Functions/HashString");
	HashStringObject(spellHash);
	HashStringObject(particleHash);
	HashStringObject(boneHash);
}

module.exports = class _Yasuo extends _Spell {
	PackageHash = 3275499062;

    static hashes = {
        spellHash, particleHash, boneHash
    };

};
