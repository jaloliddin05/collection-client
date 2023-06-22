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
  searchedTags: any[] = [];
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
      tagInput: [''],
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

  createTag() {
    if (this.itemForm.value.tagInput.trim() !== '') {
      this.tagService.create(this.itemForm.value.tagInput.trim()).subscribe({
        next: (res: any) => {
          this.tags.push(res);
        },
        error: (err: any) => {},
      });
    }
    this.isTagCreateOpen = false;
    this.itemForm.value.tagInput = '';
  }

  changeSearchTag() {
    if (this.itemForm.value.tagInput.trim() !== '') {
      this.tagService
        .getByTitle(this.itemForm.value.tagInput.trim())
        .subscribe({
          next: (res: any) => {
            this.searchedTags = res;
          },
          error: (err: any) => {},
        });
    } else {
      this.searchedTags = [];
    }
  }

  deleteTag(id: string) {
    this.tagService.delete(id).subscribe({
      next: (res: any) => {
        const index = this.tags.findIndex((t: any) => t.id == id);
        this.tags.splice(index, 1);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
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
