import express  , {Request,Response} from 'express';
import {cntrlMascota} from "../Controlers/cntrlMascota";

export let mascotaRoutes = express.Router();

mascotaRoutes.get('',(req:Request,res:Response)=>{
    res.json(cntrlMascota.getMascotasjson())
});


mascotaRoutes.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id); 
    const mascota = cntrlMascota.getMascotaByIndex(id); 
    if (mascota) {
      res.json(mascota); 
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  });


