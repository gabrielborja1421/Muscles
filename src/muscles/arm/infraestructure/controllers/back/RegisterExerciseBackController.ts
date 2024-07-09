import { Request, Response } from "express";
import { RegisterExercisesBackUC } from "../../../application/back/regisExcerBackUC";

export class RegisterBackController {
    constructor(readonly registerBackUseCase: RegisterExercisesBackUC) { }

    async run(req: Request, res: Response) {
        try {
            const {
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
            } = req.body;

            const registerExercises = await this.registerBackUseCase.run(
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
            );

            if (registerExercises) {
                return res.status(201).json({
                    status: "success",
                    data: {
                        userid: registerExercises.userid,
                        deadlift: registerExercises.deadlift,
                        reps_deadlift: registerExercises.reps_deadlift,
                        bentOverRow: registerExercises.bentOverRow,
                        reps_bentOverRow: registerExercises.reps_bentOverRow,
                        pullUps: registerExercises.pullUps,
                        reps_pullUps: registerExercises.reps_pullUps,
                        latPulldown: registerExercises.latPulldown,
                        reps_latPulldown: registerExercises.reps_latPulldown,
                        dumbbellRow: registerExercises.dumbbellRow,
                        reps_dumbbellRow: registerExercises.reps_dumbbellRow,
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
