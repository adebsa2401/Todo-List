import * as dataProvider from '../data/localStorage.js';

export default class Todo {
  constructor(values) {
    this.id = values.id ?? null;
    this.description = values.description;
    this.completed = values.completed ?? false;
  }

  static all = () => dataProvider
    .getTodos()
    .sort((todo1, todo2) => todo1.index - todo2.index)
    .map((todo) => new Todo(todo));

  get index() {
    return dataProvider.getIndex(this.id);
  }

  add = () => {
    this.id = dataProvider.saveTodo(this);

    return this;
  }

  edit = (description) => {
    this.description = description;
    dataProvider.saveTodo(this);
    return this;
  }

  toggleCompleted = () => {
    this.completed = !this.completed;
    dataProvider.saveTodo(this);
    return this;
  }

  delete = () => {
    dataProvider.deleteTodo(this.id);
  }
}
