import { delay } from "./utils";

export default class Timer {

    static app = new Timer();

    startedAt: number | null = 0;
    pausedAt = 0;
    pauseTime = 0;
    speed = 1;
    speedUpAt = 0;

    notYet() {
        this.startedAt = null;
        return this;
    }

    start() {
        if (this.startedAt === null)
            this.startedAt = performance.now();

        return this;
    }

    now() {
        if (this.startedAt === null)
            return 0;

        const now = performance.now() - this.startedAt;
        const timer = this.pausedAt ? this.pausedAt : now;
        let result = timer - this.pauseTime;

        if (this.speedUpAt) {
            result += (now - this.speedUpAt) * (this.speed - 1);
        }

        return result;
    }

    s() {
        return Math.round(this.now()) / 1000;
    }

    pause() {
        if (this.pausedAt)
            return;

        this.speedUp(1);
        this.pausedAt = performance.now();
        return this;
    }

    resume() {
        if (!this.pausedAt)
            return;

        this.pauseTime += performance.now() - this.pausedAt;
        this.pausedAt = 0;
        return this;
    }

    speedUp(speed = 1) {
        this.resume();

        if (this.speedUpAt && speed !== 1)
            this.speedUp(1);

        if (speed === 1) {
            if (this.speedUpAt) {
                const now = performance.now();
                const diff = (now - this.speedUpAt) * (this.speed - 1);
                this.pauseTime -= diff;
            }

            this.speedUpAt = 0;
            this.speed = speed;
        } else {
            const now = performance.now();
            this.speedUpAt = now;
            this.speed = speed;
        }

        return this;
    }

}

export async function accurateDelay(ms: number) {
    const lastUpdate = Timer.app.now();

    for (; ;) {
        await delay(1);

        const now = Timer.app.now();
        const diff = now - lastUpdate;

        if (diff >= ms) {
            return diff;
        }
    }
}

export function runAccurateInterval<T extends number>(callback: (fixedDiff: T) => void, ms: T) {
    let lastUpdate = Timer.app.now();
    let stop = false;

    (async () => {
        for (; ;) {
            await delay(1);
            if (stop)
                return;

            const now = Timer.app.now();
            let diff = now - lastUpdate;

            while (diff >= ms) {
                diff -= ms;
                callback(ms);
            }

            lastUpdate = now - diff;
        }
    })();

    return () => {
        stop = true;
    };
}
