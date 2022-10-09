
const IDefendable = require("./IDefendable");

/**
 * Trait for units that can respawn
 * @class
 * @param {GameObject.<IDefendable>} I
 */
module.exports = (I) => class IRespawnable extends I {

	totalRespawnTime = 0;

	constructor(options){
		super(options);

		this.on('die', () => {
			this.onDie();
		});
	}
	destructor(){
		// do nothing here
	}

	onDie(){
		this.respawnAt = performance.now() + this.respawnTime;
		this.totalRespawnTime += this.respawnTime;
		this.respawnWaiter();
	}

	/**
	 * @abstract
	 */
	respawnTimes = [
		0,
	];
	
	/**
	 * Respawn time in seconds
	 */
	get respawnTime(){
		return this.respawnTimes[this.level] ?? this.respawnTimes[this.respawnTimes.length - 1];
	}
	/**
	 * Wait for respawn time to pass to respawn
	 * @todo should be in Unit loop ?
	 */
	async respawnWaiter(){
		this.lastRespawnTime = this.respawnTime || false;

		if(this.lastRespawnTime === false)
			return;

		this.totalRespawnTime += this.lastRespawnTime;
		while(this.died + this.lastRespawnTime < Date.now() / 1000){
			await Promise.wait(100);
			continue;
		}

		this.respawn();
	}
};
