import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CollectionModule } from '../collection/collection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserListComponent, UserSingleComponent, UserProfileComponent],
  imports: [CommonModule, CollectionModule, RouterModule],
  exports: [UserListComponent, UserSingleComponent, UserProfileComponent],
})
export class UserModule {}