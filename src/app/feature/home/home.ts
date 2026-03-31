import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { ProductModel } from '../../shared/models/product.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  currentUser: User | null = null;
  protected products = signal<ProductModel[]>([]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<any>('http://localhost:8000/annonce/getAll').subscribe({
        next: (data) => {
          console.log('Données reçues :', data);
          const results = Array.isArray(data) ? data : data.results || [];
          this.products.set(results);
        },
        error: (err: any) => console.error('Erreur API :', err),
      });

      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }
}
