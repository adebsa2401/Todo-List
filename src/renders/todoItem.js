import deleteTodo from './deleteTodo.js';

export default (todo) => {
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

  row.querySelector('input').addEventListener('focus', (event) => {
    const icon = event.target.closest('.card-row').querySelector('.bi-three-dots-vertical');
    icon.classList.remove('bi-three-dots-vertical');
    icon.classList.add('bi-trash');

    icon.addEventListener('click', () => deleteTodo(todo));
  });

  row.querySelector('input').addEventListener('blur', (event) => {
    const icon = event.target.closest('.card-row').querySelector('.bi-trash');
    icon.classList.remove('bi-trash');
    icon.classList.add('bi-three-dots-vertical');
  });

  row.querySelector('input').addEventListener('change', (event) => {
    todo.edit(event.target.value);
  });

  return row.firstChild;
};
