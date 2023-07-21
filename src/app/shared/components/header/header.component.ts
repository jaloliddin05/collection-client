import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  darkMode: any;
  user: any;
  isAuthModalOpen:boolean = false

  constructor(
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.darkMode = localStorage.getItem('darkMode');
    this.getMe();
  }

  getMe() {
    this.userService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  goProfile() {
    if(this.userId){
      this.router.navigate(['profile',this.userId,'collection'])
    }else{
      this.isAuthModalOpen = true
    }
  }
}
