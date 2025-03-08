import { Component } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-user',
  imports: [UserListComponent, TodoListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {}
