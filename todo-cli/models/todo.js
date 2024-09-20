// models/todo.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }
    static async getAllTodos(id) {
      return await Todo.findAll();
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      var overdues = await this.overdue();
      var formattedOverdues = overdues.map((todo) => todo.displayableString()).join("\n");  
      console.log(formattedOverdues);
      console.log("\n");

      console.log("Due Today");
      var dueToday = await this.dueToday();
      var formattedDueToday = dueToday.map((todo) => todo.displayableString()).join("\n");
      console.log(formattedDueToday);
      console.log("\n");

      console.log("Due Later");
      var dueLater = await this.dueLater();
      var formattedDueLater = dueLater.map((todo) => todo.displayableString()).join("\n");
      console.log(formattedDueLater);
    }

    static getToday() {
      return new Date().toISOString().split("T")[0];
    }

    static async overdue() {
      const today = this.getToday();
      const allTodos = await this.getAllTodos();
      console.log(allTodos);
      return allTodos.filter((todo) => todo.dueDate < today);
    }

    static async dueToday() {
      const allTodos = await this.getAllTodos();
      const today = this.getToday();
      return allTodos.filter((todo) => todo.dueDate === today);
    }

    static async dueLater() {
      const allTodos = await this.getAllTodos();
      const today = this.getToday();
      return allTodos.filter((todo) => todo.dueDate > today);
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      todo.completed = true;
      return await todo.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
