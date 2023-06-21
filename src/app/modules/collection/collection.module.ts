import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionComponent } from './collection-single/collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CollectionComponent,
    CollectionListComponent,
    CollectionCreateComponent,
  ],
})
export class CollectionModule {}
