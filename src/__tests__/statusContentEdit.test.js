import { STORAGE_TODO_KEY } from '../data/localStorage.js';
import Todo from '../models/todo.js';

describe('edit an existing todo task', () => {
  // create and add a todo task
  const todo = new Todo({
    description: 'Initial description',
  });
  todo.add();

  test('edit the todo task description', () => {
    // update the todo task description
    todo.edit('Edited description');

    expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
      id: 1,
      index: 1,
      description: 'Edited description',
      completed: false,
    });
  });

  describe('update task "completed" status', () => {
    test('toggle "completed" status the first time', () => {
      todo.toggleCompleted();

      expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
        id: 1,
        index: 1,
        description: 'Edited description',
        completed: true,
      });
    });

    test('toggle "completed" status the second time', () => {
      todo.toggleCompleted();

      expect(JSON.parse(localStorage.getItem(STORAGE_TODO_KEY))[0]).toEqual({
        id: 1,
        index: 1,
        description: 'Edited description',
        completed: false,
      });
    });
  });
});
