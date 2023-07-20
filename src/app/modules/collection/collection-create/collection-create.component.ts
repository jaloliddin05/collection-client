import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.scss'],
})
export class CollectionCreateComponent {
  collectionForm: FormGroup;
  imageSource: any;
  @Input() userId: any;
  @Output() closeCreateListModal = new EventEmitter();
  @Output() setNewCollection = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private readonly collectionService: CollectionService
  ) {
    this.collectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      avatar: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.collectionForm.valid) {
      const formData = new FormData();
      formData.append('title', this.collectionForm.value.title);
      formData.append('user', this.userId);
      formData.append('avatar', this.collectionForm.value.avatar);
      this.createCollection(formData);
    }
  }

  createCollection(data: FormData) {
    this.collectionService.create(data).subscribe({
      next: (res: any) => {
        this.setCollection(res);
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.collectionForm.patchValue({
        avatar: files[0],
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);

        this.imageSource = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  closeModal() {
    this.closeCreateListModal.emit(false);
  }

  setCollection(collection: any) {
    this.setNewCollection.emit(collection);
  }
}
