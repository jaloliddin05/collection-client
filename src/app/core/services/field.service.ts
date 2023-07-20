import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor(private readonly httpClient: HttpClient) {}

  updateField(id: string, data: any) {
    return this.httpClient.patch(`${API_URL.FIELD}/${id}`, data, {
      withCredentials: true,
    });
  }
}
