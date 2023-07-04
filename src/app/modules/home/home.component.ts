import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../core/services/collection.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  collections: any;

  constructor(
    private readonly collectionService: CollectionService,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    this.collectionService.getAll(userId).subscribe({
      next: (res: any) => {
        this.collections = res.items;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
