import { runAccurateInfiniteInterval, TIMER_FPS_DELAY } from "./timer";

export type Task = (updateTime: number) => void;

export default class GameLoop {

    timer = 0;
    readonly delay = TIMER_FPS_DELAY;
    private tasks: Task[] = [];

    start() {
        const tasks = this.tasks;
        runAccurateInfiniteInterval((updateTime) => {
            this.timer = updateTime;
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i]!;
                task(updateTime);
            }
        }, this.delay);
    }

    add(task: Task) {
        this.tasks.push(task);
        return task;
    }

    remove(task: Task) {
        const i = this.tasks.indexOf(task);
        if (i !== -1) {
            this.tasks.splice(i, 1);
        }
    }

}
