import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from './core/services/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('VoisinConnecter_API');

  constructor(public authService: AuthService) {}
}



// Variable GLOBAL

// Pour le dev :
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
};
