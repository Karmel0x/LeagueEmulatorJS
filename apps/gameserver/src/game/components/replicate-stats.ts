import Server from "../../app/server";
import { delay } from "../../core/utils";
import type AttackableUnit from "../../gameobjects/units/attackable-unit";
import { sendUnitStats } from "../../packet-helpers";

export default class ReplicateStats {

    units: AttackableUnit[] = [];

    async replicateStats() {
        while (!Server.game.loaded)
            await delay(100);

        Server.gameLoop.add((updateTime) => {
            const units = this.units;
            if (units.length < 1)
                return;

            const units2 = units.splice(0, 255);
            sendUnitStats(units2);
        });
    }

    start() {
        this.replicateStats();
    }
}
