import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { App } from '../../../../app';
import { ProductService } from '../../../../core/services/product';
import { ApiReponse } from '../../../../shared/models/api-reponse';
import { ProductModel } from '../../../../shared/models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profil-annonce',
  imports: [RouterLink],
  templateUrl: './profil-annonce.html',
  styleUrl: './profil-annonce.css',
})
export class ProfilAnnonce implements OnInit {
  selectedProduct: ProductModel[] | undefined = null;
  ShowItems: boolean = false;

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    private cookieService: CookieService,
    private cd: ChangeDetectorRef, //
    public app: App,
  ) {}


  ngOnInit(): void {
    if (this.authService.currentUserSelect()) {
      this.getUserProduct();
    }
    setTimeout(() => {
      this.ShowItems = true;
      this.cd.detectChanges();
    }, 2000);
  }

  getUserProduct(){

    const actualUser = this.authService.currentUserSelect();
    const token = this.cookieService.get('voisinConnecterToken');

    if(!actualUser || !actualUser.id || !token) {
      console.error('Le User ou le Token n est pas good');
      return;
    }

    this.productService.getProductByUser(this.authService.currentUserSelect().id,
        this.app.urlAPI(),
        this.app.createCORS(token),
      )
      .subscribe(
        (reponseProductUser: ApiReponse) => {
          if (reponseProductUser.status == 'success') {
            this.selectedProduct = reponseProductUser.result;
            this.cd.detectChanges();
          }
        }
      );
  }
}
