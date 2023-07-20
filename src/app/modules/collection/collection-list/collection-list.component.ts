import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  @Input() collections: any[] = [];
  currentPath: any;
  @Input() userId: any;
  collectionId: any;
  isCreateCollectionOpen: boolean = false;
  isCreateCollectionVisible: boolean = false;
  isUpdateCollectionOpen: boolean = false;
  userAccountId: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userAccountId = this.cookieService.get('userId');
    this.currentPath = this.route.snapshot.url;

    if (this.userId) {
      this.isCreateCollectionVisible = true;
    }
  }

  deleteCollection(id: string) {
    this.collectionService.deleteOne(id).subscribe({
      next: (res: any) => {
        const index = this.collections.findIndex((c: any) => c.id == id);
        this.collections.splice(index, 1);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  changeLike(bool: boolean, collectionId: string) {
    if (bool) {
      this.addLike(collectionId);
    } else {
      this.removeLike(collectionId);
    }
  }

  addLike(collectionId: string) {
    this.collectionService.addLike(this.userAccountId, collectionId).subscribe({
      next: (res: any) => {
        const collection = this.collections.find(
          (c: any) => c.id == collectionId
        );
        collection.isLiked = true;
        collection.likesCount = res.likesCount;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  removeLike(collectionId: string) {
    this.collectionService
      .removeLike(this.userAccountId, collectionId)
      .subscribe({
        next: (res: any) => {
          const collection = this.collections.find(
            (c: any) => c.id == collectionId
          );
          collection.isLiked = false;
          collection.likesCount = res.likesCount;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
  }

  clickUpdateBtn(id: string) {
    this.collectionId = id;
    this.isUpdateCollectionOpen = !this.isUpdateCollectionOpen;
  }

  openCreateCollectionModal() {
    this.isCreateCollectionOpen = !this.isCreateCollectionOpen;
  }

  closeCreateModalList(bool: boolean) {
    this.isCreateCollectionOpen = bool;
  }

  closeUpdateModalList(bool: boolean) {
    this.isUpdateCollectionOpen = bool;
  }

  setNewCollection(collection: any) {
    this.collections.push(collection);
  }

  updateCollection(collection: any) {
    let oldCollection = this.collections.find(
      (c: any) => c.id == this.collectionId
    );
    oldCollection.title = collection?.title;
    oldCollection.avatar = collection?.avatar;
  }
}
