import { Injectable } from '@angular/core';

import { AppConfig } from '../app.config.js';

export class Todo {
    completed: Boolean;
    editing: Boolean;

    private _title: String;
    get title() {
        return this._title;
    }
    set title(value: String) {
        this._title = value.trim();
    }

    constructor(title: String) {
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
    }
}

@Injectable()
export class TodoStore {
    todos: Array<Todo>;
    portletNamespace: string;

    constructor(appConfig: AppConfig) {
        this.portletNamespace = 'angular2-todos_' + appConfig.portletNamespace;

        let persistedTodos = JSON.parse(localStorage.getItem(this.portletNamespace) || '[]');
        // Normalize back into classes
        this.todos = persistedTodos.map((todo: { _title: String, completed: Boolean }) => {
            let ret = new Todo(todo._title);
            ret.completed = todo.completed;
            return ret;
        });
    }

    private updateStore() {
        localStorage.setItem(this.portletNamespace, JSON.stringify(this.todos));
    }

    private getWithCompleted(completed: Boolean) {
        return this.todos.filter((todo: Todo) => todo.completed === completed);
    }

    allCompleted() {
        return this.todos.length === this.getCompleted().length;
    }

    setAllTo(completed: Boolean) {
        this.todos.forEach((t: Todo) => t.completed = completed);
        this.updateStore();
    }

    removeCompleted() {
        this.todos = this.getWithCompleted(false);
        this.updateStore();
    }

    getRemaining() {
        return this.getWithCompleted(false);
    }

    getCompleted() {
        return this.getWithCompleted(true);
    }

    toggleCompletion(todo: Todo) {
        todo.completed = !todo.completed;
        this.updateStore();
    }

    remove(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    }

    add(title: String) {
        this.todos.push(new Todo(title));
        this.updateStore();
    }
}