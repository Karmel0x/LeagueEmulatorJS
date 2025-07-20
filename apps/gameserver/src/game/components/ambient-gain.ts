import GameObjectList from "../../app/game-object-list";
import Server from "../../app/server";
import UnitAiList from "../../app/unit-ai-list";
import { runAccurateInterval } from "../../core/timer";
import { delay } from "../../core/utils";
import { AiType } from "../../gameobjects/unit-ai/types";

export default class AmbientGain {
    async ambientGold() {
        const mapConstants = Server.map.constants;
        const interval = mapConstants.ambientGoldInterval;
        const amount = mapConstants.ambientGoldAmount;

        if (!interval || !amount)
            return;

        const startAt = mapConstants.ambientGoldDelay * 1000;
        while (startAt > Server.game.timer.now())
            await delay(100);

        const amountPerSec = amount / interval;
        const disableWhileDead = mapConstants.disableAmbientGoldWhileDead;

        runAccurateInterval(async () => {
            UnitAiList.heroes.forEach(hero => {
                if (disableWhileDead && hero.owner.combat.died)
                    return;

                hero.owner.progress.goldUp(amountPerSec, 0, false);
            });
        }, 1000);
    }

    async ambientExp() {
        const mapConstants = Server.map.constants;
        const interval = mapConstants.ambientXPInterval;
        const amount = mapConstants.ambientXPAmount;

        if (!interval || !amount)
            return;

        const startAt = mapConstants.ambientXPDelay * 1000;
        while (startAt > Server.game.timer.now())
            await delay(100);

        const amountPerSec = amount / interval;
        const disableWhileDead = mapConstants.disableAmbientXPWhileDead;

        runAccurateInterval(async () => {
            UnitAiList.heroes.forEach(hero => {
                if (disableWhileDead && hero.owner.combat.died)
                    return;

                hero.owner.progress.expUp(amountPerSec, false);
            });
        }, 1000);
    }

    async ambientFountainRegen() {
        const mapConstants = Server.map.constants;
        const interval = mapConstants.fountainRegenTickInterval;
        const amount1 = mapConstants.fountainHealthRegenPercent * 100;
        const amount2 = mapConstants.fountainManaRegenPercent * 100;
        const range = mapConstants.fountainRegenRadius;

        if (!interval)
            return;
        if (!amount1 && !amount2)
            return;

        while (!Server.game.loaded)
            await delay(100);

        const percent1PerSec = amount1 / interval;
        const percent2PerSec = amount2 / interval;

        const fountains = GameObjectList.fountains;
        const fountainsByTeam = Object.groupBy(fountains, fountain => fountain.team.id);

        runAccurateInterval(async () => {
            UnitAiList.heroes.forEach(hero => {
                const owner = hero.owner;
                if (owner.combat.died)
                    return;

                const points = fountainsByTeam[owner.team.id];
                if (!points)
                    return;

                const inRange = points.some(point => point.position.distanceTo(owner.position) < range);
                if (!inRange)
                    return;

                if (owner.stats.health.current < owner.stats.health.total) {
                    const amountPerSec = owner.stats.health.total * percent1PerSec / 100;
                    if (amountPerSec) {
                        owner.stats.health.current += amountPerSec;
                        owner.packets.OnEnterLocalVisibilityClient();
                    }
                }

                if (owner.stats.mana.current < owner.stats.mana.total) {
                    const amountPerSec = owner.stats.mana.total * percent2PerSec / 100;
                    if (amountPerSec) {
                        owner.stats.mana.current += amountPerSec;

                        if (owner.ai.type === AiType.Hero) {
                            owner.packets.OnEnterLocalVisibilityClient();
                        }
                    }
                }
            });
        }, 1000);
    }

    async ambientUnitRegen() {
        while (!Server.game.loaded)
            await delay(100);

        runAccurateInterval(async () => {
            UnitAiList.objects.forEach(unit => {
                const owner = unit.owner;
                if (owner.combat.died)
                    return;

                if (owner.stats.health.current < owner.stats.health.total) {
                    const amountPerHalfSec = owner.stats.healthRegen.total / 2;
                    if (amountPerHalfSec) {
                        owner.stats.health.current += amountPerHalfSec;
                        owner.packets.OnEnterLocalVisibilityClient();
                    }
                }

                if (owner.stats.mana.current < owner.stats.mana.total) {
                    const amountPerHalfSec = owner.stats.manaRegen.total / 2;
                    if (amountPerHalfSec) {
                        owner.stats.mana.current += amountPerHalfSec;

                        if (owner.ai.type === AiType.Hero) {
                            owner.packets.OnEnterLocalVisibilityClient();
                        }
                    }
                }
            });
        }, 1000 * 0.5);
    }

    start() {
        this.ambientGold();
        this.ambientExp();
        this.ambientFountainRegen();
        this.ambientUnitRegen();
    }
}
