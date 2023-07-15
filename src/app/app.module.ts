import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodosFilterPipe } from "./todos-filter.pipe";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { TodoDetailComponent } from "./todo-detail/todo-detail.component";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		TodoListComponent,
		TodoItemComponent,
		TodosFilterPipe,
		TodoDetailComponent,
		TodoEditComponent,
	],
	imports: [
		BrowserModule,
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
