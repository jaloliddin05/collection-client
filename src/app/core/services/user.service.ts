import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get(API_URL.USER, {withCredentials:true})
  }

  getById(id:string){
    return this.httpClient.get(`${API_URL.USER}/${id}`,{withCredentials:true})
  }

  deleteOne(id:string){
    return this.httpClient.delete(`${API_URL.USER}/${id}`,{withCredentials:true})
  }

  update(id:string, data:any){
    return this.httpClient.put(`${API_URL.USER}/${id}`,data,{withCredentials:true})
  }
}
