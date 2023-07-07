import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCreateComponent } from './field-create/field-create.component';
import { FieldListComponent } from './field-list/field-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldUpdateComponent } from './field-update/field-update.component';

@NgModule({
  declarations: [
    FieldCreateComponent,
    FieldListComponent,
    FieldUpdateComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FieldCreateComponent, FieldListComponent, FieldUpdateComponent],
})
export class FieldModule {}
