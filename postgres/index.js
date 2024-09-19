const {connect} = require("./connectDB");
const Todo = require("./TodoModal");

const createNewTodo = async (todo) => {
  try {
    const todo = {
        title: "Learn Sequelize3",
        dueDate: new Date(),
        completed: true,
    };
    await connect();
    return Todo.createNew(todo);
    console.log("Todo created successfully");
  } catch (error) {
    console.error(error);
  }
};

const countTodos = async () => {
    try {
        await connect();
        const count = await Todo.count();
        console.log(`Total todos: ${count}`);
    } catch (error) {
        console.error(error);
    }
    }

const getAllTodos = async () => {
    try {
        await connect();
        const todos = await Todo.findAll({
            order: [["createdAt", "DESC"]],
        });
        const todoList = todos.map((todo) => todo.displayTodo()).join("\n");
        console.log(todoList);
    } catch (error) {
        console.error(error);
    }
}

const getSingleTodo = async (id) => {
    try {
        await connect();
        const todos = await Todo.findAll({
            where: {
                completed: false,
            },
            order: [["id", "ASC"]],
        });
        const todoList = todos.map((todo) => todo.displayTodo()).join("\n");
        console.log(todoList);
    } catch (error) {
        console.error(error);
    }
}

const updateTodo = async (id) => {
    try {
        await connect();
        const todo = await Todo.findOne(
            {
                where: {
                    id,
                },
            }
        );
        todo.completed = true;
        await todo.save();
        console.log("Todo updated successfully");
    } catch (error) {
        console.error(error);
    }
}

const deleteTodo = async (id) => {
    try {
        await connect();
        const todo = await Todo.destroy
        (
            {
                where: {
                    id,
                },
            }
        );
        console.log("Todo deleted successfully");
    } catch (error) {
        console.error(error);
    }
}
(async () => {
    // createNewTodo();
    await getAllTodos();
    // countTodos();
    // getSingleTodo();
    await deleteTodo(3);
    await getAllTodos();
    }
)();
