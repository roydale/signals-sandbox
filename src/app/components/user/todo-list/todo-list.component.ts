import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared';
import { TodoService, UserService } from '../../../services';
import { Todo } from '../../../models';

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
  numberOfCompleted = computed(
    () => this.userTasks().filter((task) => task.completed).length
  );

  lastTaskMessage = computed(() =>
    this.userTasks().length === 1 ? `User must have at least one task` : ''
  );

  setAsDone(task: Todo) {
    this.todoService.setToDoAsDone(task);
  }

  removeTask(task: Todo) {
    if (this.userTasks().length > 1) {
      this.todoService.deleteTodo(task);
    }
  }
}
