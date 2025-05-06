import express from "express";
import {
    getUsuarios,
    nuevoUsuario,
    actualizarUsuario,
    deleteUser
} from '../Controlers/userCntrl';
import { loginUsuario } from "../Controlers/userCntrl";
import { auth } from '../Middleware/authMiddleware';

const router = express.Router();

router.post('/login',loginUsuario)
router.get('', auth, getUsuarios);
router.post('', nuevoUsuario);
router.patch('/:id', auth, actualizarUsuario);
router.delete('/:id', auth, deleteUser); 

export default router;
