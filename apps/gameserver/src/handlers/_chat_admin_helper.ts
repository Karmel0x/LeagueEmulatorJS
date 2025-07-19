import type { Player } from "../gameobjects/unit-ai";
import { AiSubType, AiType } from "../gameobjects/unit-ai/types";
import type AttackableUnit from "../gameobjects/units/attackable-unit";

type AiLiteralTypes = Lowercase<Extract<keyof typeof AiType, string>>;
type AiLiteralSubTypes = Lowercase<Extract<keyof typeof AiSubType, string>>;
type AiLiteralAnyTypes = AiLiteralTypes | AiLiteralSubTypes;

export function lowercaseObjectKeys<T extends object>(obj: T): { [K in keyof T as Lowercase<string & K>]: T[K] } {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => ([key.toLowerCase(), value]))) as { [K in keyof T as Lowercase<string & K>]: T[K] };
}

const lowercaseAiType = lowercaseObjectKeys(AiType);
const lowercaseAiSubType = lowercaseObjectKeys(AiSubType);

export function isAiLiteralAnyType(unit: AttackableUnit, anyType: AiLiteralAnyTypes) {
    return unit.ai?.subType === lowercaseAiSubType[anyType as AiLiteralSubTypes] || unit.ai?.type === lowercaseAiType[anyType as AiLiteralTypes];
}

export function filterUnitsForCommand(player: Player, units: AttackableUnit[], unitType: string | number) {
    if (unitType === 'all')
        return units;

    if (unitType === 'me')
        return [player.owner];

    let unitNetId = Number(unitType);
    if (unitNetId)
        return units.filter(unit => unit.netId === unitNetId);

    return units.filter(unit => {
        return isAiLiteralAnyType(unit, unitType as any);
    });
}
