import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../../shared/models/api-reponse';

@Injectable({
  providedIn: 'root',
})
export class Status {
  constructor(private http: HttpClient) {}

  setStatus(annonceId: number, apiUrl:string, options:{headers: HttpHeaders}): Observable<ApiReponse> {
    return this.http.post<ApiReponse>(apiUrl + '/status/annoncecreate/'+ annonceId,{}, options);
  }

  updateStatus(annonceId:number, status:string, apiUrl:string, options:{headers: HttpHeaders}): Observable<ApiReponse>{
    return this.http.put<ApiReponse>(apiUrl + '/status/change/'+ annonceId +'/' + status, {}, options);
  }
}

