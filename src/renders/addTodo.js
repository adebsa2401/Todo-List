import Todo from '../models/todo.js';
import getTodoItem from './todoItem.js';

export default () => {
  const addInput = document.querySelector('#add-todo-form input');
  const todo = new Todo({ description: addInput.value }).add();
  const item = getTodoItem(todo);

  document.querySelector('.card-body').append(item);
  addInput.value = '';
};
