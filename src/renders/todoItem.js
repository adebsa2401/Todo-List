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
  `.trim(); // todo item html

  // handle todo input focus event: toggle trash icon and add click event on it
  row.querySelector('input').addEventListener('focus', (event) => {
    const icon = event.target.closest('.card-row').querySelector('.bi-three-dots-vertical');
    icon.classList.remove('bi-three-dots-vertical');
    icon.classList.add('bi-trash');

    icon.addEventListener('click', () => deleteTodo(todo)); // add click event to the trash icon to delete the todo item
  });

  // toggle trash icon when focus on the input is lost
  row.querySelector('input').addEventListener('blur', (event) => {
    const icon = event.target.closest('.card-row').querySelector('.bi-trash');
    icon.classList.remove('bi-trash');
    icon.classList.add('bi-three-dots-vertical');
  });

  // change event to update the todo item
  row.querySelector('input').addEventListener('change', (event) => {
    todo.edit(event.target.value);
  });

  // toggle completion checkbox
  row.querySelector('.bi-check2, .bi-square').addEventListener('click', (event) => {
    todo = todo.toggleCompleted(); // change status in localStorage
    event.target.classList.add(todo.completed ? 'bi-check2' : 'bi-square'); // toggle icon
    event.target.classList.remove(todo.completed ? 'bi-square' : 'bi-check2');
    event.target.nextElementSibling.classList.toggle('completed-todo'); // toggle text style
  });

  return row.firstChild;
};
