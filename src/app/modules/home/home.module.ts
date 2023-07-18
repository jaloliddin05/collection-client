import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CollectionModule } from '../collection/collection.module';
import { HomeCollectionComponent } from './home-collection/home-collection.component';
import { ItemModule } from '../item/item.module';
import { HomeItemComponent } from './home-item/home-item.component';

@NgModule({
  declarations: [HomeComponent, HomeCollectionComponent, HomeItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CollectionModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    ItemModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
