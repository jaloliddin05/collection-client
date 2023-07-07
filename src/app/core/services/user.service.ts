import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(API_URL.USER, { withCredentials: true });
  }

  getById(id: string) {
    return this.httpClient.get(`${API_URL.USER}/${id}`, {
      withCredentials: true,
    });
  }

  getMe() {
    return this.httpClient.get(`${API_URL.USER}/me`, { withCredentials: true });
  }

  deleteOne(id: string) {
    return this.httpClient.delete(`${API_URL.USER}/${id}`, {
      withCredentials: true,
    });
  }

  update(id: string, data: any) {
    return this.httpClient.put(`${API_URL.USER}/${id}`, data, {
      withCredentials: true,
    });
  }

  changeRole(id: string, role: number) {
    return this.httpClient.patch(
      `${API_URL.USER}/role/${id}`,
      { role },
      {
        withCredentials: true,
      }
    );
  }

  changeStatus(id: string, status: boolean) {
    return this.httpClient.patch(
      `${API_URL.USER}/status/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );
  }
}
