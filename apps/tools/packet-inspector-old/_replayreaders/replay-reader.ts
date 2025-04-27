
export type ReplayRecord = {
    time: number;
    peerNums?: number[];
    data: ArrayBuffer;
    channel?: number;
};

export type ReplayFileRecord = ReplayRecord & {
    data?: ArrayBuffer;
    dataBase64?: string;
    dataHex?: string;
};

export interface ReplayFileReader {
    (filePath: string): ReplayFileRecord[];
}

export interface ReplayReader {
    (filePath: string): ReplayRecord[];
}
