import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private readonly httpClient: HttpClient) {}

  create(title: string) {
    return this.httpClient.post(
      API_URL.TAG,
      { title },
      { withCredentials: true }
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`${API_URL.TAG}/${id}`, {
      withCredentials: true,
    });
  }

  getByTitle(title: string) {
    return this.httpClient.get(`${API_URL.TAG}/title`, {
      params: { title },
      withCredentials: true,
    });
  }
}
