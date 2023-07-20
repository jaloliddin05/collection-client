import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../../core/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../core/services/item.service';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.scss'],
})
export class ItemUpdateComponent implements OnInit {
  itemForm: FormGroup;
  imageSource: any;
  userId: any;
  @Input() itemId: any;
  @Output() closeUpdateListModal = new EventEmitter();
  @Output() setNewCollection = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute
  ) {
    this.itemForm = this.formBuilder.group({
      name: [''],
      avatar: [null],
    });
  }

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    this.userId = parentRoute?.snapshot.paramMap.get('userId');
    if (!this.userId) {
      this.route.params.subscribe((p) => {
        this.userId = p['userId'];
      });
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const formData = new FormData();
      this.itemForm.value.title
        ? formData.append('title', this.itemForm.value.title)
        : null;
      this.itemForm.value.avatar
        ? formData.append('avatar', this.itemForm.value.avatar)
        : null;

      if (this.itemForm.value.avatar || this.itemForm.value.title) {
        this.updateItem(formData);
      }
    }
  }

  updateItem(data: FormData) {
    this.itemService.update(this.itemId, data).subscribe({
      next: (res: any) => {
        this.setItem(res);
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.itemForm.reset();
    this.imageSource = null;
  }

  onFileChange(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.itemForm.patchValue({
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

  setItem(collection: any) {
    this.setNewCollection.emit(collection);
  }
}
