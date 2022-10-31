import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import renderTodoList from './renders/listTodos.js';
import addTodo from './renders/addTodo.js';
import deleteTodo from './renders/deleteTodo.js';
import Todo from './models/todo.js';

document.addEventListener('DOMContentLoaded', renderTodoList); // render the todo list on start
document.querySelector('#add-todo-submit').addEventListener('click', addTodo); // add todo item event
document.querySelector('#add-todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});
document.querySelector('.card-footer').addEventListener('click', () => {
  Todo.allCompleted().forEach(deleteTodo);
});
