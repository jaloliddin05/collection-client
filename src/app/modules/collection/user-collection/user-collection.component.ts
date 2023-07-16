import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss'],
})
export class UserCollectionComponent implements OnInit {
  userId: any;
  collections:any

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    this.userId = parentRoute?.snapshot.paramMap.get('userId');
    if (!this.userId) {
      this.route.params.subscribe((param) => {
        this.userId = param['id'];
      });
    }
    if (this.userId) {
      this.userService.getById(this.userId).subscribe({
        next: (res: any) => {
          this.collections = res.collections;
        },
        error: (err: any) => {
          this.router.navigate(['login']);
          console.log(err.error);
        },
      });
    }
  }
}
