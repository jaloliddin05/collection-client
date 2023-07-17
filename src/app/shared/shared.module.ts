import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommentTimePipe } from './pipes/comment-time.pipe';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { TimeDatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CommentTimePipe,
    SearchInputComponent,
    RegisterModalComponent,
    TimeDatePipe,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommentTimePipe,
    SearchInputComponent,
  ],
})
export class SharedModule {}
