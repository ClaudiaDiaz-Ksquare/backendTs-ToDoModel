"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTodoModel = exports.Todo = void 0;
const sequelize_1 = require("sequelize");
// usa <generics> para inferir los atributos de la clase y los tipados
class Todo extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.Todo = Todo;
// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
const initTodoModel = (sequelize) => {
    Todo.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: sequelize_1.DataTypes.STRING,
        is_completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { modelName: "Todo",
        // paranoid: true, // por alguna razón el activarlo hace que falle todo
        // sequelize: sequelize
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initTodoModel = initTodoModel;
