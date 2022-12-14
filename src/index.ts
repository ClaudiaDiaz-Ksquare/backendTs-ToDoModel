import dotenv from 'dotenv';
import { startSequelize  } from './models';
import app from './app';
// Loads .env file que incluye variables de entorno
dotenv.config();

// poner generics <string> para que no dé un error de ambiguedad string|undefined
const PORT = process.env.PORT;
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_NAME = <string>process.env.DB_NAME;
const DB_HOSTNAME = <string>process.env.DB_HOSTNAME;

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(DB_NAME, DB_PASS, DB_HOSTNAME, DB_USER);
        await sequelize.sync(); // sincroniza metodos en sequelize con la DB en postgres
        console.info('DB and Express server is up and running!!!!') // ver esto en consola = funciona
    } catch (error) {
        console.error(error);
        process.abort(); // para que no se quede corriendo el server si hay un error
    }
})