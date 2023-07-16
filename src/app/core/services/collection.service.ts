import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(id: string, page: number = 1) {
    return this.httpClient.get(`${API_URL.COLLECTION}/all/${id}`, {
      withCredentials: true,
      params: { page },
    });
  }

  getById(id: string, userId: string) {
    return this.httpClient.get(`${API_URL.COLLECTION}/${id}`, {
      params: { userId },
      withCredentials: true,
    });
  }

  getAllForSearch() {
    return this.httpClient.get(`${API_URL.COLLECTION}/all-for-search`, {
      withCredentials: true,
    });
  }
  deleteOne(id: string) {
    return this.httpClient.delete(`${API_URL.COLLECTION}/${id}`, {
      withCredentials: true,
    });
  }

  update(id: string, data: any) {
    return this.httpClient.put(`${API_URL.COLLECTION}/${id}`, data, {
      withCredentials: true,
    });
  }

  create(data: any) {
    return this.httpClient.post(API_URL.COLLECTION, data, {
      withCredentials: true,
    });
  }

  addLike(userId: string, collectionId: string) {
    return this.httpClient.patch(
      `${API_URL.COLLECTION}/add-like`,
      { userId, collectionId },
      { withCredentials: true }
    );
  }

  removeLike(userId: string, collectionId: string) {
    return this.httpClient.patch(
      `${API_URL.COLLECTION}/remove-like`,
      { userId, collectionId },
      { withCredentials: true }
    );
  }
}
