import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
