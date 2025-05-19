import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import userRoutes from "./routes/usersR"; 
var cors= require('cors')


dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors()); 

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL || "mongodb://localhost:27017/ApiDB25";


mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully at: ", MONGOURL);
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Error DB:", error));


app.use("/usuarios", userRoutes);



