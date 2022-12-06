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
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_model_1 = require("../models/Todo.model");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
// CREATE [POST]
exports.TodoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const description = req.body.description;
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No description'
        });
    }
    // Si tengo mi description -> crear un nuevo TODO y guardarlo a la DB
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodoId
    });
}));
// READ [GET]
exports.TodoRouter.get('/:id', (req, res) => {
    Todo_model_1.Todo.findByPk(req.params.id).then((result) => {
        res.json(result);
    });
});
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
exports.TodoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Todo_model_1.Todo.destroy({
        where: {
            id: req.params.id,
        }
    }).then((result) => {
        res.json(result);
    });
    // const id = req.params['id'] as string
    // if (!id) {
    //     res.status(400)
    //     return res.send({
    //         message: 'No existing list item that matches the id'
    //     })
    // }
}));
