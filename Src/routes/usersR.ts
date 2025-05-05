import express from "express";
import {
    getUsuarios,
    nuevoUsuario,
    actualizarUsuario,
    deleteUser
} from '../Controlers/userCntrl';
import { auth } from '../Middleware/authMiddleware';

const router = express.Router();

router.get('', auth, getUsuarios);
router.post('', nuevoUsuario);
router.patch('/:id', auth, actualizarUsuario);
router.delete('/:id', auth, deleteUser); 

export default router;
