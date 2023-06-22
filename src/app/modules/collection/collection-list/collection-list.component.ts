import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  collections: any[] = [];
  currentPath: any;
  userId: any;
  isCreateCollectionOpen: boolean = false;
  isCreateCollectionVisible: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.currentPath = this.route.snapshot.url;
    const parentRoute = this.route.parent;
    this.userId = parentRoute?.snapshot.paramMap.get('userId');

    if (this.userId) {
      this.isCreateCollectionVisible = true;
      this.userService.getById(this.userId).subscribe({
        next: (res: any) => {
          this.collections = res.collections;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    } else {
      this.collectionService.getAll().subscribe({
        next: (res: any) => {
          this.collections = res.items;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    }
  }

  openCreateCollectionModal() {
    this.isCreateCollectionOpen = !this.isCreateCollectionOpen;
  }

  closeCreateModalList(bool: boolean) {
    this.isCreateCollectionOpen = bool;
  }

  setNewCollection(collection: any) {
    this.collections.push(collection);
  }
}
