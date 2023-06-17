import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../core/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: any;

  constructor(
    private readonly param: ActivatedRoute,
    private readonly itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.param.params.subscribe((params) => {
      const id = params['id'];
      this.itemService.getById(id).subscribe({
        next: (res) => {
          this.item = res;
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }
}