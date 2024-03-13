import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = "http://localhost:3000/posts/";
  constructor(private http: HttpClient) { }

  getApi(){
    return new Promise((resolve, reject) => {
      return this.http.get(this.url).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }

  addApi(data:any){
    return new Promise((resolve, reject) => {
      return this.http.post(this.url, data).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }  

  updateApi(id:any, data:any){
    return new Promise((resolve, reject) => {
      return this.http.get(this.url+id, data).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }
}
