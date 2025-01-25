import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data: RegisterRequest): Observable<any> {
    return this._http.post('http://localhost:8082/api/v1/auth/register', data);
  }

  getEmployee(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/v1/login/getEmployees`);
  }

  deleteEmployee(empId: Number, headers: HttpHeaders): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/v1/employee/deleteEmployee/${empId}`, {headers});
  }
}
