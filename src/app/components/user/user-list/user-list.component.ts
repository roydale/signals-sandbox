import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private userService = inject(UserService);

  users = this.userService.readOnlyUsers;

  onUserSelect(user: User) {
    user.isSelected = true;
    this.users()
      .filter((otherUser) => otherUser.id !== user.id)
      .forEach((otherUser) => {
        otherUser.isSelected = false;
      });
    this.userService.setSelectedUser(user);
  }
}
