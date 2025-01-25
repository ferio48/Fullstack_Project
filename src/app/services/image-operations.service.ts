import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageOperationsService {

  constructor(private _http: HttpClient) {}

  uploadImage(file: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/v1/image/uploadImage`, file);
  }

  getAllImageData(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/v1/image/getAllImages`);
  }

  deleteImage(fileId: number): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/v1/image/deleteImage/${fileId}`);
  }
}
