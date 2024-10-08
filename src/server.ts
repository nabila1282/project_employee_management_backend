import mongoose from 'mongoose'
import { app } from './app'
const port: number = Number(process.env.PORT) || 5000;
const dataBaseUrl: string = process.env.DATABASE_URL || "default_connection_string";

async function main() {
  try {
    await mongoose.connect(dataBaseUrl as string)
    console.log('🛢yes database connected succcesfully ')
    //listen
    
  } catch (err) {
    console.log('failed to coonet in database', err)
  }
}
main().then(() => {
   app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
  });
});
