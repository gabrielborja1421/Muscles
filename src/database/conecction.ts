import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    
};

// Crea el pool de conexiones
const pool = mysql.createPool(config);

// Exporta la función de consulta
export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const conn = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");

    const [rows] = await conn.execute(sql, params); // Ajusta aquí para obtener las filas
    conn.release();
    return rows; // Retorna las filas obtenidas
  } catch (error) {
    console.log(process.env.DB_HOST);
    signale.error(error);
    return null;
  }
}
