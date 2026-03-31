import { Injectable, inject, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { environment } from '../../app';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
@Injectable({ providedIn: 'root' })
export class Product {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
