import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { TodoDetailComponent } from "./todo-detail/todo-detail.component";

const appRoutes: Routes = [
	{ path: "new", component: TodoEditComponent },
	{ path: ":id", component: TodoDetailComponent },
	{ path: ":id/edit", component: TodoEditComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
