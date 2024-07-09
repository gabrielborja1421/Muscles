import { Back } from "../../domain/entities/back";
import { IExerciseRepository } from "../../domain/armRepository";

export class RegisterExercisesBackUC {
    constructor(readonly exerciseRepository: IExerciseRepository) { }


    async run(
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
    ): Promise<Back | any> {
        try {
            const createNewExercise = await this.exerciseRepository.registerBack( //reempalzar por register----(nombre de la tabla)
                userid,
                deadlift,
                reps_deadlift,
                bentOverRow,
                reps_bentOverRow,
                pullUps,
                reps_pullUps,
                latPulldown,
                reps_latPulldown,
                dumbbellRow,
                reps_dumbbellRow,
            )

            return createNewExercise;
        } catch (error) {
            console.log("Error al registrar entrenamiento", error)
            return null
        }

    };


}

