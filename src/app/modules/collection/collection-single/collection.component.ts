import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  collection: any;
  items: any[] = [];
  collectionId: any;
  userId: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    this.userId = parentRoute?.snapshot.paramMap.get('userId');

    this.route.params.subscribe((params) => {
      this.collectionId = params['id'];
      this.collectionService.getById(this.collectionId).subscribe({
        next: (res: any) => {
          this.collection = res;
          this.items = res.items;
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }

  back() {
    this.location.back();
  }
}
