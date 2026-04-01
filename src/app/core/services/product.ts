import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiReponse } from '../../shared/models/api-reponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getOne(
    productId: string,
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/annonce/get/' + productId, options);
  }

  getAll(apiUrl: string, options: { headers: HttpHeaders }): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/annonce/getAll', options);
  }

  filterBy(
    productCategory: string,
    apiUrl: string,
    options: { headers: HttpHeaders },
  ): Observable<ApiReponse> {
    return this.http.get<ApiReponse>(apiUrl + '/annonce/category/' + productCategory, options);
  }

  getProductByUser(idUser: number, apiUrl: string, options: { headers: HttpHeaders }){
    return this.http.get<ApiReponse>(apiUrl + '/annonce/user/' + idUser, options);
  };
}
