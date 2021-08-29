var MoveableUnit = require('./MoveableUnit');
const { Vector2 } = require('three');

var lanePaths = {
	BLUE: [
		[
			new Vector2(917, 1725),
			new Vector2(1170, 4041),
			new Vector2(861, 6459),
			new Vector2(880, 10180),
			new Vector2(1268, 11675),
			new Vector2(2806, 13075),
			new Vector2(3907, 13243),
			new Vector2(7550, 13407),
			new Vector2(10244, 13238),
			new Vector2(10947, 13135),
			new Vector2(12511, 12776)
		],
		[
			new Vector2(1418, 1686),
			new Vector2(2997, 2781),
			new Vector2(4472, 4727),
			new Vector2(8375, 8366),
			new Vector2(10948, 10821),
			new Vector2(12511, 12776)
		],
		[
			new Vector2(1487, 1302),
			new Vector2(3789, 1346),
			new Vector2(6430, 1005),
			new Vector2(10995, 1234),
			new Vector2(12841, 3051),
			new Vector2(13148, 4202),
			new Vector2(13249, 7884),
			new Vector2(12886, 10356),
			new Vector2(12511, 12776)
		],
	],
	RED: [
		[
			new Vector2(12451, 13217),
			new Vector2(10947, 13135),
			new Vector2(10244, 13238),
			new Vector2(7550, 13407),
			new Vector2(3907, 13243),
			new Vector2(2806, 13075),
			new Vector2(1268, 11675),
			new Vector2(880, 10180),
			new Vector2(861, 6459),
			new Vector2(1170, 4041),
			new Vector2(1418, 1686)
		],
		[
			new Vector2(12511, 12776),
			new Vector2(10948, 10821),
			new Vector2(8375, 8366),
			new Vector2(4472, 4727),
			new Vector2(2997, 2781),
			new Vector2(1418, 1686)
		],
		[
			new Vector2(13062, 12760),
			new Vector2(12886, 10356),
			new Vector2(13249, 7884),
			new Vector2(13148, 4202),
			new Vector2(12841, 3051),
			new Vector2(10995, 1234),
			new Vector2(6430, 1005),
			new Vector2(3789, 1346),
			new Vector2(1418, 1686)
		],
	],
};


class Minion extends MoveableUnit {
	constructor(team, num = 0, character = '', config = {}){
		super(team, num, character, config);
		
		const _Character_ = require('../../Characters/Minions/' + character);
		this.character = new _Character_(this);
		this.character.model = team.toCapitalCase() + '_Minion_' + character;
		
		this.initialized();
	}
	spawn(){
		let pos = this.barrack.position;
		this.Waypoints[0] = new Vector2(pos.x, pos.y);
		this.barrack.spawnUnitAns(this.netId, this.character.id);

		super.spawn();
		this.moveLane(this.barrack.team, this.barrack.num);
	}
	static getFromNearestToEnd(position, arrayVector2){
		var nearest = 0;
		arrayVector2.reduce((previousValue, currentValue, index) => {
			let dist = position.distanceTo(currentValue);
			if(dist < previousValue){
				nearest = index;
				return dist;
			}
			return previousValue;
		}, 25000);
		return arrayVector2.slice(nearest);
	}
	moveLane(team, num){
		var lanePath = lanePaths[team][num].map(a => a.clone());
		lanePath = Minion.getFromNearestToEnd(this.position, lanePath);

		this.setWaypoints(lanePath);
	}
}


module.exports = Minion;
