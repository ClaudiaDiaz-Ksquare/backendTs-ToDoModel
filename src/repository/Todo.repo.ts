import { Todo } from "../models/Todo.model";

// Create operation
export const createTodo = async (description:string) => {
    try {
        const newTodo = await Todo.create({
            description
        })

        return newTodo.id;
    } catch (error) {
        console.error(error);
    }
}

// // READ Operation
// export const getTodo = async (id:number) => {
//     try {
//         const todoFetched = await Todo.findByPk(id);

//         if (!todoFetched) {
//             return "Id not found";
//         }
//         return todoFetched;
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Delete operation (soft)
// export const deleteTodo = async (id:number) => {
//     try {
//         await Todo.destroy();

//         return 'Data deleted succesfully';
//     } catch (error) {
//         console.error(error);
//     }
// }