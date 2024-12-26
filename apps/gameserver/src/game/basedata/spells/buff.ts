import { BuffType } from "@repo/packets/base/s2c/0x68-BuffAddGroup";
import _Spell from "./spell";


export default class _Buff extends _Spell {

    buffSlot = 0;
    buff = {
        duration: 0,
        buffType: BuffType.internal,
    };
    endTime = 0;

    buffActivate() {

    }

    buffDeactivate() {

    }

}
