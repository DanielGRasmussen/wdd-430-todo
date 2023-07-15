import { Component, OnInit } from "@angular/core";
import { Status, Todo } from "../todo.model";
import { TodoService } from "../todo.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-todo-edit",
	templateUrl: "./todo-edit.component.html",
	styleUrls: ["./todo-edit.component.css"],
})
export class TodoEditComponent implements OnInit {
	originalTodo!: Todo;
	todo: Todo = new Todo("", "", "", Status.Incomplete);
	editMode: boolean = false;
	id!: string;

	constructor(
		private todoService: TodoService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = params["id"];
			if (!this.id) {
				this.editMode = false;
				return;
			}

			const original = this.todoService.getTodo(this.id);
			if (!original) {
				return;
			}
			this.originalTodo = original;

			this.editMode = true;
			this.todo = JSON.parse(JSON.stringify(this.originalTodo));
		});
	}

	onSubmit(form: NgForm) {
		const values = form.value;
		const newTodo = new Todo(
			"",
			values.title,
			values.description,
			this.todo.status || Status.Incomplete
		);
		if (this.editMode) {
			this.todoService.updateTodo(this.originalTodo, newTodo);
		} else {
			this.todoService.addTodo(newTodo);
		}
		this.router.navigate([""]);
	}

	onCancel() {
		this.router.navigate([""]);
	}
}
