import { ListAllExercisesByIdUC } from "../../application/listAllExercisesByIdUC";
import { ListAllExercisesUC } from "../../application/listAllExercisesUC";
import { RegisterExercisesUC } from "../../application/registerExercisesUC";
import { MysqlRepository } from "../mySqlRepository";
import { ListAllExercisesByIdController } from "./listAllExercisesByIdContreoller";
import { ListAllExercisesController } from "./listAllExercisesController";
import { RegisterController } from "./registerExercisesController";

//leg
import { RegisterExercisesLegUC } from "../../application/leg/regisExcerLegUC";
import { RegisterLegController } from "./leg/RegisterExerciseLegController";
import { RegisterExercisesArmUC } from "../../application/arm/regisExcerArmUC";
import { RegisterArmController } from "./arm/RegisterExerciseArmController";
import { RegisterExercisesChestUC } from "../../application/chest/regisExcerChestUC";
import { RegisterChestController } from "./chest/RegisterExcerciseChestController";
import { RegisterExercisesBackUC } from "../../application/back/regisExcerBackUC";
import { RegisterBackController } from "./back/RegisterExerciseBackController";
import { RegisterExercisesCoreUC } from "../../application/core/regisExcerCoreUs";
import { RegisterCoreController } from "./core/RegisterExcerciseCoreController";
//chest

//arm
import { ListArmExerciseByIdUC } from "../../application/arm/listArmExercisesByIdUC";
import { ListArmExercisesByIdController } from "./arm/listAllExercisesByIdContreoller";

//back
import { ListBackExerciseByIdUC } from "../../application/back/listBackExercisesByIdUC";
import { ListBackExercisesByIdController } from "./back/listAllExercisesByIdContreoller";

import { ListCoreExerciseByIdUC } from "../../application/core/listCoreExercisesByIdUC";
import { ListCoreExercisesByIdController } from "./core/listAllExercisesByIdContreoller";

import { ListLegExerciseByIdUC } from "../../application/leg/listLegExercisesByIdUC";
import { ListLegExercisesByIdController } from "./leg/listAllExercisesByIdContreoller";
import { ListChestExerciseByIdUC } from "../../application/chest/listChestExercisesByIdUC";
import { ListChestExercisesByIdController } from "./chest/listAllExercisesByIdContreoller";

export const mySqlRepository =  new MysqlRepository();

export const registerExercisesUC =  new RegisterExercisesUC(mySqlRepository);
export const registerController = new RegisterController(registerExercisesUC);

export const listAllExercisesByIdUC = new ListAllExercisesByIdUC(mySqlRepository);
export const listAllExercisesByIdController = new ListAllExercisesByIdController(listAllExercisesByIdUC);

export const listAllExercisesUC = new ListAllExercisesUC(mySqlRepository);
export const listAllExercisesController = new ListAllExercisesController(listAllExercisesUC);
//leg
export const registerExercisesLegUC = new RegisterExercisesLegUC(mySqlRepository);
export const registerLegController = new RegisterLegController(registerExercisesLegUC);

//chest 
export const registerExercisesChestUC = new RegisterExercisesChestUC(mySqlRepository);
export const registerChestController = new RegisterChestController(registerExercisesChestUC);


//arm
export const registerExercisesArmUC = new RegisterExercisesArmUC(mySqlRepository);
export const registerArmController = new RegisterArmController(registerExercisesArmUC);

//back
export const registerExercisesBackUC = new RegisterExercisesBackUC(mySqlRepository);
export const registerBackController = new RegisterBackController(registerExercisesBackUC);

//core
export const registerExercisesCoreUC = new RegisterExercisesCoreUC(mySqlRepository);
export const registerCoreController = new RegisterCoreController(registerExercisesCoreUC);





export const listArmExercisesByIdUC = new ListArmExerciseByIdUC(mySqlRepository);
export const listArmExercisesByIdController = new ListArmExercisesByIdController(listArmExercisesByIdUC);

export const listBackExercisesByIdUC = new ListBackExerciseByIdUC(mySqlRepository);
export const listBackExercisesByIdController = new ListBackExercisesByIdController(listBackExercisesByIdUC);

export const listChestExcersisesByIdUC = new ListChestExerciseByIdUC(mySqlRepository);
export const listChestExcersisesByIdController = new ListChestExercisesByIdController(listChestExcersisesByIdUC);

export const listCoreExercisesByIdUC = new ListCoreExerciseByIdUC(mySqlRepository);
export const listCoreExercisesByIdController = new ListCoreExercisesByIdController(listCoreExercisesByIdUC);

export const listLegExercisesByIdUC = new ListLegExerciseByIdUC(mySqlRepository);
export const listLegExercisesByIdController = new ListLegExercisesByIdController(listLegExercisesByIdUC);
