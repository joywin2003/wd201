const express = require("express");
const app = express();
const { Todo } = require("./models");
const BodyParser = require("body-parser");

app.use(BodyParser.json());

app.get("/todos", async(request, response) => {
  console.log("Todo list");
  const todos  = await Todo.findAll();
  console.log(1,todos);
  return response.json(todos);
});

app.post("/todos", async (request, response) => {
    console.log("Creating a todo", request.body);
    try {
      const todo = await Todo.addTodo({
        title: request.body.title,
        dueDate: request.body.dueDate,
      });
      return response.json(todo); // This sends the response, no need to send another one
    } catch (error) {
      console.error(error);
      return response.status(422).send("Something went wrong");
    }
  });

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    const updatedTodo = await todo.markAsComplete();
    console.log("\n\n\n\n\n", updatedTodo);
    return response.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return response.status(422).send(error.message);
    
  }
});

app.delete("/todos/:id", (request, response) => {
  console.log("Delete a todo by ID: ", request.params.id);
  response.send(`Todo with ID ${request.params.id} deleted`);
});

app.listen(3000, () => {
  console.log("Started express server at port 3000");
});
