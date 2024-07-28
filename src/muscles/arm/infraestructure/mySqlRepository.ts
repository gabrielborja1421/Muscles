import e from "express";
import { query } from "../../../database/conecction";
import { Logs } from "../domain/arm";
import { IArmRepository } from "../domain/armRepository";
import { Arm } from "../domain/entities/arm";
import { Back } from "../domain/entities/back";
import { Chest } from "../domain/entities/chest";
import { Core } from "../domain/entities/core";
import { Leg } from "../domain/entities/leg";

export class MysqlRepository implements IArmRepository {
  async registerExercises(
    userid: number,
    exercisesid: number,
    weight: number
  ): Promise<Logs | null> {
    try {
      // Obtener la fecha actual en formato YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];

      // Consulta para verificar si el usuario ya hizo el ejercicio en el mismo día
      const checkDuplicateSql =
        "SELECT * FROM registroejercicio WHERE userid = ? AND exerciseid = ? AND DATE(fecha) = ?";
      const checkDuplicateParams: any[] = [userid, exercisesid, currentDate];
      const [duplicateResult]: any = await query(checkDuplicateSql, checkDuplicateParams);

      // Si ya existe un registro para el mismo usuario, ejercicio y fecha, no insertar un nuevo registro
      if (duplicateResult.length > 0) {
        console.error("El usuario ya ha realizado este ejercicio hoy.");
        return null;
      }

      // Consulta para insertar el nuevo registro de ejercicio
      const insertSql = "INSERT INTO registroejercicio (userid, exerciseid, peso) VALUES (?, ?, ?)";
      const insertParams: any[] = [userid, exercisesid, weight];
      const [result]: any = await query(insertSql, insertParams);

      if (result.insertId) {
        // Crear una instancia de Arm con el ID generado
        const user = new Logs(result.insertId, userid, exercisesid, weight);
        return user;
      } else {
        console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar el ejercicio:", error);
      return null;
    }
  }


  async listAllExercises(): Promise<Logs[] | null> {
    try {
      const sql = "SELECT logid AS id, userid AS userid, exerciseid AS exercises, peso AS weight FROM registroejercicio"; 
      const [rows]: any = await query(sql);

      if (!Array.isArray(rows)) {
        throw new Error('Rows is not an array');
      }

      // Mapear los resultados directamente a instancias de User
      const users: Logs[] = rows.map((row: any) => {
        return new Logs(
          row.id,     
          row.userid,   
          row.exercises,
          row.weight
        );
      });


      return users;
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
    }
}


  async listAllExercisesById(id: number): Promise<Logs | null> {
    try {
        const sql = "SELECT logid AS id, userid AS userid, exerciseid AS exercises, peso AS weight FROM registroejercicio WHERE logid = ? LIMIT 1";
        const [rows]: any = await query(sql, [id]);

        // Verificar si no se encontraron resultados o si la respuesta es vacía
        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }

        const row = rows[0];
        const user = new Logs(
            row.id,
            row.userid,
            row.exercises,
            row.weight,
        );

       

        return user;
    } catch (error) {
        console.error("Error en RegistroEjercicio:", error);
        return null;
    }
}

async registerLeg(
  userid: number,
  legPress?: number,
  reps_legPress?: number,
  legCurl?: number,
  reps_legCurl?: number,
  legExtension?: number,
  reps_legExtension?: number,
  Squat?: number,
  reps_Squat?: number
): Promise<Leg | null | any> {
  try {
    const currentDate = new Date();
    const sixteenHoursAgo = new Date(currentDate.getTime() - 16 * 60 * 60 * 1000);

    // Replace undefined values with null
    const params = [
      legPress ?? null,
      legCurl ?? null,
      legExtension ?? null,
      Squat ?? null
    ];

    // Consulta para verificar si el usuario ya hizo el ejercicio en las últimas 16 horas
    const checkDuplicateSql = `
      SELECT * FROM Leg 
      WHERE userid = ? 
      AND (
        (legPress IS NOT NULL AND legPress = ?) OR 
        (legCurl IS NOT NULL AND legCurl = ?) OR 
        (legExtension IS NOT NULL AND legExtension = ?) OR 
        (Squat IS NOT NULL AND Squat = ?)
      )
      AND fecha >= ?`;

    const checkDuplicateParams: any[] = [
      userid,
      ...params,
      sixteenHoursAgo.toISOString()
    ];

    const duplicateResult: any = await query(checkDuplicateSql, checkDuplicateParams);

    // Si ya existe un registro para el mismo usuario, ejercicio y dentro de las últimas 16 horas, no insertar un nuevo registro
    if (duplicateResult.length > 0) {
      console.error("El usuario ya ha realizado este ejercicio en las últimas 16 horas.");
      return null;
    }

    // Consulta para insertar el nuevo registro de ejercicio
    const insertSql = `
      INSERT INTO Leg (
        userid, 
        legPress, reps_legPress, 
        legCurl, reps_legCurl, 
        legExtension, reps_legExtension, 
        Squat, reps_Squat
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertParams: any[] = [
      userid,
      legPress ?? null, reps_legPress ?? null,
      legCurl ?? null, reps_legCurl ?? null,
      legExtension ?? null, reps_legExtension ?? null,
      Squat ?? null, reps_Squat ?? null
    ];

    const result: any = await query(insertSql, insertParams);

    if (result && result.insertId) {
      const user = new Leg(
        result.insertId, userid, 
        legPress, reps_legPress, 
        legCurl, reps_legCurl, 
        legExtension, reps_legExtension, 
        Squat, reps_Squat
      );
      return user;
    } else {
      console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
      return null;
    }
  } catch (error) {
    console.error("Error al registrar el ejercicio:", error);
    return null;
  }
}


async registerBack(
  userid: number,
  deadlift?: number,
  reps_deadlift?: number,
  bentOverRow?: number,
  reps_bentOverRow?: number,
  pullUps?: number,
  reps_pullUps?: number,
  latPulldown?: number,
  reps_latPulldown?: number,
  dumbbellRow?: number,
  reps_dumbbellRow?: number
): Promise<Back | null> {
  try {
    const currentDate = new Date();
    const sixteenHoursAgo = new Date(currentDate.getTime() - 16 * 60 * 60 * 1000);

    // Replace undefined values with null
    const params = [
      deadlift ?? null,
      reps_deadlift ?? null,
      bentOverRow ?? null,
      reps_bentOverRow ?? null,
      pullUps ?? null,
      reps_pullUps ?? null,
      latPulldown ?? null,
      reps_latPulldown ?? null,
      dumbbellRow ?? null,
      reps_dumbbellRow ?? null
    ];

    // Consulta para verificar si el usuario ya hizo el ejercicio en las últimas 16 horas
    const checkDuplicateSql = `
      SELECT * FROM Back 
      WHERE userid = ? 
      AND (
        (deadlift IS NOT NULL AND deadlift = ?) OR 
        (bentOverRow IS NOT NULL AND bentOverRow = ?) OR 
        (pullUps IS NOT NULL AND pullUps = ?) OR 
        (latPulldown IS NOT NULL AND latPulldown = ?) OR 
        (dumbbellRow IS NOT NULL AND dumbbellRow = ?)
      )
      AND fecha >= ?`;

    const checkDuplicateParams: any[] = [
      userid,
      params[0], params[2], params[4], params[6], params[8],
      sixteenHoursAgo.toISOString()
    ];

    const duplicateResult: any = await query(checkDuplicateSql, checkDuplicateParams);

    if (duplicateResult && duplicateResult.length > 0) {
      console.error("El usuario ya ha realizado este ejercicio en las últimas 16 horas.");
      return null;
    }

    // Consulta para insertar el nuevo registro de ejercicio
    const insertSql = `
      INSERT INTO Back (
        userid, 
        deadlift, reps_deadlift, 
        bentOverRow, reps_bentOverRow, 
        pullUps, reps_pullUps, 
        latPulldown, reps_latPulldown, 
        dumbbellRow, reps_dumbbellRow
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertParams: any[] = [
      userid,
      params[0], params[1],
      params[2], params[3],
      params[4], params[5],
      params[6], params[7],
      params[8], params[9]
    ];

    const result: any = await query(insertSql, insertParams);

    if (result && result.insertId) {
      const user = new Back(
        result.insertId, userid,
        deadlift ?? 0, reps_deadlift ?? 0,
        bentOverRow ?? 0, reps_bentOverRow ?? 0,
        pullUps ?? 0, reps_pullUps ?? 0,
        latPulldown ?? 0, reps_latPulldown ?? 0,
        dumbbellRow ?? 0, reps_dumbbellRow ?? 0
      );
      return user;
    } else {
      console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
      return null;
    }
  } catch (error) {
    console.error("Error al registrar el ejercicio:", error);
    return null;
  }
}
  //metodo para registrar ejercicios de brazo
  async registerArm(
    userid: number,
    bicepCurl?: number,
    reps_bicepCurl?: number,
    hammerCurl?: number,
    reps_hammerCurl?: number,
    barbellCurl?: number,
    reps_barbellCurl?: number,
    skullcrusher?: number,
    reps_skullcrusher?: number,
    dumbbellOverheadTricepsExtension?: number,
    reps_dumbbellOverheadTricepsExtension?: number,
    tricepsPushdown?: number,
    reps_tricepsPushdown?: number,
    pushPress?: number,
    reps_pushPress?: number,
    closeGripBenchPress?: number,
    reps_closeGripBenchPress?: number,
    militaryPress?: number,
    reps_militaryPress?: number,
    lateralRaise?: number,
    reps_lateralRaise?: number,
    frontRaise?: number,
    reps_frontRaise?: number,
    reverseFly?: number,
    reps_reverse?: number,
    shoulderPress?: number,
    reps_shoulderPress?: number
): Promise<Arm | null> {
    try {
        const currentDate = new Date();
        const sixteenHoursAgo = new Date(currentDate.getTime() - 16 * 60 * 60 * 1000);

        // Replace undefined values with null
        const params = [
            bicepCurl ?? null,
            reps_bicepCurl ?? null,
            hammerCurl ?? null,
            reps_hammerCurl ?? null,
            barbellCurl ?? null,
            reps_barbellCurl ?? null,
            skullcrusher ?? null,
            reps_skullcrusher ?? null,
            dumbbellOverheadTricepsExtension ?? null,
            reps_dumbbellOverheadTricepsExtension ?? null,
            tricepsPushdown ?? null,
            reps_tricepsPushdown ?? null,
            pushPress ?? null,
            reps_pushPress ?? null,
            closeGripBenchPress ?? null,
            reps_closeGripBenchPress ?? null,
            militaryPress ?? null,
            reps_militaryPress ?? null,
            lateralRaise ?? null,
            reps_lateralRaise ?? null,
            frontRaise ?? null,
            reps_frontRaise ?? null,
            reverseFly ?? null,
            reps_reverse ?? null,
            shoulderPress ?? null,
            reps_shoulderPress ?? null
        ];

        // Consulta para verificar si el usuario ya hizo el ejercicio en las últimas 16 horas
        const checkDuplicateSql = `
            SELECT * FROM Arm
            WHERE userid = ?
            AND (
                (bicepCurl IS NOT NULL AND bicepCurl = ?) OR
                (hammerCurl IS NOT NULL AND hammerCurl = ?) OR
                (barbellCurl IS NOT NULL AND barbellCurl = ?) OR
                (skullcrusher IS NOT NULL AND skullcrusher = ?) OR
                (dumbbellOverheadTricepsExtension IS NOT NULL AND dumbbellOverheadTricepsExtension = ?) OR
                (tricepsPushdown IS NOT NULL AND tricepsPushdown = ?) OR
                (pushPress IS NOT NULL AND pushPress = ?) OR
                (closeGripBenchPress IS NOT NULL AND closeGripBenchPress = ?) OR
                (militaryPress IS NOT NULL AND militaryPress = ?) OR
                (lateralRaise IS NOT NULL AND lateralRaise = ?) OR
                (frontRaise IS NOT NULL AND frontRaise = ?) OR
                (reverseFly IS NOT NULL AND reverseFly = ?) OR
                (shoulderPress IS NOT NULL AND shoulderPress = ?)
            )
            AND fecha >= ?`;

        const checkDuplicateParams: any[] = [
            userid,
            params[0], params[2], params[4], params[6], params[8], params[10], params[12], params[14], params[16], params[18], params[20], params[22], params[24],
            sixteenHoursAgo.toISOString()
        ];

        const duplicateResult: any = await query(checkDuplicateSql, checkDuplicateParams);

        if (duplicateResult && duplicateResult.length > 0) {
            console.error("El usuario ya ha realizado este ejercicio en las últimas 16 horas.");
            return null;
        }

        // Consulta para insertar el nuevo registro de ejercicio
        const insertSql = `
            INSERT INTO Arm (
                userid,
                bicepCurl, reps_bicepCurl,
                hammerCurl, reps_hammerCurl,
                barbellCurl, reps_barbellCurl,
                skullcrusher, reps_skullcrusher,
                dumbbellOverheadTricepsExtension, reps_dumbbellOverheadTricepsExtension,
                tricepsPushdown, reps_tricepsPushdown,
                pushPress, reps_pushPress,
                closeGripBenchPress, reps_closeGripBenchPress,
                militaryPress, reps_militaryPress,
                lateralRaise, reps_lateralRaise,
                frontRaise, reps_frontRaise,
                reverseFly, reps_reverse,
                shoulderPress, reps_shoulderPress
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const insertParams: any[] = [
            userid,
            ...params
        ];

        const result: any = await query(insertSql, insertParams);

        if (result && result.insertId) {
            const user = new Arm(
                result.insertId, userid,
                bicepCurl ?? 0, reps_bicepCurl ?? 0,
                hammerCurl ?? 0, reps_hammerCurl ?? 0,
                barbellCurl ?? 0, reps_barbellCurl ?? 0,
                skullcrusher ?? 0, reps_skullcrusher ?? 0,
                dumbbellOverheadTricepsExtension ?? 0, reps_dumbbellOverheadTricepsExtension ?? 0,
                tricepsPushdown ?? 0, reps_tricepsPushdown ?? 0,
                pushPress ?? 0, reps_pushPress ?? 0,
                closeGripBenchPress ?? 0, reps_closeGripBenchPress ?? 0,
                militaryPress ?? 0, reps_militaryPress ?? 0,
                lateralRaise ?? 0, reps_lateralRaise ?? 0,
                frontRaise ?? 0, reps_frontRaise ?? 0,
                reverseFly ?? 0, reps_reverse ?? 0,
                shoulderPress ?? 0, reps_shoulderPress ?? 0
            );
            return user;
        } else {
            console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
            return null;
        }
    } catch (error) {
        console.error("Error al registrar el ejercicio:", error);
        return null;
    }
}





async registerChest(
  userid: number,
  barbellBenchPress: number,
  reps_barbellBenchPress: number,
  dumbellBenchPress: number,
  reps_dumbellBenchPress: number,
  inclineBenchPress: number,
  reps_inclineBenchPress: number,
  machineChestPress: number,
  reps_machineChestPress: number,
  declinePress: number,
  reps_declinePress: number
): Promise<Chest | null> {
  try {
    const currentDate = new Date();
    const sixteenHoursAgo = new Date(currentDate.getTime() - 16 * 60 * 60 * 1000);

    // Replace undefined values with null
    const params = [
      barbellBenchPress ?? null,
      reps_barbellBenchPress ?? null,
      dumbellBenchPress ?? null,
      reps_dumbellBenchPress ?? null,
      inclineBenchPress ?? null,
      reps_inclineBenchPress ?? null,
      machineChestPress ?? null,
      reps_machineChestPress ?? null,
      declinePress ?? null,
      reps_declinePress ?? null
    ];

    // Consulta para verificar si el usuario ya hizo el ejercicio en las últimas 16 horas
    const checkDuplicateSql = `
      SELECT * FROM Chest 
      WHERE userid = ? 
      AND (
        (barbellBenchPress IS NOT NULL AND barbellBenchPress = ?) OR 
        (dumbellBenchPress IS NOT NULL AND dumbellBenchPress = ?) OR 
        (inclineBenchPress IS NOT NULL AND inclineBenchPress = ?) OR 
        (machineChestPress IS NOT NULL AND machineChestPress = ?) OR 
        (declinePress IS NOT NULL AND declinePress = ?)
      )
      AND fecha >= ?`;

    const checkDuplicateParams: any[] = [
      userid,
      params[0], params[2], params[4], params[6], params[8],
      sixteenHoursAgo.toISOString()
    ];

    const duplicateResult: any = await query(checkDuplicateSql, checkDuplicateParams);

    // Si ya existe un registro para el mismo usuario, ejercicio y dentro de las últimas 16 horas, no insertar un nuevo registro
    if (duplicateResult && duplicateResult.length > 0) {
      console.error("El usuario ya ha realizado este ejercicio en las últimas 16 horas.");
      return null;
    }

    // Consulta para insertar el nuevo registro de ejercicio
    const insertSql = `
      INSERT INTO Chest (
        userid, 
        barbellBenchPress, reps_barbellBenchPress, 
        dumbellBenchPress, reps_dumbellBenchPress, 
        inclineBenchPress, reps_inclineBenchPress, 
        machineChestPress, reps_machineChestPress, 
        declinePress, reps_declinePress
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const insertParams: any[] = [
      userid,
      params[0], params[1],
      params[2], params[3],
      params[4], params[5],
      params[6], params[7],
      params[8], params[9]
    ];

    const result: any = await query(insertSql, insertParams);

    if (result && result.insertId) {
      const user = new Chest(
        result.insertId, userid, 
        barbellBenchPress, reps_barbellBenchPress, 
        dumbellBenchPress, reps_dumbellBenchPress, 
        inclineBenchPress, reps_inclineBenchPress, 
        machineChestPress, reps_machineChestPress, 
        declinePress, reps_declinePress
      );
      return user;
    } else {
      console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
      return null;
    }
  } catch (error) {
    console.error("Error al registrar el ejercicio:", error);
    return null;
  }
}



async registerCore(
  userid: number,
  russian_twist: number,
  reps_russian_twist: number,
  plank: number,
  reps_plank: number,
  crunch: number,
  reps_crunch: number
): Promise<Core | null> {
  try {
    const currentDate = new Date();
    const sixteenHoursAgo = new Date(currentDate.getTime() - 16 * 60 * 60 * 1000);

    // Replace undefined values with null
    const params = [
      russian_twist ?? null,
      reps_russian_twist ?? null,
      plank ?? null,
      reps_plank ?? null,
      crunch ?? null,
      reps_crunch ?? null
    ];

    // Consulta para verificar si el usuario ya hizo el ejercicio en las últimas 16 horas
    const checkDuplicateSql = `
      SELECT * FROM Core 
      WHERE userid = ? 
      AND (
        (russian_twist IS NOT NULL AND russian_twist = ?) OR 
        (plank IS NOT NULL AND plank = ?) OR 
        (crunch IS NOT NULL AND crunch = ?)
      )
      AND fecha >= ?`;

    const checkDuplicateParams: any[] = [
      userid,
      params[0], params[2], params[4],
      sixteenHoursAgo.toISOString()
    ];

    const duplicateResult: any = await query(checkDuplicateSql, checkDuplicateParams);

    // Si ya existe un registro para el mismo usuario, ejercicio y dentro de las últimas 16 horas, no insertar un nuevo registro
    if (duplicateResult && duplicateResult.length > 0) {
      console.error("El usuario ya ha realizado este ejercicio en las últimas 16 horas.");
      return null;
    }

    // Consulta para insertar el nuevo registro de ejercicio
    const insertSql = `
      INSERT INTO Core (
        userid, 
        russian_twist, reps_russian_twist, 
        plank, reps_plank, 
        crunch, reps_crunch
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const insertParams: any[] = [
      userid,
      params[0], params[1],
      params[2], params[3],
      params[4], params[5]
    ];

    const result: any = await query(insertSql, insertParams);

    if (result && result.insertId) {
      const user = new Core(
        result.insertId, userid, 
        russian_twist, reps_russian_twist, 
        plank, reps_plank, 
        crunch, reps_crunch
      );
      return user;
    } else {
      console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
      return null;
    }
  } catch (error) {
    console.error("Error al registrar el ejercicio:", error);
    return null;
  }
}


async listArmMuscleExercise(id: number): Promise<Arm[] | null> {
  try {
    const sql = "SELECT * FROM Arm WHERE userid = ? ORDER BY fecha DESC";
    const result: any = await query(sql, [id]);

    // Agrega un chequeo de depuración para ver el valor de `result`
    console.log("Resultado de la consulta SQL:", result);

    // Verifica si `result` es un array y si tiene al menos un elemento
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return null;
  }
}

async listLegMuscleExercise(id: number): Promise<Leg[] | null> {
  try {
    const sql = "SELECT * FROM Leg WHERE userid = ? ORDER BY fecha DESC";
    const result: any = await query(sql, [id]);

    // Agrega un chequeo de depuración para ver el valor de `result`
    console.log("Resultado de la consulta SQL:", result);

    // Verifica si `result` es un array y si tiene al menos un elemento
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    } 

    return result;
  } catch (error) {
    console.error("Error al listar ejercicios de pierna:", error);
    return null;
  }
}



async listBackMuscleExercise(id: number): Promise<Back[] | any> {
  try {
    const sql = "SELECT * FROM Back WHERE userid = ? ORDER BY fecha DESC";
    const result: any = await query(sql, [id]);

    // Agrega un chequeo de depuración para ver el valor de `result`
    console.log("Resultado de la consulta SQL:", result);

    // Verifica si `result` es un array y si tiene al menos un elemento
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    } 
    
        return result;
      } catch (error) {
        console.error("Error al listar usuarios:", error);
    } 
}

async listChestMuscleExercise(id: number): Promise<Chest[] | null> {
  try {
    const sql = "SELECT * FROM Chest WHERE userid = ? ORDER BY fecha DESC";
    const result: any = await query(sql, [id]);

    // Agrega un chequeo de depuración para ver el valor de `result`
    console.log("Resultado de la consulta SQL:", result);

    // Verifica si `result` es un array y si tiene al menos un elemento
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    } 

    

    return result;
  } catch (error) {
    console.error("Error al listar ejercicios:", error);
    return null;
  }
}



async listCoreMuscleExercise(id: number): Promise<Core[] | any> {
  try {
    const sql = "SELECT * FROM Core WHERE userid = ? ORDER BY fecha DESC";
    const result: any = await query(sql, [id]);

    // Agrega un chequeo de depuración para ver el valor de `result`
    console.log("Resultado de la consulta SQL:", result);

    // Verifica si `result` es un array y si tiene al menos un elemento
    if (!Array.isArray(result) || result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return null;
  }
}

}
