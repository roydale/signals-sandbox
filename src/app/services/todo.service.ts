import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private userService = inject(UserService);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  private baseUrl = 'https://jsonplaceholder.typicode.com';

  userTodos = signal<Todo[]>([]);
  userTodosEffect = effect(() => {
    const selectedUserId = this.userService.selectedUser().id;
    this.httpClient
      .get<Array<Todo>>(`${this.baseUrl}/users/${selectedUserId}/todos`)
      .pipe(
        tap((data) => this.userTodos.set(data)),
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          return of([] as Todo[]);
        })
      )
      .subscribe();
  });

  setToDoAsDone(task: Todo) {
    this.userTodos.update((todos) =>
      todos.map((todo) =>
        todo.id === task.id ? { ...todo, completed: true } : todo
      )
    );
  }

  deleteTodo(task: Todo) {
    this.userTodos.set(this.userTodos().filter((todo) => todo.id !== task.id));
  }

  addTodo(task: Todo) {
    task.id = this.getTodoId();
    this.userTodos.update((todo) => [...todo, task]);
  }

  private getTodoId(): number {
    const sortedUserTodos = [...this.userTodos()].sort((a, b) => b.id - a.id);
    const lastTodoId = sortedUserTodos[0]?.id;
    return lastTodoId + 1;
  }
}
