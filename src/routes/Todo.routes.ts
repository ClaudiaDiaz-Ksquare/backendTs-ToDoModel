import { Router, Request, Response } from 'express';
import { initTodoModel, Todo } from '../models/Todo.model';
import { createTodo } from '../repository/Todo.repo'
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

    res.status(201);
    res.send({
        id: newTodoId
    })
})

// READ [GET]
TodoRouter.get('/:id', (req: Request, res: Response)=>{
    Todo.findByPk(req.params.id).then((result) =>{
        res.json(result)
    })
})

// // UPDATE
// TodoRouter.patch('/:id', async (req: Request, res: Response) => {
//     Todo.update({
//         // is_completed: req.body.is_completed,
//         description: req.body.description,
//     },{
//         where: {
//             id: req.params.id,
//         }
//     }).then((result: any) => {
//         res.json(result);
//     })
// })

// DELETE
TodoRouter.delete('/:id', async (req: Request, res: Response) => {

    Todo.destroy({
        where: {
            id: req.params.id,
        }
    }).then((result: any) => {
        res.json(result);
    })
    // const id = req.params['id'] as string

    // if (!id) {
    //     res.status(400)
    //     return res.send({
    //         message: 'No existing list item that matches the id'
    //     })
    // }
})