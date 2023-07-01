import { Component, EventEmitter, Output } from '@angular/core';
import { TagService } from '../../../core/services/tag.service';

@Component({
  selector: 'app-tag-search-input',
  templateUrl: './tag-search-input.component.html',
  styleUrls: ['./tag-search-input.component.scss'],
})
export class TagSearchInputComponent {
  search: string = '';
  results: any[] = [];
  showDropdown: boolean = false;
  filterIndex = 0;

  @Output() tagResponse = new EventEmitter();

  constructor(private readonly tagService: TagService) {}

  getResults() {
    if (this.search.trim() !== '') {
      this.tagService.getByTitle(this.search.trim()).subscribe({
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
    const user = this.results[this.filterIndex];
    this.onInputBlur();
    this.search = user.title;
  }

  clickDropDown(index: number) {
    const tag = this.results[index];
    this.onInputBlur();
    this.search = tag.title;
  }

  addTag() {
    this.tagService.create(this.search).subscribe({
      next: (res: any) => {
        this.tagResponse.emit(res);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }
}
