
import fs from 'fs';
import type { ReplayFileReader } from './replay-reader';


const reader_json: ReplayFileReader = function (filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const replay: ReturnType<ReplayFileReader> = JSON.parse(data);

    /** @deprecated */
    replay.forEach(record => {
        // @ts-ignore
        record.time = record.time ?? record.Time ?? (record.TimeS * 1000);
        // @ts-ignore
        record.dataBase64 = record.dataBase64 ?? record.Bytes;
        // @ts-ignore
        record.dataHex = record.dataHex ?? record.BytesHex;
        // @ts-ignore
        record.channel = record.channel ?? record.Channel;
        // @ts-ignore
        record.flags = record.flags ?? record.Flags;
    });

    return replay;
};

export default reader_json;
