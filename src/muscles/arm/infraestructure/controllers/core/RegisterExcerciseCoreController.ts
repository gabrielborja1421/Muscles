import { Request, Response } from "express";
import { RegisterExercisesCoreUC } from "../../../application/core/regisExcerCoreUs";
export class RegisterCoreController {
    constructor(readonly registerCoreUseCase: RegisterExercisesCoreUC) { }

    async run(req: Request, res: Response) {
        try {
            const {
                userid,
                russian_twist,
                reps_russian_twist,
                plank,
                reps_plank,
                crunch,
                reps_crunch,
            } = req.body;

            const registerExercises = await this.registerCoreUseCase.run(
                userid,
                russian_twist,
                reps_russian_twist,
                plank,
                reps_plank,
                crunch,
                reps_crunch,
            );

            if (registerExercises) {
                return res.status(201).json({
                    status: "success",
                    data: {
                        userid: registerExercises.userid,
                        russian_twist: registerExercises.russian_twist,
                        reps_russian_twist: registerExercises.reps_russian_twist,
                        plank: registerExercises.plank,
                        reps_plank: registerExercises.reps_plank,
                        crunch: registerExercises.crunch,
                        reps_crunch: registerExercises.reps_crunch,
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
