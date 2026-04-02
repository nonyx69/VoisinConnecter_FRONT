import { OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { Component  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';
import { AuthService } from '../../../core/services/auth';
import { ProfilAnnonce } from './profil-annonce/profil-annonce';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink, ProfilAnnonce, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {
  isEditModalOpen = false;
  tempNom: string = '';
  tempprenom: string = '';
  tempemail: string = '';
  tempphotoProfil: Text | string = '';
  temppassword: string = '';

  constructor(
    private cookiesService: CookieService,
    public authService: AuthService,
    public app: App,
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  openEditModal() {
    const p = this.app.currentUser;
    this.tempNom = p.Nom || '';
    this.tempprenom = p.prenom || '';
    this.tempemail = p.email || '';
    this.temppassword = p.password || '';
    this.tempphotoProfil = p.photoProfil || '';
    this.isEditModalOpen = true;
  }

  saveProfil() {
    const token = cookieStore.get('voisinConnecterToken');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

  }

  const updatedData = {
    Nom: this.tempNom,
    prenom: this.tempprenom,
    email: this.tempemail,
    password: this.temppassword,
    photoProfil: this.tempphotoProfil
  };



  updateLocalData(p: string, value: string) {
    if (this.app.currentUser) this.app.currentUser[p] = value;
  }

  forkJoin([Nom]) {
    next: () => {
      const nom = this.tempNom.startsWith('data:');

      this.updateLocalData('nom', this.tempNom);

      this.authService.updateUser({ ...this.app.currentUser });
      this.isEditModalOpen = false;
      console.log('Profil mis à jour et synchroniser !');
    };
  }

  updateProfil() {
    this.updateLocalData('Nom', this.tempNom);
  }
  // creation annonce
}

