import express, { Application, Request, Response } from 'express';
const app: Application = express(); // para el servidor
// Importar routers
import { TodoRouter } from './routes/Todo.routes'

// Middleware that parses json -> transforma en json cualqueir peticion tipo json
app.use(express.json());

// Middleware para usar router
app.use('/todos', TodoRouter); // EL POST SE TIENE QUE HACER A ESA RUTA /todos

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app; // para poderla importar fuera