import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-collection-update',
  templateUrl: './collection-update.component.html',
  styleUrls: ['./collection-update.component.scss'],
})
export class CollectionUpdateComponent {
  collectionForm: FormGroup;
  collection: any;
  imageSource: any;
  @Input() collectionId: any;
  @Output() closeUpdateListModal = new EventEmitter();
  @Output() setNewCollection = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private readonly collectionService: CollectionService
  ) {
    this.collectionForm = this.formBuilder.group({
      title: [''],
      avatar: [null],
    });
  }

  onSubmit() {
    if (this.collectionForm.valid) {
      const formData = new FormData();
      this.collectionForm.value.title
        ? formData.append('title', this.collectionForm.value.title)
        : null;
      this.collectionForm.value.avatar
        ? formData.append('avatar', this.collectionForm.value.avatar)
        : null;

      if (this.collectionForm.value.avatar || this.collectionForm.value.title) {
        this.updateCollection(formData);
        this.collectionForm.reset();
      }
    }
  }

  updateCollection(data: FormData) {
    this.collectionService.update(this.collectionId, data).subscribe({
      next: (res: any) => {
        this.setCollection(res);
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.collectionForm.reset();
    this.imageSource = null;
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
    this.closeUpdateListModal.emit(false);
  }

  setCollection(collection: any) {
    this.setNewCollection.emit(collection);
  }
}
