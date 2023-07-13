import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly httpClient: HttpClient) {}

  create(text: string, item: string) {
    return this.httpClient.post(
      API_URL.COMMENT,
      { text, item },
      { withCredentials: true }
    );
  }

  update(text: string, id: string) {
    return this.httpClient.patch(
      `${API_URL.COMMENT}/${id}`,
      { text },
      { withCredentials: true }
    );
  }

  getByItemId(id: string) {
    return this.httpClient.get(`${API_URL.COMMENT}/item/${id}`, {
      withCredentials: true,
    });
  }
}
