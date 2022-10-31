import Todo from '../models/todo.js';
import getTodoItem from './todoItem.js';

const renderTodoRowElement = (todo) => {
  const element = getTodoItem(todo);
  const adjacent = document.querySelector(`.card-body .card-row:nth-child(${todo.index + 1})`);

  if (adjacent) {
    document.querySelector('.card-body').insertBefore(element, adjacent);
  } else {
    document.querySelector('.card-body').append(element);
  }
};

export default () => {
  Todo.all().forEach(renderTodoRowElement);
};
