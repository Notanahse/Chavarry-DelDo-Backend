
import fs from 'fs';
import {Mascotas} from '../Models/Mascotas'
const database=require('../Database/mascota.json');

export class cntrlMascota{
  

static getMascotasjson(){    
    let mascotasJson:Mascotas[] = [];

    database.mascotas.forEach((mascota: { nombre: string; tipo: string })=> {
      let animal:Mascotas = new Mascotas(mascota.nombre, mascota.tipo)
      mascotasJson.push(animal)
    });
    return mascotasJson;
}



static getMascotaByIndex(index: number) {
  if (index >= 0 && index < database.mascotas.length) {
    return database.mascotas[index];
  }
  return null; 
}


}