import { Component, effect, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { FakerService } from '../../../services';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private userService = inject(UserService);
  private fakerService = inject(FakerService);

  users = this.userService.readOnlyUsers;
  usersEffect = effect(() => {
    if (this.users()?.length > 0) {
      const user = this.users()[0];
      user.isSelected = true;
      this.userService.setSelectedUser(user);
    }
  });

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
