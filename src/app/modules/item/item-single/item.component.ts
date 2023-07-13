import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../../../core/services/item.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../core/services/user.service';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: any;
  user: any;
  userAccountId: any;
  likedUsers: any[] = [];
  anotherLikedUsersCount: number = 0;
  comments: any[] = [];

  constructor(
    private readonly param: ActivatedRoute,
    private readonly itemService: ItemService,
    private readonly location: Location,
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
    private readonly commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userAccountId = this.cookieService.get('userId');
    this.param.params.subscribe((params) => {
      const id = params['id'];
      this.itemService.getById(id).subscribe({
        next: (res: any) => {
          this.item = res;
          this.likedUsers = res.likedUsers.slice(0, 5);
          this.anotherLikedUsersCount = res.likedUsers.length - 5;
          this.getComments();
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });

    this.userService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  changeLike(bool: boolean) {
    if (bool) {
      this.itemService.addLike(this.userAccountId, this.item?.id).subscribe({
        next: (res: any) => {
          this.item.isLiked = true;
          this.item.likesCount = res.likesCount;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    } else {
      this.itemService.removeLike(this.userAccountId, this.item?.id).subscribe({
        next: (res: any) => {
          this.item.isLiked = false;
          this.item.likesCount = res.likesCount;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    }
  }

  getComments() {
    this.commentService.getByItemId(this.item.id).subscribe({
      next: (res: any) => {
        this.comments = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
  addNewComment(comment: any) {
    this.comments.unshift(comment);
  }

  back() {
    this.location.back();
  }
}
