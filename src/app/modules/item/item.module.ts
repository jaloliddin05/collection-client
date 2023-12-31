import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ItemComponent } from './item-single/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { RouterModule } from '@angular/router';
import { TagModule } from '../tag/tag.module';
import { FieldModule } from '../field/field.module';
import { CommentModule } from '../comment/comment.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    FieldModule,
    CommentModule,
    SharedModule,
    MatIconModule,
  ],
  exports: [
    ItemComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemUpdateComponent,
  ],
})
export class ItemModule {}
