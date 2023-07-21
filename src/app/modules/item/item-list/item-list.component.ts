import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';
import { ItemService } from '../../../core/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() userId: any;
  @Input() collectionId: any;
  itemId: any;
  isItemCreateModalOpen: boolean = false;
  isItemUpdateModalOpen: boolean = false;
  userAccountId: any;
  currentPath: any;

  constructor(
    private readonly collectionService: CollectionService,
    private readonly route: ActivatedRoute,
    private readonly cookieService: CookieService,
    private readonly itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.userAccountId = this.cookieService.get('userId');
    this.currentPath = this.route.snapshot.url;

    this.collectionId ? this.getItemsByCollectionId() : null;
  }

  getItemsByCollectionId() {
    this.collectionService
      .getById(this.collectionId, this.userAccountId)
      .subscribe({
        next: (res: any) => {
          this.items = res.items;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
  }

  changeLike(bool: boolean, itemId: string) {
    if (bool) {
      this.addLike(itemId);
    } else {
      this.removeLike(itemId);
    }
  }

  addLike(itemId: string) {
    this.itemService.addLike(this.userAccountId, itemId).subscribe({
      next: (res: any) => {
        const item = this.items.find((c: any) => c.id == itemId);
        item.isLiked = true;
        item.likesCount = res.likesCount;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  removeLike(itemId: string) {
    this.itemService.removeLike(this.userAccountId, itemId).subscribe({
      next: (res: any) => {
        const item = this.items.find((c: any) => c.id == itemId);
        item.isLiked = false;
        item.likesCount = res.likesCount;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  deleteItem(id: string) {
    this.itemService.deleteOne(id).subscribe({
      next: (res: any) => {
        const index = this.items.findIndex((i: any) => i.id == id);
        this.items.splice(index, 1);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  clickUpdateBtn(id: string) {
    this.itemId = id;
    this.isItemUpdateModalOpen = !this.isItemUpdateModalOpen;
  }

  openCreateItemModal() {
    this.isItemCreateModalOpen = !this.isItemCreateModalOpen;
  }

  closeCreateModalList(bool: boolean) {
    this.isItemCreateModalOpen = bool;
  }

  changeVisibleUpdateModal(bool: boolean) {
    this.isItemUpdateModalOpen = bool;
  }

  setNewItem(item: any) {
    this.items.push(item);
  }

  updateItem(item: any) {
    const index = this.items.findIndex((i: any) => i.id == item.id);
    this.items[index] = item;
  }
}
