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
  items: any;
  @Input() userId: any;
  @Input() collectionId: any;
  isItemCreateModalOpen: boolean = false;
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

    this.collectionService
      .getById(this.collectionId, this.userAccountId)
      .subscribe({
        next: (res: any) => {
          this.items = res.items;
          console.log(this.items[0]?.tags);
        },
        error: (err: any) => {},
      });
  }

  changeLike(bool: boolean, itmId: string) {
    if (bool) {
      this.itemService.addLike(this.userAccountId, itmId).subscribe({
        next: (res: any) => {
          const item = this.items.find((c: any) => c.id == itmId);
          item.isLiked = true;
          item.likesCount = res.likesCount;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    } else {
      this.itemService.removeLike(this.userAccountId, itmId).subscribe({
        next: (res: any) => {
          const item = this.items.find((c: any) => c.id == itmId);
          item.isLiked = false;
          item.likesCount = res.likesCount;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    }
  }

  openCreateItemModal() {
    this.isItemCreateModalOpen = !this.isItemCreateModalOpen;
  }
  closeCreateModalList(bool: boolean) {
    this.isItemCreateModalOpen = bool;
  }

  setNewItem(item: any) {
    this.items.push(item);
  }
}
