import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res: any) => {
        this.users = res.items;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  changeRole(id: string, role: number) {
    role = role == 1 ? 2 : 1;
    this.userService.changeRole(id, role).subscribe({
      next: (res: any) => {
        const user = this.users.find((u: any) => u.id == id);
        user.role = role;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  deleteUser(id: string) {
    this.userService.deleteOne(id).subscribe({
      next: (res: any) => {
        const index = this.users.findIndex((u: any) => u.id == id);
        this.users.splice(index, 1);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  clickUser(id: string, $event: any) {
    if ($event.target.className.includes('not-click')) {
      return;
    }
    this.router.navigate(['admin', 'users', id, 'collection']);
  }
}
