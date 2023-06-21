import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.cookieService.set('userId', res.userId);
        this.router.navigate(['home/collection']);
      },
      error: (err) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = {};
          this.loginForm.reset();
        }, 2500);
      },
    });
  }
}
