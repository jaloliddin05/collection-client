import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  darkMode: any;

  constructor(private readonly cookieService: CookieService) {}

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.darkMode = localStorage.getItem('darkMode');
  }

  changeMode() {}
}
