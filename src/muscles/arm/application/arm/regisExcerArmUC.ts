import { Arm } from "../../domain/entities/arm";
import { IExerciseRepository } from "../../domain/armRepository";

export class RegisterExercisesArmUC {
    constructor(readonly exerciseRepository: IExerciseRepository) { }


    async run(
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

    ): Promise<Arm | any> {
        try {
            const createNewExercise = await this.exerciseRepository.registerArm( //reempalzar por register----(nombre de la tabla)
                userid,
                bicepCurl,
                reps_bicepCurl,
                hammerCurl,
                reps_hammerCurl,
                barbellCurl,
                reps_barbellCurl,
                skullcrusher,
                reps_skullcrusher,
                dumbbellOverheadTricepsExtension,
                reps_dumbbellOverheadTricepsExtension,
                tricepsPushdown,
                reps_tricepsPushdown,
                pushPress,
                reps_pushPress,
                closeGripBenchPress,
                reps_closeGripBenchPress,
                militaryPress,
                reps_militaryPress,
                lateralRaise,
                reps_lateralRaise,
                frontRaise,
                reps_frontRaise,
                reverseFly,
                reps_reverse,
                shoulderPress,
                reps_shoulderPress,

            )

            return createNewExercise;
        } catch (error) {
            console.log("Error al registrar entrenamiento", error)
            return null
        }

    };


}

