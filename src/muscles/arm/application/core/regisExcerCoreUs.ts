import { Core } from "../../domain/entities/core";
import { IExerciseRepository } from "../../domain/armRepository";

export class RegisterExercisesCoreUC {
    constructor(readonly exerciseRepository: IExerciseRepository) { }


    async run(
        userid: number,
        russian_twist?: number,
        reps_russian_twist?: number,
        plank?: number,
        reps_plank?: number,
        crunch?: number,
        reps_crunch?: number,

    ): Promise<Core | any> {
        try {
            const createNewExercise = await this.exerciseRepository.registerCore( //reempalzar por register----(nombre de la tabla)
                userid,
                russian_twist,
                reps_russian_twist,
                plank,
                reps_plank,
                crunch,
                reps_crunch,
            )

            return createNewExercise;
        } catch (error) {
            console.log("Error al registrar entrenamiento", error)
            return null
        }

    };


}

