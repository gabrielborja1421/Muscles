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
exports.ListAllExercisesUC = void 0;
class ListAllExercisesUC {
    constructor(armRepository) {
        this.armRepository = armRepository;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAllExercisesArm = yield this.armRepository.listAllExercises();
                if (listAllExercisesArm) {
                    return listAllExercisesArm;
                }
                else {
                    throw new Error("No se encontraron ejercicios realizados.");
                }
            }
            catch (err) {
                // Lanza una excepción con un mensaje de error específico.
                throw new Error("Error al obtener la lista de ejercicios realizados: " + err.message);
            }
        });
    }
}
exports.ListAllExercisesUC = ListAllExercisesUC;
