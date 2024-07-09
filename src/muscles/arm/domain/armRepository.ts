import { Logs } from "./arm";
import { Arm } from "./entities/arm";
import { Back } from "./entities/back";
import { Chest } from "./entities/chest";
import { Core } from "./entities/core";
import { Leg } from "./entities/leg";

export interface IArmRepository {
    registerExercises(
        userid: number,
        exercisesid: number,
        weight: number
    
    ): Promise<Logs | any>

    listAllExercisesById(
        id: number
    ): Promise<Logs | any>

    listAllExercises(
    ): Promise<Logs[] | any>

    
}

export interface IExerciseRepository {

    registerArm(
        userid: number,
        bicepCurl?: number,
        reps_bicepCurl?: number,
        hammerCurl?: number,
        reps_hammerCurl?: number,
        barbellCurl?: number,
        reps_barbellCurl?: number,
        skullcrusher?: number,
        reps_skullcrusher?: number,
        dumbbellOverheadTricepsExtension?: number,
        reps_dumbbellOverheadTricepsExtension?: number,
        tricepsPushdown?: number,
        reps_tricepsPushdown?: number,
        pushPress?: number,
        reps_pushPress?: number,
        closeGripBenchPress?: number,
        reps_closeGripBenchPress?: number,
        militaryPress?: number,
        reps_militaryPress?: number,
        lateralRaise?: number,
        reps_lateralRaise?: number,
        frontRaise?: number,
        reps_frontRaise?: number,
        reverseFly?: number,
        reps_reverse?: number,
        shoulderPress?: number,
        reps_shoulderPress?: number,
    ): Promise<Arm | any>

    registerBack(
        
        userid: number,
        deadlift?: number,
        reps_deadlift?: number,
        bentOverRow?: number,
        reps_bentOverRow?: number,
        pullUps?: number,
        reps_pullUps?: number,
        latPulldown?: number,
        reps_latPulldown?: number,
        dumbbellRow?: number,
        reps_dumbbellRow?: number,
    ): Promise<Back | any  | null>

    registerChest(
        userid: number,

        barbellBenchPress?: number,
        reps_barbellBenchPress?: number,
        dumbellBenchPress?: number,
        reps_dumbellBenchPress?: number,
        inclineBenchPress?: number,
        reps_inclineBenchPress?: number,
        machineChestPress?: number,
        reps_machineChestPress?: number,
        declinePress?: number,
        reps_declinePress?: number,
    ): Promise<Chest | any>

    registerCore(
        userid: number,

        russian_twist?: number,
        reps_russian_twist?: number,
        plank?: number,
        reps_plank?: number,
        crunch?: number,
        reps_crunch?: number,
    ): Promise<Core | any>

    registerLeg(
    
    userid: number,
    legPress?: number,
    reps_legPress?: number,
    legCurl?: number,
    reps_legCurl?: number,
    legExtension?: number,
    reps_legExtension?: number,
    Squat?: number,
    reps_Squat?: number

    ): Promise<Leg | any | null>
/*
    listAllArm(
    ): Promise<Arm[] | any>

    listAllBack(
    ): Promise<Back[] | any>

    listAllChest(
    ): Promise<Chest[] | any>

    listAllCore(
    ): Promise<Core[] | any>

    listAllLeg(
    ): Promise<Leg[] | any>
*/
}

