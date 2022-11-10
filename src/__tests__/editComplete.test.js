import { STORAGE_TODO_KEY } from '../data/localStorage.js';
import Todo from '../models/todo.js';
import addTodo from '../renders/addTodo.js';
import deleteTodo from '../renders/deleteTodo.js';

describe('edit an existing todo task', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('edit the todo task description', () => {
    // create and add a todo task
    const todo = new Todo({
      description: 'Initial description',
    });
    todo.add();

    // update the todo task description
    todo.edit('Edited description');

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
      id: 1,
      index: 1,
      description: 'Edited description',
      completed: false,
    });
  });
});

describe('update task "completed" status', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  const todo = new Todo({
    description: 'Initial description',
  });
  todo.add();

  test('toggle "completed" status the first time', () => {
    todo.toggleCompleted();

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
      id: 1,
      index: 1,
      description: 'Initial description',
      completed: true,
    });
  });

  test('toggle "completed" status the second time', () => {
    todo.toggleCompleted();

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
      id: 1,
      index: 1,
      description: 'Initial description',
      completed: false,
    });
  });
});

describe('clear all completed', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('clears all completed tasks from local storage when called', () => {
    const todos = [
      {
        id: 1,
        description: 'hello',
        completed: false,
      },
      {
        id: 2,
        description: 'hello',
        completed: true,
      },
      {
        id: 3,
        description: 'hello',
        completed: true,
      },
    ];
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));

    Todo.allCompleted().forEach((item) => {
      item.delete();
    });

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY)).length).toBe(1);
  });

  it('clears all completed tasks from the DOM when called', () => {
    document.body.innerHTML = `
      <form id="add-todo-form" class="card-row">
        <input type="text" value="hello"/>
        <i id="add-todo-submit" class="bi bi-arrow-return-left"></i>
      </form>
      <ul class="card-body"></ul>
    `;

    addTodo();
    addTodo();
    addTodo();

    for (let i = 1; i < 3; i += 1) {
      const item = {
        id: i,
        description: 'hello',
        completed: false,
      };

      const todo = new Todo(item);
      todo.toggleCompleted();
    }

    Todo.allCompleted().forEach(deleteTodo);

    const list = document.querySelectorAll('.card-body li');
    expect(list).toHaveLength(1);
  });
});

