import { Component, OnInit, inject, signal, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { ProductModel } from '../../shared/models/product.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product } from '../product/product';
import { ProductService } from '../../core/services/product';
import { ApiReponse } from '../../shared/models/api-reponse';
import { App } from '../../app';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private productService: ProductService,
    private app: App,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef,
  ) {}

  currentUser: User | null = null;
  protected products = signal<ProductModel[]>([]);
  protected Userproduct=signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService
      .filterByCreateDate(this.app.urlAPI(), this.app.createCORS())
      .subscribe((reponseProductAll) => {
        if (reponseProductAll.status == 'success') {
          this.products.set(reponseProductAll.result);
        }
      });

    const checkUserInterval = setInterval(() => {
      if (this.app.currentUser) {
        this.currentUser = this.app.currentUser;
        this.getUserProduct();
        clearInterval(checkUserInterval);
      }
    }, 100);
  }

  getUserProduct() {
    const token = this.cookieService.get('voisinConnecterToken');

    if (!this.currentUser || !this.currentUser.id || !token) {
      console.error('Le User ou le Token n est pas good');
      return;
    }

    this.productService
      .getProductByUser(
        this.currentUser.id,
        this.app.urlAPI(),
        this.app.createCORS(token),
      )
      .subscribe((reponseProductUser: ApiReponse) => {
        if (reponseProductUser.status == 'success') {
          this.Userproduct.set(reponseProductUser.result);
          this.cd.detectChanges(); //Force un Reload avec l'appel plus haut
        }
      });
  }
}
