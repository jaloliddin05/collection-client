import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ISignUp } from './interface';
import { API_URL } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  signUp(data: ISignUp) {
    return this.httpClient.post(API_URL.USER, data, { withCredentials: true });
  }

  login(data: ILogin) {
    return this.httpClient.post(`${API_URL.AUTH}/login`, data, {
      withCredentials: true,
    });
  }

  registerWithGoogle() {}

  registerWithGithub() {}

  loginWithGoogle() {}

  loginWithGithub() {}
}
