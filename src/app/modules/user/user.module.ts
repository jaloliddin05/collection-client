import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserListComponent } from './user-list/user-list.component';
import { UserSingleComponent } from './user-single/user-single.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CollectionModule } from '../collection/collection.module';
import { SharedModule } from '../../shared/shared.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserListComponent,
    UserSingleComponent,
    UserProfileComponent,
    UserUpdateComponent,
  ],
  imports: [
    CommonModule,
    CollectionModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    // MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserListComponent,
    UserSingleComponent,
    UserProfileComponent,
    UserUpdateComponent,
  ],
})
export class UserModule {}
