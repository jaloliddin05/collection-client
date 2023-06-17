import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  error: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.error = err.error;
        setTimeout(() => {
          this.error = {};
          this.signUpForm.reset();
        }, 2000);
      },
    });
  }
}
