import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommentTimePipe } from './pipes/comment-time.pipe';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeDatePipe } from './pipes/date.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CommentTimePipe,
    SearchInputComponent,
    TimeDatePipe,
    PaginationComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    CommentTimePipe,
    SearchInputComponent,
    PaginationComponent,
    BackButtonComponent,
  ],
})
export class SharedModule {}
