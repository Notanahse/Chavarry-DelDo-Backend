import express from 'express';
import mongoose from 'mongoose';
import {
  getComputadoras,
  createComputadora,
  updateComputadora,
  deleteComputadora
} from '../Controlers/controllerComputer';

const app=express();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/ApiDB25";

mongoose.connect("mongodb://localhost:27017/ApiDB25").then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }).catch((error) => console.error(error));
  


const router = express.Router();

router.get('/', getComputadoras);
router.post('/', createComputadora);
router.patch('/:id', updateComputadora);
router.delete('/:id', deleteComputadora);

export default router;
