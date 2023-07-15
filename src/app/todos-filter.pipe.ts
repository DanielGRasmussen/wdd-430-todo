import { Pipe, PipeTransform } from "@angular/core";
import { Status, Todo } from "./todo.model";

@Pipe({
	name: "todosFilter",
})
export class TodosFilterPipe implements PipeTransform {
	transform(todos: Todo[], term: string): Todo[] {
		const titleFilteredTodos: Todo[] = [];
		const descriptionFilteredTodos: Todo[] = [];

		for (const todo of todos) {
			if (todo.title.toLowerCase().includes(term)) {
				titleFilteredTodos.push(todo);
			} else if (todo.description.toLowerCase().includes(term)) {
				descriptionFilteredTodos.push(todo);
			}
		}

		const filteredTodos: Todo[] = [
			...titleFilteredTodos,
			...descriptionFilteredTodos,
		];

		if (filteredTodos.length === 0) {
			return this.sortByStatus(todos);
		}

		return this.sortByStatus(filteredTodos);
	}

	sortByStatus(todos: Todo[]): Todo[] {
		return todos.sort((a, b) => {
			if (
				a.status === Status.Incomplete &&
				b.status === Status.Complete
			) {
				return -1; // "Incomplete" should come before "Complete"
			} else if (
				a.status === Status.Complete &&
				b.status === Status.Incomplete
			) {
				return 1; // "Complete" should come after "Incomplete"
			} else {
				return 0; // Preserve the original order if statuses are the same
			}
		});
	}
}
