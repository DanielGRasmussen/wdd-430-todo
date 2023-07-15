import { Component } from "@angular/core";
import { Todo } from "../todo.model";
import { Subscription } from "rxjs";
import { TodoService } from "../todo.service";

@Component({
	selector: "app-todo-list",
	templateUrl: "./todo-list.component.html",
	styleUrls: ["./todo-list.component.css"],
})
export class TodoListComponent {
	// Should have a button to add a new todo
	// Should have a searchbar
	// Should have a list of todos
	// Extra:
	// Should be able to drag todo items into/out of groups
	// Should have at least 2 types of displaying the list of todos. Grid and List
	// Should be able to select multiple todos and delete/mark as done
	todos: Todo[];
	subscription!: Subscription;
	term!: string;

	constructor(private todoService: TodoService) {
		this.todos = [];
	}

	ngOnInit(): void {
		this.todos = this.todoService.getTodos();
		this.subscription = this.todoService.todoListChangedEvent.subscribe(
			(updatedTodos: Todo[]) => {
				this.todos = updatedTodos;
			}
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	search(value: string): void {
		this.term = value;
	}
}
