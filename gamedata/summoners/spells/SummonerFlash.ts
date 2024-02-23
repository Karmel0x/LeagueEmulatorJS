import { Vector2 } from 'three';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';


export default class SummonerFlash extends _Spell {
	summonerSpellKey = 4;
	summonerSpellName = 'Flash';
	spellHash = 105475752;

	cooldown = 0;//300;
	cost = 0;
	range = 425;


	onCast(spellData) {
		super.onCast(spellData);

		let pos = new Vector2(spellData.packet.position.x, spellData.packet.position.y);
		this.owner.moving.teleport(pos);
	}
}
