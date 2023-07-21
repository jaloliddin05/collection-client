import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentListComponent } from './comment-list/comment-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CommentListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [CommentListComponent],
})
export class CommentModule {}
