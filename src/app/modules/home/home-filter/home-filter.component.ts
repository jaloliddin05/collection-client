import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TagService } from '../../../core/services/tag.service';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss'],
})
export class HomeFilterComponent implements OnInit {
  tags: any[] = [];
  userId: any;
  @Output() setCollection = new EventEmitter();

  constructor(
    private readonly tagService: TagService,
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.tagService.getAll().subscribe({
      next: (res: any) => {
        this.tags = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.userId = this.cookieService.get('userId') || 'id';
  }

  getMoreLiked() {
    this.collectionService.getEightMoreLiked(this.userId).subscribe({
      next: (res: any) => {
        this.setCollection.emit({ collections: res, bool: false });
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
  getBigCollections() {
    this.collectionService.getEightBigCollection(this.userId).subscribe({
      next: (res: any) => {
        this.setCollection.emit({ collections: res, bool: false });
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getByTitle() {
    this.collectionService.getAll(this.userId).subscribe({
      next: (res: any) => {
        this.setCollection.emit({ collections: res.items, bool: true });
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
