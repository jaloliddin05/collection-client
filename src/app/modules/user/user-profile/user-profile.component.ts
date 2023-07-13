import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err) => {
        this.router.navigate(['login']);
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append('avatar', file);
    this.userService.update(this.user?.id, formData).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
