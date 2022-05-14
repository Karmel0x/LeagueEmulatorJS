
const spellHash = {
	EzrealMysticShot: 25116740,
	EzrealMysticShotMissile: 100572389,
	
	EzrealEssenceFlux: 0,
	EzrealEssenceFluxMissile: 0,
	
	EzrealArcaneShift: 0,
	EzrealArcaneShiftMissile: 0,
	
	EzrealTrueshotBarrage: 0,
};
const particleHash = {
	'ezreal_bow.troy': 238891465,
	'ezreal_bow_yellow.troy': 0,
	'Ezreal_bow_huge.troy': 0,
};
const boneHash = {
	'L_HAND': 119924804,
};

{
	// just for development
	const { HashStringObject } = require("../../../../Functions/HashString");
	HashStringObject(spellHash);
	HashStringObject(particleHash);
	HashStringObject(boneHash);
}

module.exports = class _Ezreal {
	PackageHash = 2618078626;//[Character]Ezreal00

    static hashes = {
        spellHash, particleHash, boneHash
    };

};
