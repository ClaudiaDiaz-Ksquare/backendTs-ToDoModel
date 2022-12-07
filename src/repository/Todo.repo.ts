import { InferAttributes } from "sequelize";
import { Todo } from "../models/Todo.model";

// // LIST
// export const listTodos = async () => {
//     const res = await Todo.findAll({
//         attributes: ['id'], // SELECT id FROM Todos WHERE is_completed = true;
//         where: {
//             is_completed: true
//         }
//     })

//     return res;
// }

// Create operation
export const createTodo = async (description:string) => {
    try {
        const newTodo = await Todo.create({
            description: description,
        })
        
        return newTodo.id;
    } catch (error) {
        console.error(error);
        return null; // por nsi falla, que regrese algún id aunque sea
    }
}

// READ Operation
export const fetchTodoById = async (id:number) => {
    try {
        const todoFetched = await Todo.findByPk(id);

        return todoFetched;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// UPDATE Operation
// Infer attributes para no pasar cada cosa/atributo del modelo
export const updateTodoById = async (id:number, todoModel: InferAttributes<Todo>) => {
    try {
        const todoUpdated = await Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where:{
                id: todoModel.id
            }
        });
        
        return todoUpdated;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// DELETE operation (HARD)
// Pasar PARANONID en Todo.model para NO hacerlo soft, *falla*
export const deleteTodoById = async (id:number) => {
    try {
        const todoDeletedRows = await Todo.destroy({
            where: {
                id: id,
            }
        });

        return todoDeletedRows;
    } catch (error) {
        console.error(error);
        return null
    }
}