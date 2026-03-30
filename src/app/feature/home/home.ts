import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);

  protected products = signal<any[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => this.products.set(data),
      error: (err: any) => console.error('Erreur API :', err),
    });
  }
}
