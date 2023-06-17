import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item-single/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemUpdateComponent } from './item-update/item-update.component';

@NgModule({
  declarations: [ItemComponent, ItemListComponent, ItemCreateComponent, ItemUpdateComponent],
  imports: [CommonModule],
})
export class ItemModule {}
