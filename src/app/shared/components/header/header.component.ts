import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  darkMode: any;

  constructor() {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.darkMode = localStorage.getItem('darkMode');
  }
}
