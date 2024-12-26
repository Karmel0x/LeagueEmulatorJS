import { Vector2 } from 'three';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerFlash extends _Spell {

	summonerSpellKey = 4;
	summonerSpellName = 'Flash';
	spellHash = 105475752;

	cooldown = 0;//300;
	cost = 0;
	range = 425;


	onCast(spellData: SpellData) {
		if (!spellData.packet)
			return;

		super.onCast(spellData);

		let pos = new Vector2(spellData.packet.position.x, spellData.packet.position.y);
		this.owner.moving.teleport(pos);
	}
}
