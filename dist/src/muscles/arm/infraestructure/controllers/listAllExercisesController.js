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
exports.ListAllExercisesController = void 0;
class ListAllExercisesController {
    constructor(listAllExercisesUC) {
        this.listAllExercisesUC = listAllExercisesUC;
    }
    run(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAllExercises = yield this.listAllExercisesUC.run();
                if (listAllExercises && listAllExercises.length > 0) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            exercises: listAllExercises,
                        },
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "No se encontraron usuarios.",
                    });
                }
            }
            catch (error) {
                console.error("Error:", error);
                return res.status(500).send({
                    status: "error",
                    message: "Se produjo un error en el servidor.",
                });
            }
        });
    }
}
exports.ListAllExercisesController = ListAllExercisesController;
