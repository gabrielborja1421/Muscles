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
exports.ListAllExercisesByIdController = void 0;
class ListAllExercisesByIdController {
    constructor(listAllExercisesByIdUC) {
        this.listAllExercisesByIdUC = listAllExercisesByIdUC;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                    // Si el ID no es un número válido, enviar una respuesta de error
                    return res.status(400).send({
                        status: "error",
                        message: "El ID proporcionado no es válido",
                    });
                }
                const getUserById = yield this.listAllExercisesByIdUC.run(id);
                if (getUserById) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            user: getUserById
                        },
                    });
                }
                else {
                    // Enviar una respuesta de error si el usuario no se encontró
                    return res.status(404).send({
                        status: "error",
                        message: "El ejercicio no se encontró",
                    });
                }
            }
            catch (error) {
                // Manejar errores y enviar una respuesta de error genérica
                console.error("Error en GetUserByIdController:", error);
                return res.status(500).send({
                    status: "error",
                    message: "Error interno del servidor",
                });
            }
        });
    }
}
exports.ListAllExercisesByIdController = ListAllExercisesByIdController;
