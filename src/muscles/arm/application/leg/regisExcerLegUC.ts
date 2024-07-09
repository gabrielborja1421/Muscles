import { Leg } from "../../domain/entities/leg";
import { IExerciseRepository } from "../../domain/armRepository";

export class RegisterExercisesLegUC {
    constructor(readonly exerciseRepository: IExerciseRepository){}


    async run (   
        userid: number,
        legPress?: number, //1 
        reps_legPress?: number,
        legCurl?: number, //2
        reps_legCurl?: number,
        legExtension?: number, //3
        reps_legExtension?: number,
        Squat?: number, //4
        reps_Squat?: number,
        
    ): Promise <Leg | any>{
        try {
            const createNewExercise = await this.exerciseRepository.registerLeg( //reempalzar por register----(nombre de la tabla)
        userid,   
        legPress,
        reps_legPress,
        legCurl,
        reps_legCurl,
        legExtension,
        reps_legExtension,
        Squat,
        reps_Squat
              
            )

            return createNewExercise;
        }catch(error){
            console.log("Error al registrar entrenamiento", error)
            return null
        }
        
    };


}

