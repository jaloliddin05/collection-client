import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../core/services/item.service';
import { TagService } from '../../../core/services/tag.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
})
export class ItemCreateComponent implements OnInit {
  //....
  @Input() collection: any;
  @Input() userId: any;
  //....
  itemForm: FormGroup;
  //....
  @Output() closeCreateListModal = new EventEmitter();
  @Output() setNewCollection = new EventEmitter();
  //....
  tags: any[] = [];
  isTagCreateOpen: boolean = false;
  //....

  constructor(
    private formBuilder: FormBuilder,
    private readonly itemService: ItemService,
    private readonly tagService: TagService
  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      avatar: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.itemForm.valid) {
      const formData = new FormData();
      formData.append('name', this.itemForm.value.title);
      formData.append('collection', this.collection);
      formData.append('avatar', this.itemForm.value.avatar);
      console.log(this.itemForm.value);

      // this.itemService.create(formData).subscribe({
      //   next: (res: any) => {
      //     this.setCollection(res);
      //     this.closeModal();
      //   },
      //   error: (err: any) => {
      //     console.log(err.error);
      //   },
      // });
    }
  }

  createTag(tag: any) {
    const isExist = this.tags.find((t: any) => t.id == tag.id);
    if (!isExist) {
      this.tags.push(tag);
    }
    this.isTagCreateOpen = false;
  }

  deleteTag(id: string) {
    const index = this.tags.findIndex((t: any) => t.id == id);
    const tag = this.tags.find((t: any) => t.id == id);
    if (tag?.isNew) {
      this.tagService.delete(id).subscribe({
        next: (res: any) => {
          this.tags.splice(index, 1);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    } else {
      this.tags.splice(index, 1);
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.itemForm.patchValue({
        avatar: files[0],
      });
    }
  }

  changeCreateTagVisible(bool: boolean) {
    this.isTagCreateOpen = bool;
  }

  closeModal() {
    this.closeCreateListModal.emit(false);
  }

  setCollection(collection: any) {
    this.setNewCollection.emit(collection);
  }
}
