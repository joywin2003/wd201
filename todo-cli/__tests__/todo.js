const todo = require("../todo");

const { all, add, markAsComplete } = todo();

describe("To-Do List", () => {
    beforeAll(() => {
        add(
            {
                title: "First Task",
                completed: false,
                dueDate: new Date().toISOString().split("T")[0],

            }
        );
    });
    test("Add a new todo", () => {
        const todoItemCount = all.length;
        add(
            {
                title: "First Task",
                completed: false,
                dueDate: new Date().toISOString().split("T")[0],

            }
        );
        expect(all.length).toBe(todoItemCount+1);
    });
    test("Mark a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

});