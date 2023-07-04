import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-create',
  templateUrl: './field-create.component.html',
  styleUrls: ['./field-create.component.scss'],
})
export class FieldCreateComponent {
  fieldForm!: FormGroup;
  types: string[] = ['checkbox', 'text'];

  constructor(private readonly formBuilder: FormBuilder) {
    this.fieldForm = this.formBuilder.group({
      type: ['', Validators.required],
      key: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  onSubmit() {}
  closeModal() {}
}
