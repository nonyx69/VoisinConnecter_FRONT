import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product/product';
import { User } from '../../shared/models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private productService = inject(Product);
  currentUser: User | null = null;

  protected products = signal<any[]>([]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.productService.getProducts().subscribe({
        next: (data) => this.products.set(data.results),
        error: (err: any) => console.error('Erreur API :', err),
      });


      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }
}
