import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionComponent } from './collection-single/collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { RouterModule } from '@angular/router';
import { ItemModule } from '../item/item.module';
import { CollectionUpdateComponent } from './collection-update/collection-update.component';
import { HomeCollectionComponent } from './home-collection/home-collection.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
    CollectionUpdateComponent,
    HomeCollectionComponent,
    UserCollectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ItemModule,
  ],
  exports: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
    HomeCollectionComponent,
    UserCollectionComponent,
  ],
})
export class CollectionModule {}
