"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const app_1 = __importDefault(require("./app"));
// Loads .env file que incluye variables de entorno
dotenv_1.default.config();
// poner generics <string> para que no dé un error de ambiguedad string|undefined
const PORT = process.env.PORT;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOSTNAME = process.env.DB_HOSTNAME;
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = (0, models_1.startSequelize)(DB_NAME, DB_PASS, DB_HOSTNAME, DB_USER);
        yield sequelize.sync(); // sincroniza metodos en sequelize con la DB en postgres
        console.info('DB and Express server is up and running!!!!'); // ver esto en consola = funciona
    }
    catch (error) {
        console.error(error);
        process.abort(); // para que no se quede corriendo el server si hay un error
    }
}));
