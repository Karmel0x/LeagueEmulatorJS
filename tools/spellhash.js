const { HashStringObject } = require("../Functions/HashString");


const spellHash = {
	SummonerBarrier: 0, // Barrier
	SummonerBoost: 0, // Cleanse
	SummonerClairvoyance: 0, // Clairvoyance
	SummonerDot: 0, // Ignite
	SummonerExhaust: 0, // Exhaust
	SummonerFlash: 0, // Flash
	SummonerHaste: 0, // Ghost
	SummonerHeal: 0, // Heal
	SummonerMana: 0, // Clarity
	SummonerOdinGarrison: 0, // OdinGarrison
	SummonerRevive: 0, // Revive
	SummonerSmite: 0, // Smite
	SummonerTeleport: 0, // Teleport

	YasuoQ: 0,
	YasuoQ2: 0,
	YasuoQ3: 0,
	YasuoQW: 0,
	YasuoQ2W: 0,
	YasuoQ3W: 0,
};

HashStringObject(spellHash);
console.log(spellHash);


const packageHash = {
	'[Character]Ezreal00': 0,
	'[Character]Yasuo00': 0,
};

HashStringObject(packageHash, true);
console.log(packageHash);
