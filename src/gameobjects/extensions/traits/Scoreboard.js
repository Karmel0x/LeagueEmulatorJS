
module.exports = class Scoreboard {

    /**
     * 
     * @param {import('../../units/Player')} owner 
     */
    constructor(owner) {
        this.owner = owner;
    }

    kills = 0;
    deaths = 0;
    assists = 0;
    creepScore = 0;

    respawnAt = 0;
    lastRespawnTime = 0;
    totalRespawnTime = 0;

};
