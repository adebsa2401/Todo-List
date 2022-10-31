const STORAGE_TODO_KEY = 'todos';

export const getTodos = () => {
  let todos = localStorage.getItem(STORAGE_TODO_KEY);
  todos = todos ? JSON.parse(todos) : [];

  return todos;
};

export const getIndex = (id) => {
  const todo = getTodos().filter((item) => item.id === id)[0];
  return todo ? todo.index : null;
};

export const saveTodo = (todo) => {
  let todos = getTodos();
  todo = { ...JSON.parse(JSON.stringify(todo)), index: todo.index };
  todo.id ??= Math.max(0, ...todos.map((item) => item.id)) + 1;
  todo.index ??= Math.max(0, ...todos.map((item) => item.index)) + 1;

  todos = todos.filter((item) => item.id !== todo.id);
  todos.push(todo);
  localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));

  return todo.id;
};

export const deleteTodo = (id) => {
  const todoIndex = getTodos().find((item) => item.id === id).index;
  let todos = getTodos().filter((item) => item.id !== id);
  todos = todos.map((item) => (todoIndex < item.index ? { ...item, index: item.index - 1 } : item));
  localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todos));
};
