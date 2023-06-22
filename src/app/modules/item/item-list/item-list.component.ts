import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() items: any;
  @Input() userId: any;
  @Input() collectionId: any;
  isItemCreateModalOpen: boolean = false;

  constructor() {}

  openCreateItemModal() {
    this.isItemCreateModalOpen = !this.isItemCreateModalOpen;
  }
  closeCreateModalList(bool: boolean) {
    this.isItemCreateModalOpen = bool;
  }

  setNewCollection(item: any) {
    this.items.push(item);
  }
}
