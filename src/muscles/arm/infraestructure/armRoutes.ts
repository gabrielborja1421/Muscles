import express from "express";
import { listAllExercisesByIdController, listAllExercisesController, registerArmController, registerBackController, registerChestController, registerController, registerCoreController, registerLegController} from "./controllers/dependencies";



export const armRouter = express.Router();

// Ruta para registrar un usuario
armRouter.post("/add", registerController.run.bind(registerController));

armRouter.get("/muscle/list", listAllExercisesController.run.bind(listAllExercisesController));

armRouter.get("/get/:id", listAllExercisesByIdController.run.bind(listAllExercisesByIdController));

armRouter.post("/add/leg", registerLegController.run.bind(registerLegController));

armRouter.post("/add/chest", registerChestController.run.bind(registerChestController));

armRouter.post("/add/arm", registerArmController.run.bind(registerArmController));

armRouter.post("/add/back", registerBackController.run.bind(registerBackController));

armRouter.post("/add/core", registerCoreController.run.bind(registerCoreController));   

// Ruta para obtener un usuario por su ID

