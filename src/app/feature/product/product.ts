import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// Exemple d'import dans tes composants
import { ProductModel } from '../../shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  // On utilise l'interface pour typer le signal
  item = signal<ProductModel | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.http.get<ProductModel>(`http://localhost:8000/annonce/get/${id}`).subscribe({
        next: (data) => {
          this.item.set(data);
        },
        error: (err) => console.error('Erreur API :', err),
      });
    }
  }
}
