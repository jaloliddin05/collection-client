import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  collection: any;

  constructor(
    private readonly param: ActivatedRoute,
    private readonly collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.param.params.subscribe((params) => {
      const id = params['id'];
      this.collectionService.getById(id).subscribe({
        next: (res) => {
          this.collection = res;
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }
}
