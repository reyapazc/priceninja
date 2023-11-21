import mongoose from 'mongoose';

let isConnected = false;// Variable para hacer un seguimiento del estado de la conexión

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI) return console.log('MONGODB_URI no está definido');

  if(isConnected) return console.log('=> Utilizando la conexión existente a la base de datos');

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('MongoDB conectado');
  } catch (error) {
    console.log(error)
  }
}