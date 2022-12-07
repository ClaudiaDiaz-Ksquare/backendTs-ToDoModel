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
    res.status(201).send({
        id: newTodoId
    });
}));
// READ [GET]
exports.TodoRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params['id']);
    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        });
    }
    const todoFetched = yield (0, Todo_repo_1.fetchTodoById)(id);
    if (!todoFetched) {
        res.status(400);
        return res.send({
            error: "Id not found"
        });
    }
    // If we get here, the Id exists
    res.send(todoFetched);
    // Esto solito igual funciona pero es menos sólido
    // Todo.findByPk(req.params.id).then((result) =>{
    //     res.json(result)
    // })
}));
// // UPDATE
exports.TodoRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params['id']);
    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        });
    }
    const body = req.body.is_completed;
    const affectedRows = yield (0, Todo_repo_1.updateTodoById)(id, body);
    if (!affectedRows) {
        res.status(400);
        return res.send({
            error: "Something went wrong"
        });
    }
    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: "Update failed"
        });
    }
    // If we get here, the Id exists
    const todoFetched = yield (0, Todo_repo_1.fetchTodoById)(id);
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
}));
// DELETE
exports.TodoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params['id']);
    if (id <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid Id, it must be greater than 0'
        });
    }
    const deletedRows = yield (0, Todo_repo_1.deleteTodoById)(id);
    if (!deletedRows) {
        return res.status(400).send({
            error: 'Cannot delete'
        });
    }
    // If we get here, the Id exists
    return res.status(200).send({
        message: `Row with ID ${id} deleted successfully`
    });
    // return res.sendStatus(200);
}));
