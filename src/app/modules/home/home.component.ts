import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../core/services/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  collections: any;

  constructor(private readonly collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService.getAll().subscribe({
      next: (res: any) => {
        this.collections = res.items;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
