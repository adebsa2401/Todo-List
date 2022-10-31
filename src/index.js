import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import renderTodoList from './renders/listTodos.js';
import addTodo from './renders/addTodo.js';

document.addEventListener('DOMContentLoaded', renderTodoList);
document.querySelector('#add-todo-submit').addEventListener('click', addTodo);
document.querySelector('#add-todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});
