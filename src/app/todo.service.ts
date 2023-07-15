import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class TodoService {
	todoListChangedEvent: Subject<Todo[]> = new Subject<Todo[]>();
	maxTodoId: number;

	todos: Todo[] = [];
	constructor(private http: HttpClient) {
		this.todos = this.fetchTodos();
		this.maxTodoId = this.getMaxId();
	}

	fetchTodos() {
		this.http
			.get<{ todos: Todo[] }>("http://localhost:3000/todos")
			.subscribe(
				todos => {
					this.todos = todos.todos;
					this.maxTodoId = this.getMaxId();
					this.todos.sort((a, b) =>
						a.title > b.title ? 1 : b.title > a.title ? -1 : 0
					);
					this.todoListChangedEvent.next(this.todos.slice());
				},
				error => {
					console.log(error);
				}
			);

		return this.todos.slice();
	}

	getTodos() {
		return this.todos.slice();
	}

	getTodo(id: string) {
		return this.todos.find(todo => todo.id === id) || null;
	}

	addTodo(newTodo: Todo) {
		if (!newTodo) {
			return;
		}

		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		// add to database
		this.http
			.post<{ todo: Todo }>("http://localhost:3000/todos", newTodo, {
				headers: headers,
			})
			.subscribe(responseData => {
				// add new todo to todos
				this.todos.push(responseData.todo);
				this.todoListChangedEvent.next(this.todos.slice());
			});
	}

	updateTodo(originalTodo: Todo, newTodo: Todo) {
		if (!originalTodo || !newTodo) {
			return;
		}

		const pos: number = this.todos.indexOf(originalTodo);
		if (pos < 0) {
			return;
		}

		// set the id of the new Todo to the id of the old Todo
		newTodo.id = originalTodo.id;

		// this.todos[pos] = newTodo;
		// this.todoListChangedEvent.next(this.todos.slice());

		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		// update database
		this.http
			.put("http://localhost:3000/todos/" + originalTodo.id, newTodo, {
				headers: headers,
			})
			.subscribe(() => {
				this.todos[pos] = newTodo;
				this.todoListChangedEvent.next(this.todos.slice());
			});
	}

	deleteTodo(todo: Todo): void {
		if (!todo) {
			return;
		}
		const pos: number = this.todos.indexOf(todo);
		if (pos < 0) {
			return;
		}

		// delete from database
		this.http
			.delete("http://localhost:3000/todos/" + todo.id)
			.subscribe(() => {
				this.todos.splice(pos, 1);
				this.todoListChangedEvent.next(this.todos.slice());
			});
	}

	getMaxId(): number {
		let maxId: number = 0;

		for (const todo of this.todos) {
			const currentId: number = Number(todo.id);
			if (currentId > maxId) {
				maxId = currentId;
			}
		}

		return maxId;
	}
}
