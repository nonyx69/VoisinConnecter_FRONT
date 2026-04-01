import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { App } from '../../../../app';
import { ProductService } from '../../../../core/services/product';
import { ApiReponse } from '../../../../shared/models/api-reponse';
import { ProductModel } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-profil-annonce',
  imports: [],
  templateUrl: './profil-annonce.html',
  styleUrl: './profil-annonce.css',
})
export class ProfilAnnonce {

  selectedProduct: ProductModel[]|undefined = null;

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public app: App,
  ) {}


  ngOnInit() {

    this.productService.getProductByUser(this.authService.currentUserSelect().id, this.app.urlAPI(), this.app.createCORS()).subscribe((reponseProductUser: ApiReponse) => {

      if(reponseProductUser.status == "ok"){
        this.selectedProduct = reponseProductUser.result;
      }

    }, (error) => {
      console.log("Route a faire");
    });

  }



}
