import { Request, Response } from "express";
import { RegisterExercisesChestUC } from "../../../application/chest/regisExcerChestUC";

export class RegisterChestController {
    constructor(readonly registerChestUseCase: RegisterExercisesChestUC) { }

    async run(req: Request, res: Response) {
        try {
            const {
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
            } = req.body;

            const registerExercises = await this.registerChestUseCase.run(
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
            );

            if (registerExercises) {
                return res.status(201).json({
                    status: "success",
                    data: {
                        userid:registerExercises.userid,
                        barbellBenchPress: registerExercises.barbellBenchPress,
                        reps_barbellBenchPress: registerExercises.reps_barbellBenchPress,
                        dumbellBenchPress: registerExercises.dumbellBenchPress,
                        reps_dumbellBenchPress: registerExercises.reps_dumbellBenchPress,
                        inclineBenchPress: registerExercises.inclineBenchPress,
                        reps_inclineBenchPress: registerExercises.reps_inclineBenchPress,
                        machineChestPress: registerExercises.machineChestPress,
                        reps_machineChestPress: registerExercises.reps_machineChestPress,
                        declinePress: registerExercises.declinePress,
                        reps_declinePress: registerExercises.reps_declinePress,
                    },
                });
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "El registro de ejercicio no fue exitoso. Ya existe un ejercicio para este usuario y fecha.",
                });
            }
        } catch (err) {
            console.error("Error al registrar ejercicio:", err);
            return res.status(500).json({
                status: "error",
                message: "Error interno del servidor",
            });
        }
    }
}
