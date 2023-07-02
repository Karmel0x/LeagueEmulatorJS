
const slotId = require('../../../../../constants/slotId');
const Skillshot = require("../../../../../gameobjects/missiles/Skillshot");
const _Spell = require("../../../../datamethods/spells/_Spell");
const package1 = require('../package');
const YasuoQ3Mis = require("./YasuoQ3Mis");


module.exports = class YasuoQ3 extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;
	windup = 0;

	castInfo = {
		designerCastTime: 0.35,
		designerTotalTime: 0.5,
		bitfield: {
			isOverrideCastPosition: true,
		},

		// facing is not working without these two ??
		spellSlot: 0,
		target: [],
		//spellSlot: 46,// <- original packet
		//target: [{ unit: this.owner.netId, hitResult: 0 }],// <- original packet

	};

	static childSpellList = [
		YasuoQ3Mis,
	];

	onCast(spellData) {
		super.onCast(spellData);

		let skillshotTargetPosition = spellData.anglePosition.add(this.owner.position);
		let skillshot = Skillshot.create(this.owner, skillshotTargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});

		/** @type {number[]} */
		let collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: skillshot.options.radius,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.combat.attack(target);
				if (target.moving)
					target.moving.knockUp({
						duration: 0.75,
						parabolicGravity: 16.5,
						facing: 1,
					});
			},
		};
		spellData.missile = skillshot;

	}
};
