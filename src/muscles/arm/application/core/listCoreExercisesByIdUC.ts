import { IArmRepository } from "../../domain/armRepository";
import { Core } from "../../domain/entities/core";

export class ListCoreExerciseByIdUC {
    constructor(readonly armRepository: IArmRepository) {}
    
    async run(id: number): Promise<Core | null> {
        try {
            // Intenta obtener el usuario por su ID
            const getExerciseById = await this.armRepository.listCoreMuscleExercise(id)

            if (getExerciseById === null) {
                // Si no se encontró ningún usuario, lanza una excepción personalizada
                throw new Error("No hay ejercicios"); // Puedes personalizar el mensaje de error
            }

            return getExerciseById;
        } catch (error) {
            // Captura y registra el error
            console.error("Error en GetUserByIdUseCase:", error);
            // Lanza la excepción para que pueda ser manejada en capas superiores si es necesario
            throw error;
        }
    }
}
