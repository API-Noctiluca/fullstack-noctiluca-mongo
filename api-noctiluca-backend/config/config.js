import dotenv from "dotenv";

//elige el archivo de acuerdo con el entorno
export const NODE_ENV = process.env.NODE_ENV;
const fileEnv = NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: fileEnv });

//configuraciones generales
export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = process.env.PORT || 3000;


//configuraciones de la base de datos 
export const MONGO_URI = process.env.MONGO_URI;
