import { Request, Response } from "express";
import { RegisterExercisesArmUC } from "../../../application/arm/regisExcerArmUC";

export class RegisterArmController {
    constructor(readonly registerArmUseCase: RegisterExercisesArmUC) { }

    async run(req: Request, res: Response) {
        try {
            const {
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
            } = req.body;

            const registerExercises = await this.registerArmUseCase.run(
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
            );

            if (registerExercises) {
                return res.status(201).json({
                    status: "success",
                    data: {
                        userid: registerExercises.userid,
                        bicepCurl: registerExercises.bicepCurl,
                        reps_bicepCurl: registerExercises.reps_bicepCurl,
                        hammerCurl: registerExercises.hammerCurl,
                        reps_hammerCurl: registerExercises.reps_hammerCurl,
                        barbellCurl: registerExercises.barbellCurl,
                        reps_barbellCurl: registerExercises.reps_barbellCurl,
                        skullcrusher: registerExercises.skullcrusher,
                        reps_skullcrusher: registerExercises.reps_skullcrusher,
                        dumbbellOverheadTricepsExtension: registerExercises.dumbbellOverheadTricepsExtension,
                        reps_dumbbellOverheadTricepsExtension: registerExercises.reps_dumbbellOverheadTricepsExtension,
                        tricepsPushdown: registerExercises.tricepsPushdown,
                        reps_tricepsPushdown: registerExercises.reps_tricepsPushdown,
                        pushPress: registerExercises.pushPress,
                        reps_pushPress: registerExercises.reps_pushPress,
                        closeGripBenchPress: registerExercises.closeGripBenchPress,
                        reps_closeGripBenchPress: registerExercises.reps_closeGripBenchPress,
                        militaryPress: registerExercises.militaryPress,
                        reps_militaryPress: registerExercises.reps_militaryPress,
                        lateralRaise: registerExercises.lateralRaise,
                        reps_lateralRaise: registerExercises.reps_lateralRaise,
                        frontRaise: registerExercises.frontRaise,
                        reps_frontRaise: registerExercises.reps_frontRaise,
                        reverseFly: registerExercises.reverseFly,
                        reps_reverse: registerExercises.reps_reverse,
                        shoulderPress: registerExercises.shoulderPress,
                        reps_shoulderPress: registerExercises.reps_shoulderPress,
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
