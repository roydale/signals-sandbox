import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared';
import { TodoService, UserService } from '../../../services';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  private userService = inject(UserService);

  userTasks = this.todoService.userTodos;
  selectedUser = this.userService.selectedUser;
}
