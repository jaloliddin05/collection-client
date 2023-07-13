import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommentTimePipe } from './pipes/comment-time.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, CommentTimePipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, CommentTimePipe],
})
export class SharedModule {}
