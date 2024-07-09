"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.armRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./controllers/dependencies");
exports.armRouter = express_1.default.Router();
// Ruta para registrar un usuario
exports.armRouter.post("/add", dependencies_1.registerController.run.bind(dependencies_1.registerController));
exports.armRouter.get("/muscle/list", dependencies_1.listAllExercisesController.run.bind(dependencies_1.listAllExercisesController));
exports.armRouter.get("/get/:id", dependencies_1.listAllExercisesByIdController.run.bind(dependencies_1.listAllExercisesByIdController));
// Ruta para obtener un usuario por su ID
