"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
class RegisterController {
    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid, exercisesid, weight } = req.body;
                const registerExercises = yield this.registerUseCase.run(userid, exercisesid, weight);
                if (registerExercises) {
                    return res.status(201).json({
                        status: "success",
                        data: {
                            userid: registerExercises.userid,
                            exercisesid: registerExercises.exercisesid,
                            weight: registerExercises.weight,
                        },
                    });
                }
                else {
                    // Puedes añadir un mensaje específico para indicar que el ejercicio ya existe
                    return res.status(400).json({
                        status: "error",
                        message: "El registro de ejercicio no fue exitoso. Ya existe un ejercicio para este usuario, grupo muscular y fecha.",
                    });
                }
            }
            catch (err) {
                console.error("Error al registrar ejercicio:", err);
                return res.status(500).json({
                    status: "error",
                    message: "Error interno del servidor",
                });
            }
        });
    }
}
exports.RegisterController = RegisterController;
