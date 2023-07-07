import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-create',
  templateUrl: './field-create.component.html',
  styleUrls: ['./field-create.component.scss'],
})
export class FieldCreateComponent {
  fieldForm!: FormGroup;
  types: string[] = ['checkbox', 'text'];
  @Output() setNewField = new EventEmitter();
  @Output() setCloseModal = new EventEmitter();

  constructor(private readonly formBuilder: FormBuilder) {
    this.fieldForm = this.formBuilder.group({
      type: ['', Validators.required],
      key: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      this.setNewField.emit(this.fieldForm.value);
    }
    this.fieldForm.reset();
    this.setCloseModal.emit(false);
  }
  closeModal() {
    this.setCloseModal.emit(false);
  }
}
