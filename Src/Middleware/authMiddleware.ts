import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY no está definida en las variables de entorno");
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Token no proporcionado' });
            return; // Sale del middleware si no hay token
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, SECRET_KEY);
        req.body.user = decoded; // Decodifica el token y añade la información del usuario a `req.body`
        
        next(); // Llama a la siguiente función del middleware o ruta

    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
};
console.log(process.env.SECRET_KEY); // Verifica si la variable SECRET_KEY está cargada correctamente
