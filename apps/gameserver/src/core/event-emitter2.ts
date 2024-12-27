import EventEmitter from "events";
import type TypedEmitter from "typed-emitter";
import type { EventMap } from "typed-emitter";


export class EventEmitter2<T extends EventMap> extends (EventEmitter as { new <T extends EventMap>(): TypedEmitter<T> })<T> {

    on2<K extends keyof T>(event: K, listener: T[K]) {
        this.on(event, listener);
        return listener;
    }

    once2<K extends keyof T>(event: K, listener: T[K]) {
        this.once(event, listener);
        return listener;
    }

}
