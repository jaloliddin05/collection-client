import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';
import { TagService } from '../../../core/services/tag.service';

@Component({
  selector: 'app-home-collection',
  templateUrl: './home-collection.component.html',
  styleUrls: ['./home-collection.component.scss'],
})
export class HomeCollectionComponent implements OnInit {
  collections: any;
  likedCollections: any;
  bigCollections: any;
  items: any;
  meta: any;
  links: any;
  userId: any;

  constructor(
    private readonly collectionService: CollectionService,
    private readonly tagService: TagService,
    private readonly cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId') || 'id';
    this.getAllCollections();
    this.getMoreLiked();
    this.getBigCollections();
  }

  paginate(page: number) {
    this.collectionService.getAll(this.userId, page).subscribe({
      next: (res: any) => {
        this.collections = res.items;
        this.meta = res.meta;
        this.links = res.links;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getAllCollections() {
    this.collectionService.getAll(this.userId).subscribe({
      next: (res: any) => {
        this.collections = res.items;
        this.meta = res.meta;
        this.links = res.links;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getMoreLiked() {
    this.collectionService.getEightMoreLiked(this.userId).subscribe({
      next: (res: any) => {
        this.likedCollections = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getBigCollections() {
    this.collectionService.getEightBigCollection(this.userId).subscribe({
      next: (res: any) => {
        this.bigCollections = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getByTag(tagId: string) {
    this.tagService.getItemsByTag(tagId, this.userId).subscribe({
      next: (res: any) => {
        this.items = res.items;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
