import express from "express";
import { listAllExercisesByIdController, listAllExercisesController, listArmExercisesByIdController, listBackExercisesByIdController, listChestExcersisesByIdController, listCoreExercisesByIdController, listLegExercisesByIdController, registerArmController, registerBackController, registerChestController, registerController, registerCoreController, registerLegController} from "./controllers/dependencies";



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

armRouter.get("/muscle/leg/list/:id", listLegExercisesByIdController.run.bind(listLegExercisesByIdController));

armRouter.get("/muscle/chest/list/:id", listChestExcersisesByIdController.run.bind(listChestExcersisesByIdController));

armRouter.get("/muscle/Core/list/:id", listCoreExercisesByIdController.run.bind(listCoreExercisesByIdController));

armRouter.get("/muscle/arm/list/:id", listArmExercisesByIdController.run.bind(listArmExercisesByIdController));

armRouter.get("/muscle/back/list/:id", listBackExercisesByIdController.run.bind(listBackExercisesByIdController));

// Ruta para obtener un usuario por su ID

