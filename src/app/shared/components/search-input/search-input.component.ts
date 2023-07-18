import { Component } from '@angular/core';
import { ItemService } from '../../../core/services/item.service';
import { Router } from '@angular/router';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  search: string = '';
  results: any[] = [];
  showDropdown: boolean = false;
  filterIndex = 0;
  isDropDawnVisible: boolean = false;
  collections: any;

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly collectionService: CollectionService
  ) {}

  getResults() {
    if (this.search.trim() !== '') {
      this.itemService.search(this.search.trim()).subscribe({
        next: (res: any) => {
          this.results = res;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
      this.showDropdown = true;
    } else {
      this.results = [];
      this.showDropdown = false;
    }
  }

  clickDropDawn() {
    this.collectionService.getAllForSearch().subscribe({
      next: (res: any) => {
        this.collections = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.isDropDawnVisible = !this.isDropDawnVisible;
  }

  getItemsByCollection(id: string) {
    this.collectionService.getById(id, 'id').subscribe({
      next: (res: any) => {
        this.results = res.items;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
    this.isDropDawnVisible = false;
    this.showDropdown = true;
  }

  onInputBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 400);
  }

  handleKey(event: any) {
    if (event.keyCode == 38) {
      this.keyPgUp();
    } else if (event.keyCode == 40) {
      this.keyPgDn();
    } else if (event.keyCode == 13) {
      this.keyEnter();
    } else {
      this.filterIndex = 0;
    }
  }
  keyPgUp() {
    if (this.filterIndex > 0) {
      this.filterIndex--;
    }
  }
  keyPgDn() {
    if (this.filterIndex < this.results.length - 1) {
      this.filterIndex++;
    }
  }

  keyEnter() {
    const item = this.results[this.filterIndex];
    this.router.navigate(['home', 'item', item.id]);
    this.onInputBlur();
    this.search = item.name;
  }

  clickDropDown(index: number) {
    const item = this.results[index];
    this.router.navigate(['home', 'item', item.id]);
    this.onInputBlur();
    this.search = item.name;
  }

  searchClick() {
    const item = this.results[this.filterIndex];
    if (item) {
      this.router.navigate(['home', 'item', item.id]);
      this.onInputBlur();
      this.search = item.name;
    }
  }
}
