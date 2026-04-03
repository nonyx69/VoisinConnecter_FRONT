import { ChangeDetectorRef, OnInit, signal } from '@angular/core';
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
import { Err } from '../../err/err';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ProfilAnnonce, FormsModule, Err],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {
  isEditModalOpen: boolean;
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
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isEditModalOpen = false;
    console.log(this.isEditModalOpen);
  }

  openEditModal() {
    // const p = this.app.currentUser;
    // this.tempNom = p.Nom || '';
    // this.tempprenom = p.prenom || '';
    // this.tempemail = p.email || '';
    // this.temppassword = p.password || '';
    // this.tempphotoProfil = p.photoProfil || '';
    //

    this.isEditModalOpen = true;
  }

  saveProfil() {
    const token = this.cookiesService.get('voisinConnecterToken');
    if (!token) return;

    const upddateData = {
      Nom: this.tempNom,
      prenom: this.tempprenom,
      email: this.tempemail,
      password: this.temppassword,
      photoProfil: this.tempphotoProfil,
    };

    var bodyJSON = {
      nom: upddateData.Nom,
      prenom: upddateData.prenom,
      email: upddateData.email,
      password: upddateData.password,
      photoProfil: upddateData.photoProfil,
    };

    this.userService
      .update(bodyJSON, this.app.urlAPI(), this.app.createCORS(token))
      .subscribe((reponseUpdateAPI: ApiReponse) => {
        if (reponseUpdateAPI.status == 'ok') {
          alert('Mise à jour avec Success');
          this.cd.detectChanges();
          this.isEditModalOpen = false;
        }
      });
  }

  updateLocalData(p: string, value: string) {
    if (this.app.currentUser) this.app.currentUser[p] = value;
  }

  updateProfil() {
    this.updateLocalData('Nom', this.tempNom);
  }
  // creation annonce
}

