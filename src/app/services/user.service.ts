import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  private users$ = this.httpClient
    .get<Array<User>>(`${this.baseUrl}/users`)
    .pipe(
      catchError((error) => {
        return of([] as User[]);
      })
    );

  readOnlyUsers = toSignal(this.users$, { initialValue: [] as User[] });
  selectedUser = signal<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
    website: '',
    isSelected: false,
  });

  setSelectedUser(user: User) {
    this.selectedUser.set(user);
  }
}
