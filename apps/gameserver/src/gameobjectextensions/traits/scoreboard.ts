import type Hero from '../../gameobjects/unit-ai/hero';
import { AiSubType, AiType } from '../../gameobjects/unit-ai/types';

export default class Scoreboard {
    readonly owner;

    constructor(owner: Hero) {
        this.owner = owner;

        const unit = owner.owner;

        unit.eventEmitter.on('kill', (target) => {
            if (target.ai.type === AiType.Hero) {
                this.kills++;
            }
            else if (target.ai.type === AiType.Minion) {
                this.minionsKilled++;
            }
            else if (target.ai.type === AiType.Building && target.ai.subType === AiSubType.Turret) {
                this.turretsDestroyed++;
            }
        });

        unit.eventEmitter.on('death', (source, assists) => {
            this.deaths++;
        });

        unit.eventEmitter.on('assist', (target) => {
            if (target.ai.type === AiType.Hero) {
                this.assists++;
            }
        });
    }

    kills = 0;
    deaths = 0;
    assists = 0;
    minionsKilled = 0;
    turretsDestroyed = 0;

    respawnAt = 0;
    lastRespawnTime = 0;
    totalRespawnTime = 0;

}
