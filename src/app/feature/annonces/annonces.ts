import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '../../app';
import { ProductService } from '../../core/services/product';
import { ProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-annonces',
  imports: [],
  templateUrl: './annonces.html',
  styleUrl: './annonces.css',
})
export class Annonces {

  constructor(private app: App,
              private productService: ProductService,
              private router: Router,) {
  }

  protected products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService.getAll(this.app.urlAPI(), this.app.createCORS()).subscribe((reponseProductAll ) => {
      if (reponseProductAll.status == 'success') {
        this.products.set(reponseProductAll.result);
      }
    })
  }


  Filtre(category: string) {
    this.productService.filterBy(category, this.app.urlAPI(), this.app.createCORS()).subscribe(reponseProductfiltre => {
      if (reponseProductfiltre.status == "success") {
        this.products.set(reponseProductfiltre.result);
      }
      else{
        console.log(reponseProductfiltre.status);
      }
    })
  }

  All(){
    this.productService
      .getAll(this.app.urlAPI(), this.app.createCORS())
      .subscribe((reponseProductAll) => {
        if (reponseProductAll.status == 'success') {
          this.products.set(reponseProductAll.result);
        }
      });
  }

}
