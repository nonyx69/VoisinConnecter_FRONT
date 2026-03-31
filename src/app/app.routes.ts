import { Routes } from '@angular/router';
import { Home } from './feature/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '**', redirectTo: '' },
];
