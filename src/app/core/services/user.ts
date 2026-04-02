import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../../shared/models/api-reponse';

@Injectable({ providedIn: 'root' })

export class UserService {

  constructor(private http: HttpClient) {}

  update(
    bodyNoJson: any,
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    const body = JSON.stringify(bodyNoJson);
    return this.http.put<ApiReponse>(apiUrl + '/user/update', body, options);
  }

  delete(
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    return this.http.delete<ApiReponse>(apiUrl + '/user/delete', options);
  }






  creatannonce(
    apiUrl: string,
    options: { headers: HttpHeaders },
    ): Observable<ApiReponse> {
    return this.http.post<ApiReponse>(apiUrl + '/create/annonce', options);
  }

  modifannonce(
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    return this.http.put<ApiReponse>(apiUrl + '/annonce/update/{id}', options);
  }

  deletannonce(
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    return this.http.delete<ApiReponse>(apiUrl + '/user/annonce/delete/{id}', options);
  }


}
