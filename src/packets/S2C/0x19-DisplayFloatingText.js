import BasePacket from '../BasePacket.js';

export default class DisplayFloatingText extends BasePacket {
	static types = {
		invulnerable: 0,
		special: 1,
		heal: 2,
		manaHeal: 3,
		manaDamage: 4,
		dodge: 5,
		physicalDamageCritical: 6,
		magicalDamageCritical: 7,
		trueDamageCritical: 8,
		experience: 9,
		gold: 10,
		level: 11,
		disable: 12,
		questReceived: 13,
		questComplete: 14,
		score: 15,
		physicalDamage: 16,
		magicalDamage: 17,
		trueDamage: 18,
		enemyPhysicalDamage: 19,
		enemyMagicalDamage: 20,
		enemyTrueDamage: 21,
		enemyPhysicalDamageCritical: 22,
		enemyMagicalDamageCritical: 23,
		enemyTrueDamageCritical: 24,
		countdown: 25,
		omw: 26,
		absorbed: 27,
		debug: 28,
	};
	static struct = {
		targetNetId: 'uint32',
		floatTextType: 'uint32',
		param: 'int32',
		message: 'string0',//128
	};
}
