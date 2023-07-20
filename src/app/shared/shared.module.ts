import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommentTimePipe } from './pipes/comment-time.pipe';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { TimeDatePipe } from './pipes/date.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CommentTimePipe,
    SearchInputComponent,
    RegisterModalComponent,
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
    FooterComponent,
    CommentTimePipe,
    SearchInputComponent,
    RegisterModalComponent,
    PaginationComponent,
    BackButtonComponent,
  ],
})
export class SharedModule {}
