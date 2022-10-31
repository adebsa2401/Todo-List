import * as dataProvider from '../data/localStorage.js';

// Model class for a todo task
export default class Todo {
  constructor(values) {
    this.id = values.id ?? null;
    this.description = values.description;
    this.completed = values.completed ?? false;
  }

  // get the list of Todo models sorted by index
  static all = () => dataProvider
    .getTodos()
    .sort((todo1, todo2) => todo1.index - todo2.index)
    .map((todo) => new Todo(todo));

  // get all the completed todo tasks
  static allCompleted = () => dataProvider
    .getTodos()
    .filter((todo) => todo.completed)
    .map((todo) => new Todo(todo));

  // get instance index
  get index() {
    return dataProvider.getIndex(this.id);
  }

  // save instance to localStorage
  add = () => {
    this.id = dataProvider.saveTodo(this);

    return this;
  }

  // edit instance into local
  edit = (description) => {
    this.description = description;
    dataProvider.saveTodo(this);
    return this;
  }

  // toggle todo task completion and save to localStorage
  toggleCompleted = () => {
    this.completed = !this.completed;
    dataProvider.saveTodo(this);
    return this;
  }

  // delete instance from localStorage
  delete = () => {
    dataProvider.deleteTodo(this.id);
  }
}
