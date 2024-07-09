import { Request, Response } from "express";
import { RegisterExercisesLegUC } from "../../../application/leg/regisExcerLegUC";

export class RegisterLegController {
  constructor(readonly registerLegUseCase: RegisterExercisesLegUC) {}

  async run(req: Request, res: Response) {
    try {
      const {
        userid,
        legPress,
        reps_legPress,
        legCurl,
        reps_legCurl,
        legExtension,
        reps_legExtension,
        Squat,
        reps_Squat
      } = req.body;

      const registerExercises = await this.registerLegUseCase.run(
        userid,   
        legPress,
        reps_legPress,
        legCurl,
        reps_legCurl,
        legExtension,
        reps_legExtension,
        Squat,
        reps_Squat
      );

      if (registerExercises) {
        return res.status(201).json({
          status: "success",
          data: {
            userid: registerExercises.userid,
            legPress: registerExercises.legPress,
            reps_legPress: registerExercises.reps_legPress,
            legCurl: registerExercises.legCurl,
            reps_legCurl: registerExercises.reps_legCurl,
            legExtension: registerExercises.legExtension,
            reps_legExtension: registerExercises.reps_legExtension,
            Squat: registerExercises.Squat,
            reps_Squat: registerExercises.reps_Squat
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
