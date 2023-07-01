import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSearchInputComponent } from './tag-search-input/tag-search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TagSearchInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TagSearchInputComponent],
})
export class TagModule {}
