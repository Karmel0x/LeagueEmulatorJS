import EventEmitter from "events";
import type * as TypedEmitter from "typed-emitter";


export class EventEmitter2<T extends TypedEmitter.EventMap> extends (EventEmitter as { new <T extends TypedEmitter.EventMap>(): TypedEmitter.default<T> })<T> {

    on2<K extends keyof T>(event: K, listener: T[K]) {
        this.on(event, listener);
        return listener;
    }

    once2<K extends keyof T>(event: K, listener: T[K]) {
        this.once(event, listener);
        return listener;
    }

    prependListener2<K extends keyof T>(event: K, listener: T[K]) {
        this.prependListener(event, listener);
        return listener;
    }

    on3<K extends keyof T>(event: K, listener: T[K]) {
        this.on(event, listener);
        return () => {
            this.off(event, listener);
        };
    }

    once3<K extends keyof T>(event: K, listener: T[K]) {
        this.once(event, listener);
        return () => {
            this.off(event, listener);
        };
    }

    prependListener3<K extends keyof T>(event: K, listener: T[K]) {
        this.prependListener(event, listener);
        return () => {
            this.off(event, listener);
        };
    }

}
