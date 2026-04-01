import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Product } from './feature/product/product';
import { Annonces} from './feature/annonces/annonces';
import { Login } from './feature/auth/login/login';
import { Register } from './feature/auth/register/register';
import { Profil } from './feature/users/user/user';
import { Admin } from './feature/users/admin/admin';
import { Err } from './feature/err/err';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'product/:id', component: Product },
  { path: 'annonces', component: Annonces },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user', component: Profil },
  { path: 'admin', component: Admin },
  { path: '**', component: Err },
];
