import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { App } from '../../app';
import { ProductService } from '../../core/services/product';
import { ProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-annonces',
  imports: [RouterLink],
  templateUrl: './annonces.html',
  styleUrl: './annonces.css',
})
export class Annonces {
  //Tableau Catégories
  category = [
    { id: 1, name: 'Bricolage' },
    { id: 2, name: 'Jardinage' },
    { id: 3, name: 'Aide' },
    { id: 4, name: 'Animaux' },
    { id: 5, name: 'Informatique' },
  ];

  //Suite pages
  currentPage = signal(1);
  itemsPerPage = 9;
  start = this.currentPage();
  hasPrevPage = computed(() => this.currentPage() > 1);
  hasNextPage = computed(() => this.currentPage() < this.totalPages());

  selected: string = 'all';

  constructor(
    private app: App,
    private productService: ProductService,
    private router: Router,
  ) {}

  protected products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService
      .getAll(this.app.urlAPI(), this.app.createCORS())
      .subscribe((reponseProductAll) => {
        if (reponseProductAll.status == 'success') {
          this.products.set(reponseProductAll.result);
        }
      });

  }

  Filtre(category: string) {
    this.selected = 'category';
    this.productService
      .filterBy(category, this.app.urlAPI(), this.app.createCORS())
      .subscribe((reponseProductfiltre) => {
        if (reponseProductfiltre.status == 'success') {
          this.products.set(reponseProductfiltre.result);
        } else {
          console.log(reponseProductfiltre.status);
        }
      });
  }

  All() {
    this.selected = 'all';
    this.productService
      .getAll(this.app.urlAPI(), this.app.createCORS())
      .subscribe((reponseProductAll) => {
        if (reponseProductAll.status == 'success') {
          this.products.set(reponseProductAll.result);
        }
      });
  }

  // Signal calculé pour les produits paginés
  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  pagedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products().slice(startIndex, endIndex);
  });
  totalPages = computed(() => Math.ceil(this.products().length / this.itemsPerPage));

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
