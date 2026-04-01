import { OnInit, signal } from '@angular/core';
import { User } from '../../../core/services/user';
import { Component  } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';
import { AuthService } from '../../../core/services/auth';
import { ProfilAnnonce } from './profil-annonce/profil-annonce';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink, ProfilAnnonce],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class Profil implements OnInit {
  isEditModalOpen = false;
  tempNom: string = '';
  tempprenom: string = '';
  tempemail: string = '';
  tempphotoProfil: string = '';
  temppassword: string = '';

  constructor(
    private cookiesService: CookieService,
    public authService: AuthService,
    public app: App,
  ) {}

  ngOnInit(): void {

    function openEditModal() {
      const p = this.currentUser.profil || this.currentUser.result.profil;
      this.tempNom = p.Nom || '';
      this.tempprenom = p.prenom || '';
      this.tempemail = p.email || '';
      this.temppassword = p.password || '';
      this.tempphotoProfil = p.photoProfil || '';
      this.isEditModalOpen = true;
    }

    // function saveProfil() {
    //   const token = cookieStore.get('voisinConnecterToken');
    //   if (!token) return;
    //
    //   const headers = new HttpHeaders({ Autorization: `Bearer ${token}` });

      // const NomRequest = this.http.post(
      //   `${this.baseUrl}/route/...`,
      //   { Nom: this.tempNom },
      //   { headers },
      // )

      // A mettre les routes pour modif profil dand userServices.ts

    }

    // function updateProfil() {
    //
    //   this.updateLocalData('Nom', this.tempNom);
    // }

  // }
}

