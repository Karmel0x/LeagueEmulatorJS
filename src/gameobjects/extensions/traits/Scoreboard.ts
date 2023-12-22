import Player from '../../units/Player';

export default class Scoreboard {

    constructor(owner: Player) {
        this.owner = owner;
    }

    kills = 0;
    deaths = 0;
    assists = 0;
    creepScore = 0;

    respawnAt = 0;
    lastRespawnTime = 0;
    totalRespawnTime = 0;

}
