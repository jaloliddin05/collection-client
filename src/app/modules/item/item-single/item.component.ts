import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../../../core/services/item.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../core/services/user.service';
import { CommentService } from '../../../core/services/comment.service';
import { WebSocketService } from '../../../core/services/web-socket.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
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
    private readonly commentService: CommentService,
    private readonly webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.userAccountId = this.cookieService.get('userId');

    this.getCurrentItem();

    this.getCurrentUser();

    this.webSocketService.receiveComment().subscribe((data) => {
      this.comments.unshift(data);
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.leaveRoom(this.item.id);
  }

  getCurrentItem() {
    this.param.params.subscribe((params) => {
      const id = params['id'];
      this.itemService.getById(id).subscribe({
        next: (res: any) => {
          this.item = res;
          this.likedUsers = res.likedUsers.slice(0, 5);
          this.anotherLikedUsersCount = res.likedUsers.length - 5;
          this.getComments();
          this.webSocketService.joinRoom(id);
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }

  getCurrentUser() {
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
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  addLike() {
    this.itemService.addLike(this.userAccountId, this.item?.id).subscribe({
      next: (res: any) => {
        this.item.isLiked = true;
        this.item.likesCount = res.likesCount;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  removeLike() {
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

  back() {
    this.location.back();
  }
}
