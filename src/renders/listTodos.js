import Todo from '../models/todo.js';
import getTodoItem from './todoItem.js';

// render todo tasks list
export default () => {
  Todo.all().forEach((todo) => {
    const element = getTodoItem(todo);
    document.querySelector('.card-body').append(element);
  });
};
