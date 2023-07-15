import { Component, OnInit } from "@angular/core";
import { Status, Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-todo-detail",
	templateUrl: "./todo-detail.component.html",
	styleUrls: ["./todo-detail.component.css"],
})
export class TodoDetailComponent implements OnInit {
	todo: Todo;
	private subscription!: Subscription;

	constructor(
		private todoService: TodoService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.todo = new Todo("", "", "", Status.Incomplete);
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const id = params["id"];
			const todo = this.todoService.getTodo(id);
			if (todo) {
				this.todo = todo;

				this.subscription =
					this.todoService.todoListChangedEvent.subscribe(
						(updatedTodos: Todo[]) => {
							const todo = updatedTodos.find(
								todo => todo.id === this.todo.id
							);
							if (todo) {
								this.todo = todo;
							}
						}
					);
			}
		});
	}

	toggleDone(): void {
		const newTodo = JSON.parse(JSON.stringify(this.todo));
		newTodo.status =
			this.todo.status === Status.Incomplete
				? Status.Complete
				: Status.Incomplete;

		this.todoService.updateTodo(this.todo, newTodo);
	}

	onDelete(): void {
		this.todoService.deleteTodo(this.todo);
		this.router.navigate(["/"]);
	}
}
