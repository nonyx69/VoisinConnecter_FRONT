import { OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { Component  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';
import { AuthService } from '../../../core/services/auth';
import { ProfilAnnonce } from './profil-annonce/profil-annonce';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ApiReponse } from '../../../shared/models/api-reponse';

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
    private router: Router,
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
    const token = this.cookiesService.get('voisinConnecterToken');
    if (!token) return;

    const upddateData = {
      Nom: this.tempNom
    }

    var bodyJSON = {
      "nom": upddateData.Nom
    }
  console.log(upddateData);
    this.userService.update(bodyJSON, this.app.urlAPI(), this.app.createCORS(token)).subscribe((reponseUpdateAPI: ApiReponse) => {
      if (reponseUpdateAPI.status == "ok"){
        alert("Mise à jour avec Success");
        this.router.navigate(['/user']);
      }
    })
  }

  updateLocalData(p: string, value: string) {
    if (this.app.currentUser) this.app.currentUser[p] = value;
  }

  updateProfil() {
    this.updateLocalData('Nom', this.tempNom);
  }
  // creation annonce
}

