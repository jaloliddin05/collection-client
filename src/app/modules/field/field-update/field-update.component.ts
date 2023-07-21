import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-field-update',
  templateUrl: './field-update.component.html',
  styleUrls: ['./field-update.component.scss'],
})
export class FieldUpdateComponent implements OnInit {
  fieldForm!: FormGroup;
  @Input() field: any;
  types: string[] = ['checkbox', 'text', 'richtext', 'date'];
  @Output() setNewField = new EventEmitter();
  @Output() setCloseModal = new EventEmitter();

  constructor(
    private readonly filedService: CommentService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      type: [this.field?.type ? this.field.type : '', Validators.required],
      key: [this.field?.key ? this.field.key : null, Validators.required],
      value: [this.field?.value ? this.field.value : null, Validators.required],
    });
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      this.filedService
        .updateField(this.field.id, this.fieldForm.value)
        .subscribe({
          next: (res: any) => {
            this.setNewField.emit(res);
          },
          error: (err: any) => {
            console.log(err.error);
          },
        });
    }
    this.fieldForm.reset();
    this.setCloseModal.emit(false);
  }

  closeModal() {
    this.fieldForm.reset();
    this.setCloseModal.emit(false);
  }
}
