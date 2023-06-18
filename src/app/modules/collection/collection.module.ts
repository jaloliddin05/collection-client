import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection-single/collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';

@NgModule({
  declarations: [CollectionComponent, CollectionListComponent],
  imports: [CommonModule],
  exports: [CollectionComponent, CollectionListComponent],
})
export class CollectionModule {}
