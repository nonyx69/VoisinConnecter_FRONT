import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, ApiResponse, StatsData } from '../../shared/models/admin.model';
import { User } from '../../shared/models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl: string;

  constructor(private http: HttpClient) {}

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }

  private getOptions(): { headers: HttpHeaders } {
    const token = this.getCookie('jwt_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getStats(): Observable<ApiResponse<StatsData>> {
    return this.http.get<ApiResponse<StatsData>>(`${this.apiUrl}/stats`, this.getOptions());
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/admin/users`, this.getOptions());
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>( `${this.apiUrl}/admin/user/${id}`, this.getOptions());
  }
}
