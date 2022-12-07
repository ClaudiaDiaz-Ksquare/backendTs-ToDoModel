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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.fetchTodoById = exports.createTodo = void 0;
const Todo_model_1 = require("../models/Todo.model");
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
const createTodo = (description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_model_1.Todo.create({
            description: description,
        });
        return newTodo.id;
    }
    catch (error) {
        console.error(error);
        return null; // por nsi falla, que regrese algún id aunque sea
    }
});
exports.createTodo = createTodo;
// READ Operation
const fetchTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoFetched = yield Todo_model_1.Todo.findByPk(id);
        return todoFetched;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchTodoById = fetchTodoById;
// UPDATE Operation
// Infer attributes para no pasar cada cosa/atributo del modelo
const updateTodoById = (id, todoModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoUpdated = yield Todo_model_1.Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where: {
                id: todoModel.id
            }
        });
        return todoUpdated;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateTodoById = updateTodoById;
// DELETE operation (HARD)
// Pasar PARANONID en Todo.model para NO hacerlo soft, *falla*
const deleteTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoDeletedRows = yield Todo_model_1.Todo.destroy({
            where: {
                id: id,
            }
        });
        return todoDeletedRows;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteTodoById = deleteTodoById;
