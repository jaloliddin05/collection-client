import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(userId: string) {
    return this.httpClient.get(`${API_URL.ITEM}/all/${userId}`, {
      withCredentials: true,
    });
  }

  getById(id: string) {
    return this.httpClient.get(`${API_URL.ITEM}/${id}`, {
      withCredentials: true,
    });
  }

  getMoreLiked(userId:string){
    return this.httpClient.get(`${API_URL.ITEM}/more-liked/${userId}`,{withCredentials:true})
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

  addLike(userId: string, itemId: string) {
    return this.httpClient.patch(
      `${API_URL.ITEM}/add-like`,
      { userId, itemId },
      { withCredentials: true }
    );
  }

  removeLike(userId: string, itemId: string) {
    return this.httpClient.patch(
      `${API_URL.ITEM}/remove-like`,
      { userId, itemId },
      { withCredentials: true }
    );
  }

  search(text: string) {
    return this.httpClient.get(`${API_URL.ITEM}/search`, {
      withCredentials: true,
      params: { text },
    });
  }
}
