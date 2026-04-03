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
import { ProductService } from '../../../core/services/product';
import { Status } from '../../../core/services/status';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ProfilAnnonce, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {

  //Pour MAJ profile
  isEditModalOpen: boolean;
  tempNom: string = '';
  tempprenom: string = '';
  tempemail: string = '';
  tempphotoProfil: Text | string = '';
  temppassword: string = '';


  //Pour creer les annonces
  isCreateAnnonce: boolean;
  AnnonceTitle: string;
  AnnonceDescription: string;
  AnnonceRemuneration: number;
  AnnonceDateActive: string;
  AnnonceCategory: string;

  //Tableau de Catégories
 category = [
   {id: 1, name: 'Bricolage'},
   {id: 2, name: 'Jardinage'},
   {id: 3, name: 'Aide'},
   {id: 4, name: 'Animaux'},
   {id: 5, name: 'Informatique'},
   ];


  constructor(
    private cookiesService: CookieService,
    public authService: AuthService,
    private productService: ProductService,
    private statusService: Status,
    public app: App,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

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


    this.userService.update(bodyJSON, this.app.urlAPI(), this.app.createCORS(token)).subscribe((reponseUpdateAPI: ApiReponse) => {
      if (reponseUpdateAPI.status == "ok"){
        alert('Mise à jour avec Success');
        this.isEditModalOpen = false;
      }
    })
  }

  updateLocalData(p: string, value: string) {
    if (this.app.currentUser) this.app.currentUser[p] = value;
  }
  updateProfil() {
    this.updateLocalData('Nom', this.tempNom);
  }


  //---------------- creation annonce ------------------------//
  //Tableau

  setCategory(category: string) {
    this.AnnonceCategory = category;
  }


  createAnnonce(){
    const token = this.cookiesService.get('voisinConnecterToken');
    if (!token) return;

    const bodyJSON  = {
      "title": this.AnnonceTitle,
      "description": this.AnnonceDescription,
      "remuneration": this.AnnonceRemuneration,
      "dateActive": this.AnnonceDateActive,
      "categorie": this.AnnonceCategory,
    }

    this.productService
      .createAProduct(bodyJSON, this.app.urlAPI(), this.app.createCORS(token))
      .subscribe({
        next: (reponseProductAPI: any) => {
          console.log('1. Succès création produit', reponseProductAPI);

          const id = reponseProductAPI.result?.id;

          if (id) {
            console.log("2. Tentative d'appel Status avec ID:", id);
            this.statusService
              .setStatus(id, this.app.urlAPI(), this.app.createCORS(token))
              .subscribe({
                next: (StatusAPI: any) => console.log('3. Succès Status !', StatusAPI),
                error: (err) => console.error('3. ÉCHEC Status API :', err),
              });
          } else {
            console.error('2. ÉCHEC : ID non trouvé dans le résultat.');
          }
        },
        error: (err) => {
          console.error('1. ÉCHEC CRITIQUE création produit :', err);
        },
      });
  }

}

