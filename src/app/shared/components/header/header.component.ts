import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  darkMode: any;
  user:any

  constructor(private readonly cookieService: CookieService,private readonly userService:UserService) {}

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.darkMode = localStorage.getItem('darkMode');
    this.userService.getMe().subscribe({
      next:(res:any)=>{
        this.user = res
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  changeMode() {}
}
