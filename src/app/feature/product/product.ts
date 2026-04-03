import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../core/services/product';
import { App } from '../../app';
import { ApiReponse } from '../../shared/models/api-reponse';
import { ProductModel } from '../../shared/models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  productSelected = signal<ProductModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private app:App,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.productService.getOne(id, this.app.urlAPI(), this.app.createCORS()).subscribe((responseProductOne: ApiReponse) => {

          if (responseProductOne.status == "ok") {

            this.productSelected.set(responseProductOne.result);

          }
      });

    }
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // fallback
      this.router.navigate(['/']);
    }
  }
}
