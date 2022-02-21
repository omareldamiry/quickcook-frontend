import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = `${environment.server}`;

  constructor(private http: HttpClient) { }

  get(apiRoute: string) {
    return this.http.get<ApiResponse>(this.url + apiRoute);
  }

  post(apiRoute: string, body: any) {
    return this.http.post<ApiResponse>(this.url + apiRoute, body);
  }

  put(apiRoute: string, body: any) {
    return this.http.put<ApiResponse>(this.url + apiRoute, body);
  }

  delete(apiRoute: string) {
    return this.http.delete<ApiResponse>(this.url + apiRoute);
  }
}
