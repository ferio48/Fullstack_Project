import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRespService {

  constructor(private _http: HttpClient) { }

  getEmployeeRespList(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/v1/employee/getEmployeeResp`);
  }

  updateEmployee(data: RegisterRequest, id: number): Observable<any> {
    return this._http.put(`${environment.apiUrl}/api/v1/employee/updateEmployee/${id}`, data);
  }
}
