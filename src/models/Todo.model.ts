import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize } from "sequelize";

// usa <generics> para inferir los atributos de la clase y los tipados
export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    // genera propiedades en la clase, pero no existen en js solo ts 
    // todo esto es lo que se pasa en el json al hacer un post, a menos de que sea opcional 
    declare id: CreationOptional<number>;
    declare description: string;
    declare is_completed: CreationOptional<boolean>;

    getId(): number {
        return this.id;
    }
}

// Inicializar el modelo con sus columnas en la tabla que continen el objeto de adentro
export const initTodoModel = (sequelize: Sequelize) => {
    Todo.init({
    
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: DataTypes.STRING,
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
}, { modelName: "Todo", // que luego se cambia a plural "Todos" pq la DB guarda varias tablaS
    // paranoid: true, // por alguna razón el activarlo hace que falle todo
    // sequelize: sequelize
    sequelize // Instance of sequelize that reflects the connection
})
}