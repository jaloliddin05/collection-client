import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../core/services/item.service';
import { TagService } from '../../../core/services/tag.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss'],
})
export class HomeItemComponent implements OnInit {
  items: any;
  likedItems: any;
  tagItems: any;
  userId: any;
  meta: any;
  links: any;
  tags: any;

  constructor(
    private readonly itemService: ItemService,
    private readonly tagService: TagService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId') || 'id';
    this.getAllItems();
    this.getMoreLikedItems();
    this.getAllTags();
  }

  getAllItems() {
    this.itemService.getAll(this.userId).subscribe({
      next: (res: any) => {
        this.items = res.items;
        this.meta = res.meta;
        this.links = res.links;
        this.tagItems = this.items;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getItemsByTag(tagId: string) {
    console.log(tagId);

    this.tagService.getItemsByTag(tagId, this.userId).subscribe({
      next: (res: any) => {
        this.tagItems = res.items;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getMoreLikedItems() {
    this.itemService.getMoreLiked(this.userId).subscribe({
      next: (res: any) => {
        this.likedItems = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  getAllTags() {
    this.tagService.getAll().subscribe({
      next: (res: any) => {
        this.tags = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
