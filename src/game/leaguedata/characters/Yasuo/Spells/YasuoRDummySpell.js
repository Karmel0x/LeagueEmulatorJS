
const _Spell = require("../../../../datamethods/spells/_Spell");
const TempYasuoRMissile = require("./TempYasuoRMissile");
const Skillshot = require("../../../../../gameobjects/missiles/Skillshot");
const slotId = require("../../../../../constants/slotId");


module.exports = class YasuoRDummySpell extends _Spell {

	spellSlot = slotId.Qm;

	castInfo = {
		designerCastTime: -1,
		designerTotalTime: 0.7,
	};

	static childSpellList = [
		TempYasuoRMissile,
	];

	onCast(spellData) {

		spellData.spellCast._CastInfo.target = [{
			unit: this.owner.netId,
			hitResult: 1,
		}];

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
				if (skillshot.owner == target || collidedWith.includes(target))
					return;

				collidedWith.push(target);

				skillshot.owner.combat.attack(target);
				//if(target.moving.knockUp)
				//	target.moving.knockUp({
				//		duration: 0.75,
				//		parabolicGravity: 16.5,
				//		facing: 1,
				//	});
			},
		};
		this.collidedWith = collidedWith;

		spellData.missile = skillshot;
	}
};
