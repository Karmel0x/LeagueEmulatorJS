
/**
 * @typedef {import('../gameobjects/units/Unit.js').default} Unit
 * @typedef {import('../gameobjects/units/Player.js').default} Player
 * @typedef {import('../game/initializers/Teams.js').default} Teams
 */

class Server {
    /**
     * @type {typeof import('../core/Logging.js').default}
     */
    static logging;

    /**
     * @type {import('../core/network/Network.js').default}
     */
    static network;

    /**
     * @type {Object.<number, Object.<number, typeof import('../packets/BasePacket.js').default>>}
     */
    static packets = {};

    /**
     * @type {import('../game/components/MovementSimulation.js').default}
     */
    static movement;

    static command_START_GAME = false;
    static useTerrainEscape = false;
    static doNotUsePathfinding = false;
    static packetLengthWarning = 1000;

    /**
     * @type {Object.<number, number>}
     */
    static playerPeers = {};

    /**
     * @type {Object.<string, Teams>}
     */
    static teams = {};

    static game = {
        initialized: 0,
        loaded: 0,
        started: 0,
    };

    /**
     * @type {Player[]}
     */
    static players = [];
}

export default Server;
