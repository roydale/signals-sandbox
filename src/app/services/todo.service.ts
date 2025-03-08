import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { catchError, of } from 'rxjs';
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
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          return of([] as Todo[]);
        })
      )
      .subscribe((data: Todo[]) => {
        this.userTodos.set(data);
      });
  });
}
