import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCreateComponent } from './field-create/field-create.component';
import { FieldListComponent } from './field-list/field-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FieldCreateComponent, FieldListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FieldCreateComponent, FieldListComponent],
})
export class FieldModule {}
