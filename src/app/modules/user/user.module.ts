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

@NgModule({
  declarations: [UserListComponent, UserSingleComponent, UserProfileComponent],
  imports: [
    CommonModule,
    CollectionModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [UserListComponent, UserSingleComponent, UserProfileComponent],
})
export class UserModule {}
