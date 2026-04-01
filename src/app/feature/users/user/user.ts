import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../../shared/models/user.model';
// import { ProductModel } from '../../../shared/models/product.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class Profil implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  private platformId = inject(PLATFORM_ID);
 // private productService = inject(Product);
  currentUser: User | null = null;
}
