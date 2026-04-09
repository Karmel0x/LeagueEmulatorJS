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

    /**
     * dev
     */
    ss() {
        return Math.round(this.now()) / 1000;
    }

    s() {
        return Math.round(this.now() / 1000);
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

    running() {
        if (this.pausedAt)
            return false;

        if (this.startedAt === null)
            return false;

        return true;
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

export const TIMER_FPS_DELAY = 33;// ~30hz

export async function accurateDelay(ms: number) {
    const firstUpdate = Timer.app.now();
    let nextUpdate = firstUpdate + ms;

    for (; ;) {
        const now = Timer.app.now();
        let left = nextUpdate - now;

        if (left > 0) {
            await delay(Math.ceil(left / 2));
            continue;
        }

        const diff = now - firstUpdate;
        return diff;
    }
}

export function runAccurateInfiniteInterval(callback: (updateTime: number) => void, ms: number) {
    let nextUpdate = Timer.app.now() + ms;

    (async () => {
        for (; ;) {
            const now = Timer.app.now();
            const left = nextUpdate - now;

            if (left > 0) {
                await delay(Math.ceil(left / 2));
                continue;
            }

            callback(nextUpdate);
            nextUpdate += ms;
            await delay(1);
        }
    })();
}

export function runAccurateInterval(callback: (updateTime: number) => void, ms: number) {
    let stop = false;
    let forceStop = false;
    let nextUpdate = Timer.app.now() + ms;

    (async () => {
        for (; ;) {
            const now = Timer.app.now();
            const left = nextUpdate - now;

            if (left > 0) {
                await delay(Math.ceil(left / 2));
                if (stop) return;
                continue;
            }

            if (forceStop) return;
            callback(nextUpdate);
            nextUpdate += ms;
            await delay(1);
        }
    })();

    return (force = false) => {
        stop = true;
        if (force)
            forceStop = true;
    };
}

//export function runAccurateTimedInterval<T extends number>(callback: (fixedDiff: T) => void, ms: T, timeout: number) {
//    let startedAt = Timer.app.now();
//    let lastUpdate = startedAt;
//
//    let e = {
//        runUntil: startedAt + timeout,
//        stop: function () {
//            this.runUntil = Timer.app.now();
//        },
//        f: undefined as Promise<void> | undefined,
//    };
//
//    e.f = (async () => {
//        for (; ;) {
//            await delay(2);
//            if (e.runUntil < lastUpdate + ms)
//                return;
//
//            const now = Timer.app.now();
//            let diff = now - lastUpdate;
//
//            while (diff >= ms) {
//                diff -= ms;
//                callback(ms);
//            }
//
//            lastUpdate = now - diff;
//        }
//    })();
//
//    return e;
//}
