import Server from "../../app/server";
import UnitAiList from "../../app/unit-ai-list";
import { runAccurateInterval } from "../../core/timer";
import { delay } from "../../core/utils";

export default class AmbientGain {
    async ambientGold() {

        const interval = 5;
        const amount = 10;

        if (!interval || !amount)
            return;

        const startAt = 90 * 1000;
        while (startAt > Server.game.timer.now())
            await delay(100);

        const amountPerSec = amount / interval;
        const disableWhileDead = false;

        runAccurateInterval(() => {
            UnitAiList.heroes.forEach(hero => {
                if (disableWhileDead && hero.owner.combat.died)
                    return;

                hero.owner.progress.goldUp(amountPerSec, 0, false);
            });
        }, 1000);
    }

    async ambientExp() {

        const interval = 5;
        const amount = 0;

        if (!interval || !amount)
            return;

        const startAt = 0 * 1000;
        while (startAt > Server.game.timer.now())
            await delay(100);

        const amountPerSec = amount / interval;
        const disableWhileDead = false;

        runAccurateInterval(() => {
            UnitAiList.heroes.forEach(hero => {
                if (disableWhileDead && hero.owner.combat.died)
                    return;

                hero.owner.progress.expUp(amountPerSec, false);
            });
        }, 1000);
    }

    start() {
        this.ambientGold();
        this.ambientExp();
    }
}
