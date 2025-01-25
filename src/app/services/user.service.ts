import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/users', data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }
}
