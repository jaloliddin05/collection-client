import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent {
  userForm: FormGroup;
  imageSource: any;
  @Input() userId: any;
  @Output() closeUpdateListModal = new EventEmitter();
  @Output() setNewUser = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      avatar: [null],
    });
  }

  onSubmit() {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      const formData = new FormData();
      this.userForm.value.name
        ? formData.append('name', this.userForm.value.name)
        : null;
      this.userForm.value.avatar
        ? formData.append('avatar', this.userForm.value.avatar)
        : null;

      if (this.userForm.value.avatar || this.userForm.value.name) {
        this.updateUser(formData);
        this.userForm.reset();
      }
    }
  }

  updateUser(data: FormData) {
    this.userService.update(this.userId, data).subscribe({
      next: (res: any) => {
        this.setUser(res);
        this.closeModal();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.userForm.reset();
    this.imageSource = null;
  }

  onFileChange(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.userForm.patchValue({
        avatar: files[0],
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSource = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  closeModal() {
    this.closeUpdateListModal.emit(false);
  }

  setUser(user: any) {
    this.setNewUser.emit(user);
  }
}
