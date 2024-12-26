

interface NetworkApiEvents {
    'connect': (peerNum: number) => void;
    'disconnect': (peerNum: number) => void;
    'receive': (peerNum: number, data: ArrayBuffer, channel: number) => void;
}

export interface NetworkApi {
    bind(port: number, host: string): void;
    disconnect(peerNum: number): void;
    send(peerNum: number, data: ArrayBuffer, channel: number): void;
    setBlowfish(peerNum: number, base64Key: string): void;
    on<T extends keyof NetworkApiEvents>(event: T, listener: NetworkApiEvents[T]): void;
    once<T extends keyof NetworkApiEvents>(event: T, listener: NetworkApiEvents[T]): void;
}
