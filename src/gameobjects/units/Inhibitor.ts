
import packets from '../../packets/index';
import loadingStages from '../../constants/loadingStages';
import EVENT from '../../packets/EVENT';

import Unit from './Unit';
import Defendable from '../extensions/combat/Defendable';

import { InhibitorOptions, AttackableUnit } from '../GameObjects';


export default class Inhibitor extends Unit {
	static initialize(options: InhibitorOptions) {
		return super.initialize(options) as Inhibitor;
	}

	combat!: Defendable;

	loader(options: InhibitorOptions) {
		super.loader(options);

		this.combat = new Defendable(this);

		this.initialized();
	}

	constructor(options: InhibitorOptions) {
		super(options);
	}

	announceDie(source: AttackableUnit) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnDampenerDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);

		const packet2 = new packets.Building_Die();
		packet2.netId = this.netId;
		packet2.attackerNetId = source.netId;
		this.packets.toEveryone(packet2);
	}

	async onDie(source: AttackableUnit) {
		this.announceDie(source);
	}

	spawn() {
		const packet1 = new packets.OnEnterVisibilityClient();
		packet1.netId = this.netId;
		packet1.isTurret = true;
		this.packets.toEveryone(packet1, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

}
