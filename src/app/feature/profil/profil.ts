import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Product } from '../product/product';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css'],
})
export class Profil implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private platformId = inject(PLATFORM_ID);
  private productService = inject(Product);
  currentUser: User | null = null;
}
