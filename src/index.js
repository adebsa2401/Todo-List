import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TODOS = [
  {
    index: 0,
    description: 'wash the dishes',
    completed: false,
  },
  {
    index: 1,
    description: 'complete To Do list project',
    completed: true,
  },
];

const getTodoRowElement = (todo) => {
  const row = document.createElement('div');
  row.innerHTML = `
  <li class="card-row">
    <div class="todo-block">
      <i class="bi ${todo.completed ? 'bi-check2' : 'bi-square'}"></i>
      <input ${todo.completed ? 'class="completed-todo"' : ''} type="text" value="${todo.description}">
    </div>
    <i class="bi bi-three-dots-vertical"></i>
  </li>
  `.trim();

  return row.firstChild;
};

const renderTodoRowElement = (todo) => {
  const element = getTodoRowElement(todo);
  const adjacent = document.querySelector(`.card-body .card-row:nth-child(${todo.index + 1})`);

  if (adjacent) {
    document.querySelector('.card-body').insertBefore(element, adjacent);
  } else {
    document.querySelector('.card-body').append(element);
  }
};

const renderTodoList = () => {
  TODOS.forEach(renderTodoRowElement);
};

document.addEventListener('DOMContentLoaded', renderTodoList);
