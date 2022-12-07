import { Router, Request, Response } from 'express';
import { initTodoModel, Todo } from '../models/Todo.model';
import { createTodo, fetchTodoById, deleteTodoById, updateTodoById} from '../repository/Todo.repo'
export const TodoRouter = Router();



// CREATE [POST]
TodoRouter.post('/', async (req: Request, res: Response) => {
    const description: string = req.body.description as string;

    if (!description) {
        res.status(400)
        return res.send({
            message: 'No description'
        })
    }
    // Si tengo mi description -> crear un nuevo TODO y guardarlo a la DB
    const newTodoId = await createTodo(description);

    res.status(201).send({
        id: newTodoId
    })
})

// READ [GET]
TodoRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params['id']) as number;

    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        })
    }

    const todoFetched = await fetchTodoById(id);

    if (!todoFetched) {
        res.status(400)
        return res.send({
            error: "Id not found"
        })
    }
    // If we get here, the Id exists
    res.send(todoFetched)

    // Esto solito igual funciona pero es menos sólido
    // Todo.findByPk(req.params.id).then((result) =>{
    //     res.json(result)
    // })

})

// // UPDATE
TodoRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params['id']) as number;

    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        })
    }
    const body = req.body.is_completed;
    const affectedRows = await updateTodoById(id, body);

    if (!affectedRows) {
        res.status(400)
        return res.send({
            error: "Something went wrong"
        })
    }
    
    if (affectedRows[0] === 0) {
        res.status(400)
        return res.send({
            error: "Update failed"
        })
    }

    // If we get here, the Id exists
    const todoFetched = await fetchTodoById(id);

    res.status(200);
    return res.send(affectedRows);

    // Todo.update({
    //     // is_completed: req.body.is_completed,
    //     description: req.body.description,
    // },{
    //     where: {
    //         id: req.params.id,
    //     }
    // }).then((result: any) => {
    //     res.json(result);
    // })
})

// DELETE
TodoRouter.delete('/:id', async (req: Request, res: Response) => {

    const id: number = Number(req.params['id']) as number;

    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        })
    }

    const deletedRows = await deleteTodoById(id);

    if (!deletedRows) {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }
    // If we get here, the Id exists
    return res.status(200).send({
        message: `Row with ID ${id} deleted successfully`
    });
    // return res.sendStatus(200);
})