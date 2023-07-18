import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() meta: any;
  @Input() links: any;
  @Output() setPagination = new EventEmitter();

  paginate(page: number) {
    this.setPagination.emit(page);
  }
}
