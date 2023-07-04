import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.scss'],
})
export class UserSingleComponent implements OnInit {
  user: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id'];
      this.userService.getById(id).subscribe({
        next: (res: any) => {
          this.user = res;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    });
  }
}
