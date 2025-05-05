import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userTable } from '../Models/userModel';
import dotenv from 'dotenv';

dotenv.config();

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const users = await userTable.find().select('-password'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

export const nuevoUsuario = async (req: Request, res: Response) => {
    const { nombre, correo, admin, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userTable({ nombre, correo, admin, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

export const loginUsuario = async (req: Request, res: Response) => {
    const { correo, password } = req.body;
    try {
        const user = await userTable.findOne({ correo });
        
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        if (!user.password) {
            return res.status(500).json({ error: 'Contraseña no definida para este usuario' });
        }

        const isValid = await bcrypt.compare(password, user.password as string); // Aquí estamos asegurándonos que user.password sea un string
        if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: user._id, correo: user.correo, admin: user.admin },
            process.env.SECRET_KEY as string,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const modUser = await userTable.findByIdAndUpdate(id, req.body, { new: true });
        res.json(modUser);
    } catch {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await userTable.findByIdAndDelete(id);
        res.json({ mensaje: `Usuario con id ${id} eliminado` });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
