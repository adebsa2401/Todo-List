import Todo from '../models/todo.js';
import addTodo from '../renders/addTodo.js';
import deleteTodo from '../renders/deleteTodo.js';
import { STORAGE_TODO_KEY } from '../data/localStorage.js';

describe('add todo item', () => {
  test('add a task task to the localStorage', () => {
    // fill in the localStorage
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify([
      {
        id: 1,
        index: 1,
        description: 'first todo',
        completed: false,
      },
      {
        id: 2,
        index: 2,
        description: 'second todo',
        completed: true,
      },
    ]));

    // the expected final state of the localStorage
    const todos = [
      {
        id: 1,
        index: 1,
        description: 'first todo',
        completed: false,
      },
      {
        id: 2,
        index: 2,
        description: 'second todo',
        completed: true,
      },
      {
        id: 3,
        index: 3,
        description: 'third todo',
        completed: false,
      },
    ];

    // mock the DOM content
    document.body.innerHTML = `
        <form id="add-todo-form" class="card-row">
          <input type="text" value="third todo"/>
          <i id="add-todo-submit" class="bi bi-arrow-return-left"></i>
        </form>
        <ul class="card-body"></ul>
      `;

    addTodo();
    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))).toEqual(todos);
  });

  test('add a todo task into the DOM', () => {
    document.body.innerHTML = `
        <form id="add-todo-form" class="card-row">
          <input type="text" value="third todo"/>
          <i id="add-todo-submit" class="bi bi-arrow-return-left"></i>
        </form>
        <ul class="card-body"></ul>
      `;
    addTodo();

    expect(document.querySelector('.card-body').children).toHaveLength(1);
  });
});

describe('delete todo item', () => {
  test('removes a task object from local storage when called', () => {
    const todos = [
      {
        id: 1,
        description: 'hello',
        completed: false,
      },
    ];
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));

    const item = {
      id: 1,
      description: 'hello',
      completed: false,
    };
    const todo = new Todo(item);
    todo.delete();

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY)).length).toBe(0);
  });

  test('updates the index of remaining tasks when called', () => {
    const todos = [
      {
        id: 1,
        description: 'hello',
        completed: false,
        index: 1,
      },
      {
        id: 2,
        description: 'hello',
        completed: false,
        index: 2,
      },
      {
        id: 3,
        description: 'hello',
        completed: false,
        index: 3,
      },
    ];
    localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));

    const item = {
      id: 2,
      description: 'hello',
      completed: false,
    };
    const todo = new Todo(item);
    todo.delete();

    const result = [
      {
        id: 1,
        description: 'hello',
        completed: false,
        index: 1,
      },
      {
        id: 3,
        description: 'hello',
        completed: false,
        index: 2,
      },
    ];
    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))).toEqual(result);
  });

  test('removes a task from the DOM', () => {
    document.body.innerHTML = `
        <form id="add-todo-form" class="card-row">
          <input type="text" value="hello"/>
          <i id="add-todo-submit" class="bi bi-arrow-return-left"></i>
        </form>
        <ul class="card-body"></ul>
      `;

    addTodo();

    const item = {
      id: 1,
      description: 'hello',
      completed: false,
    };
    const todo = new Todo(item);
    deleteTodo(todo);

    const list = document.querySelectorAll('.card-body li');
    expect(list).toHaveLength(0);
  });
});
