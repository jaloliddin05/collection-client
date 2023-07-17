import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { CollectionComponent } from './collection-single/collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { RouterModule } from '@angular/router';
import { ItemModule } from '../item/item.module';
import { CollectionUpdateComponent } from './collection-update/collection-update.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
    CollectionUpdateComponent,
    UserCollectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ItemModule,
    MatIconModule,
  ],
  exports: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
    UserCollectionComponent,
  ],
})
export class CollectionModule {}
