import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../models/register-request';
import { AuthenticationRequest } from '../models/authentication-request';
import { GoogleSSORequest } from '../models/google-sso-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  registerEmployee(data: RegisterRequest): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/v1/auth/register`, data);
  }

  authenticateEmployee(data: AuthenticationRequest): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/v1/auth/authenticate`, data);
  }

  googleSSOAuthenticateEmployee(data: GoogleSSORequest): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/v1/auth/googleSSOAuthenticate`, data);
  }

  logoutEmployee(headers: HttpHeaders): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/v1/auth/empLogout`, {headers});
  } 
}
