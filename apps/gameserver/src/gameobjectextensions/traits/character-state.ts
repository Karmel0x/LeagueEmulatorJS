import { EventEmitter2 } from '../../core/event-emitter2';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';


export enum CharacterStates {//CompressedStates
    canAttack,
    canCast,
    canMove,
    stealthed,
    revealSpecificUnit,
    taunted,
    feared,
    suppressed,
    sleep,
    nearSight,
    ghosted,
    ghostProof,
    charmed,
    noRender,
    forceRenderParticles,
    dodgePiercing,
    disableAmbientGold,
    disableAmbientXp,
    brushVisibilityFake,
    //callForHelpSuppresser,
    //suppressCallForHelp,
    //ignoreCallForHelp,
    slowed,
    selectable,
}

//export enum CharacterStatesEx {
//    disarmed = -100,
//    silenced,
//    pacified,
//    netted,
//    rooted,
//    stunned,
//    invulnerable = -50,
//    magicImmune,
//    physicalImmune,
//    targetable,
//}

type CharacterStateEvents = {
    //'stateChange': (state: CharacterStates, value: boolean) => void;
    //'stateExChange': (state: CharacterStatesEx, value: boolean) => void;
};

export default class CharacterState {
    readonly owner;
    readonly eventEmitter = new EventEmitter2<CharacterStateEvents>();

    constructor(owner: AttackableUnit) {
        this.owner = owner;
    }

    get compressed() {
        return undefined;
        let compressed = 0;
        if (this.canAttack) compressed |= 1 << CharacterStates.canAttack;
        if (this.canCast) compressed |= 1 << CharacterStates.canCast;
        if (this.canMove) compressed |= 1 << CharacterStates.canMove;
        if (this.stealthed) compressed |= 1 << CharacterStates.stealthed;
        if (this.revealSpecificUnit) compressed |= 1 << CharacterStates.revealSpecificUnit;
        if (this.taunted) compressed |= 1 << CharacterStates.taunted;
        if (this.feared) compressed |= 1 << CharacterStates.feared;
        if (this.suppressed) compressed |= 1 << CharacterStates.suppressed;
        if (this.sleep) compressed |= 1 << CharacterStates.sleep;
        if (this.nearSight) compressed |= 1 << CharacterStates.nearSight;
        if (this.ghosted) compressed |= 1 << CharacterStates.ghosted;
        if (this.ghostProof) compressed |= 1 << CharacterStates.ghostProof;
        if (this.charmed) compressed |= 1 << CharacterStates.charmed;
        if (this.noRender) compressed |= 1 << CharacterStates.noRender;
        if (this.forceRenderParticles) compressed |= 1 << CharacterStates.forceRenderParticles;
        if (this.dodgePiercing) compressed |= 1 << CharacterStates.dodgePiercing;
        //if (this.disableAmbientGold) compressed |= 1 << CharacterStates.disableAmbientGold;
        //if (this.disableAmbientXp) compressed |= 1 << CharacterStates.disableAmbientXp;
        if (this.brushVisibilityFake) compressed |= 1 << CharacterStates.brushVisibilityFake;

        //if (this.ignoreCallForHelp) compressed += 16;
        //if (this.suppressCallForHelp) compressed += 17;
        //if (this.callForHelpSuppresser) compressed += 18;
        if (this.slowed) compressed |= 1 << CharacterStates.slowed;
        if (this.selectable) compressed |= 1 << CharacterStates.selectable;
        return compressed;
    }

    canAttack = true;
    canCast = true;
    canMove = true;
    stealthed = false;
    revealSpecificUnit = false;
    taunted = false;
    feared = false;
    suppressed = false;
    sleep = false;
    nearSight = false;
    ghosted = false;
    ghostProof = false;
    charmed = false;
    noRender = false;
    forceRenderParticles = false;
    dodgePiercing = false;
    //disableAmbientGold = false;
    //disableAmbientXp = false;
    brushVisibilityFake = false;

    ignoreCallForHelp = false;
    suppressCallForHelp = false;
    callForHelpSuppresser = false;
    //minionAcquirable = false;
    slowed = false;
    selectable = true;

    halted = false;

    asleep = false;
    disarmed = false;
    silenced = false;
    //pacified = false;
    netted = false;
    rooted = false;
    stunned = false;
    invulnerable = false;
    magicImmune = false;
    physicalImmune = false;
    targetable = true;

    placemarker = false;
    isWard = false;

    //windingup = false;
    cantCancelWindingup = false;

    channeling = false;
    cantCancelChanneling = false;

}
