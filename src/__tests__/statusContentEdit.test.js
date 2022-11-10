import { STORAGE_TODO_KEY } from '../data/localStorage.js';
import Todo from '../models/todo.js';

describe('edit an existing todo task', () => {
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
