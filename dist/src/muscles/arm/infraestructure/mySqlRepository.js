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
exports.MysqlRepository = void 0;
const conecction_1 = require("../../../database/conecction");
const arm_1 = require("../domain/arm");
class MysqlRepository {
    registerExercises(userid, exercisesid, weight) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener la fecha actual en formato YYYY-MM-DD
                const currentDate = new Date().toISOString().split('T')[0];
                // Consulta para verificar si el usuario ya hizo el ejercicio en el mismo día
                const checkDuplicateSql = "SELECT * FROM registroejercicio WHERE userid = ? AND exerciseid = ? AND DATE(fecha) = ?";
                const checkDuplicateParams = [userid, exercisesid, currentDate];
                const [duplicateResult] = yield (0, conecction_1.query)(checkDuplicateSql, checkDuplicateParams);
                // Si ya existe un registro para el mismo usuario, ejercicio y fecha, no insertar un nuevo registro
                if (duplicateResult.length > 0) {
                    console.error("El usuario ya ha realizado este ejercicio hoy.");
                    return null;
                }
                // Consulta para insertar el nuevo registro de ejercicio
                const insertSql = "INSERT INTO registroejercicio (userid, exerciseid, peso) VALUES (?, ?, ?)";
                const insertParams = [userid, exercisesid, weight];
                const [result] = yield (0, conecction_1.query)(insertSql, insertParams);
                if (result.insertId) {
                    // Crear una instancia de Arm con el ID generado
                    const user = new arm_1.Arm(result.insertId, userid, exercisesid, weight);
                    return user;
                }
                else {
                    console.error("No se pudo insertar el registro de ejercicio en la base de datos.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error al registrar el ejercicio:", error);
                return null;
            }
        });
    }
    listAllExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT logid AS id, userid AS userid, exerciseid AS exercises, peso AS weight FROM registroejercicio";
                const [rows] = yield (0, conecction_1.query)(sql);
                if (!Array.isArray(rows)) {
                    throw new Error('Rows is not an array');
                }
                // Mapear los resultados directamente a instancias de User
                const users = rows.map((row) => {
                    return new arm_1.Arm(row.id, row.userid, row.exercises, row.weight);
                });
                return users;
            }
            catch (error) {
                console.error("Error al listar usuarios:", error);
                return null; // Opcionalmente, podrías lanzar una excepción en lugar de retornar null
            }
        });
    }
    listAllExercisesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT logid AS id, userid AS userid, exerciseid AS exercises, peso AS weight FROM registroejercicio WHERE logid = ? LIMIT 1";
                const [rows] = yield (0, conecction_1.query)(sql, [id]);
                // Verificar si no se encontraron resultados o si la respuesta es vacía
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                const user = new arm_1.Arm(row.id, row.userid, row.exercises, row.weight);
                return user;
            }
            catch (error) {
                console.error("Error en RegistroEjercicio:", error);
                return null;
            }
        });
    }
}
exports.MysqlRepository = MysqlRepository;
