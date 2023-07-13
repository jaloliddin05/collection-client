import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CommentCreateComponent, CommentListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [CommentCreateComponent, CommentListComponent],
})
export class CommentModule {}
