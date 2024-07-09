import { Chest } from "../../domain/entities/chest";
import { IExerciseRepository } from "../../domain/armRepository";

export class RegisterExercisesChestUC {
    constructor(readonly exerciseRepository: IExerciseRepository) { }


    async run(
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

    ): Promise<Chest | any> {
        try {
            const createNewExercise = await this.exerciseRepository.registerChest( //reempalzar por register----(nombre de la tabla)
                userid,
                barbellBenchPress,
                reps_barbellBenchPress,
                dumbellBenchPress,
                reps_dumbellBenchPress,
                inclineBenchPress,
                reps_inclineBenchPress,
                machineChestPress,
                reps_machineChestPress,
                declinePress,
                reps_declinePress,
            )

            return createNewExercise;
        } catch (error) {
            console.log("Error al registrar entrenamiento", error)
            return null
        }

    };


}

