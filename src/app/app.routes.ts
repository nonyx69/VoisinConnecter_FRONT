import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Product } from './feature/product/product';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';
import { Profil } from './feature/profil/profil';
import { Admin } from './feature/users/users/users';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'product/:id', component: Product },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profil', component: Profil },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' },
];
