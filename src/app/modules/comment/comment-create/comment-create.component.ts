import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss'],
})
export class CommentCreateComponent implements OnInit {
  user: any;
  text: string = '';
  @Input() item: any;
  @Output() setComment = new EventEmitter();

  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  addComment() {
    if (this.text.trim()) {
      this.commentService.create(this.text.trim(), this.item.id).subscribe({
        next: (res: any) => {
          this.setComment.emit(res);
          this.text = '';
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    }
  }
}
