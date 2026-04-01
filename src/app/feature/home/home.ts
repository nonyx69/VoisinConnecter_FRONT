import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { ProductModel } from '../../shared/models/product.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../product/product';
import { ProductService } from '../../core/services/product';
import { ApiReponse } from '../../shared/models/api-reponse';
import { App } from '../../app';

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

  constructor(private productService: ProductService,
              private app: App) {}

  currentUser: User | null = null;
  protected products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService.getAll(this.app.urlAPI(), this.app.createCORS()).subscribe((reponseProductAll ) => {
      if(reponseProductAll.status == "success") {
        this.products.set(reponseProductAll.result)
      }
    });
  }
}
