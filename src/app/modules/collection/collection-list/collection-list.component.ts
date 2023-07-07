import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  collections: any[] = [];
  currentPath: any;
  userId: any;
  collectionId: any;
  isCreateCollectionOpen: boolean = false;
  isCreateCollectionVisible: boolean = false;
  isUpdateCollectionOpen: boolean = false;
  userAccountId: any;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userAccountId = this.cookieService.get('userId');
    this.currentPath = this.route.snapshot.url;
    const parentRoute = this.route.parent;
    this.userId = parentRoute?.snapshot.paramMap.get('userId');
    if (!this.userId) {
      this.route.params.subscribe((param) => {
        this.userId = param['id'];
      });
    }

    if (this.userId) {
      this.isCreateCollectionVisible = true;
      this.userService.getById(this.userId).subscribe({
        next: (res: any) => {
          this.collections = res.collections;
        },
        error: (err: any) => {
          this.router.navigate(['login']);
          console.log(err.error);
        },
      });
    } else {
      this.collectionService.getAll(this.userAccountId).subscribe({
        next: (res: any) => {
          this.collections = res.items;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
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
      this.collectionService
        .addLike(this.userAccountId, collectionId)
        .subscribe({
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
    } else {
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
