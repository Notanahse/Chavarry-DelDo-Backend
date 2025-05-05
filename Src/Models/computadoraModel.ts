import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  precio: Number
});

export const userModel = mongoose.model("computadoras", userSchema);
