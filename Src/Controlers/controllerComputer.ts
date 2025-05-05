import { Request, Response } from 'express';
import { userModel } from '../Models/computadoraModel';

export const getComputadoras = async (req: Request, res: Response) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las computadoras' });
  }
};

export const createComputadora = async (req: Request, res: Response) => {
  const { marca, modelo, precio } = req.body;
  try {
    const nuevaComputadora = new userModel({ marca, modelo, precio });
    await nuevaComputadora.save();
    res.status(201).json(nuevaComputadora);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la computadora' });
  }
};

export const updateComputadora = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const computadoraActualizada = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(computadoraActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la computadora' });
  }
};

export const deleteComputadora = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userModel.findByIdAndDelete(id);
    res.json({ mensaje: `Computadora con ID ${id} eliminada` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la computadora' });
  }
};
