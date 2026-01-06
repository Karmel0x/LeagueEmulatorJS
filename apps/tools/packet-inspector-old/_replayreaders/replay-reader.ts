
export type ReplayRecord = {
    time: number;
    peerNums?: number[];
    channel?: number;
    direction?: 'sent' | 'recv';
    data: ArrayBuffer;
};

export type ReplayFileRecord = ReplayRecord & {
    data?: ArrayBuffer;
    dataBase64?: string;
    dataHex?: string;
};

export interface ReplayFileReader {
    (filePath: string): {
        header?: any;
        packets: ReplayFileRecord[],
    };
}

export interface ReplayReader {
    (filePath: string): ReplayRecord[];
}
