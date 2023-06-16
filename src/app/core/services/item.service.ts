import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(API_URL.ITEM, { withCredentials: true });
  }

  getById(id: string) {
    return this.httpClient.get(`${API_URL.ITEM}/${id}`, {
      withCredentials: true,
    });
  }

  deleteOne(id: string) {
    return this.httpClient.delete(`${API_URL.ITEM}/${id}`, {
      withCredentials: true,
    });
  }

  update(id: string, data: any) {
    return this.httpClient.put(`${API_URL.ITEM}/${id}`, data, {
      withCredentials: true,
    });
  }

  create(data: any) {
    return this.httpClient.post(API_URL.ITEM, data, { withCredentials: true });
  }
}
