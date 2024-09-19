/* eslint-disable no-undef */
const todo = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();

describe("To-Do List", () => {
  beforeEach(() => {
    all.length = 0;

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0];

    add({ title: "Overdue Task", completed: false, dueDate: yesterday });
    add({ title: "Due Today Task", completed: false, dueDate: today });
    add({ title: "Due Later Task", completed: false, dueDate: tomorrow });
    add({ title: "Completed Task", completed: true, dueDate: today });
  });

  test("Add a new todo", () => {
    const initialCount = all.length;
    add({
      title: "New Task",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(initialCount + 1);
    expect(all[all.length - 1].title).toBe("New Task");
  });

  test("Mark a todo as complete", () => {
    expect(all[1].completed).toBe(false);
    markAsComplete(1);
    expect(all[1].completed).toBe(true);
  });

  test("Retrieve overdue items", () => {
    const overdues = overdue();
    expect(overdues.length).toBe(1);
    expect(overdues[0].title).toBe("Overdue Task");
  });

  test("Retrieve due today items", () => {
    const dueItems = dueToday();
    expect(dueItems.length).toBe(2);
    expect(dueItems[0].title).toBe("Due Today Task");
    expect(dueItems[1].title).toBe("Completed Task");
  });

  test("Retrieve due later items", () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Due Later Task");
  });
});
