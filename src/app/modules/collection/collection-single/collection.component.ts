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

  constructor(
    private readonly param: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.param.params.subscribe((params) => {
      const id = params['id'];
      this.collectionService.getById(id).subscribe({
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
