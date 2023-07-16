import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-collection',
  templateUrl: './home-collection.component.html',
  styleUrls: ['./home-collection.component.scss'],
})
export class HomeCollectionComponent implements OnInit {
  collections: any;
  meta: any;
  links: any;
  userId: any;
  constructor(
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId') || 'id';
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
}
