import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    admin: Boolean,
    password: String
});

export const userTable = mongoose.model("Users", userSchema);
