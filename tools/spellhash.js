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
};

HashStringObject(spellHash);
console.log(spellHash);
