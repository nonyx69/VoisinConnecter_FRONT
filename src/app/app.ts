import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {AuthService} from './core/services/auth';
import { Navbar } from './feature/navbar/navbar';
import { ApiReponse } from './shared/models/api-reponse';
import { User } from './shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // VARIABLE GLOBAL

  APP_ENV: string = 'DEV'; /* DEV or PROD */

  url_API_DEV = 'http://localhost:8000';
  url_API_PROD = 'https://api.com';

  public currentUser: User|undefined = null;
  public currentToken: string|undefined = null;

  constructor(public authService: AuthService,
              private cookiesService: CookieService,
              private router: Router,) {

    console.log("salut");

    const cookieToken:string = this.cookiesService.get('voisinConnecterToken');

    if (cookieToken) {
      this.loginWithToken(cookieToken);
    }

  }

  // FUNCTION GLOBAL
  urlAPI() {
    if (this.APP_ENV === 'DEV') {
      return this.url_API_DEV;
    } else {
      return this.url_API_PROD;
    }
  }

  createCORS(newToken:string|undefined = null){

    var token:string;
    if (newToken) {
      token = newToken;
    } else {
      token = this.currentToken;
    }

    var headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token});
    var options = { headers: headers };

    return options;
  }

  // FUNCTION USER
  loginWithToken(token: string) {
    this.authService.token(this.urlAPI(), this.createCORS(token)).subscribe((responseToken: ApiReponse) => {

      if (responseToken.status == "ok") {

        this.currentUser = responseToken.result;
        this.currentToken = this.currentUser.token;

        this.authService.updateUser(this.currentUser);

      }

    })

  }

  login(email: string, mdp: string) {

    var bodyNoJson = {
      "email": email,
      "password": mdp,
    }

    this.authService.login(bodyNoJson, this.urlAPI()).subscribe((reponseLogin: ApiReponse) => {

      if(reponseLogin.status == "ok"){

        this.currentUser = reponseLogin.result;
        this.currentToken = this.currentUser.token;

        this.cookiesService.set('voisinConnecterToken', this.currentToken);
        this.authService.updateUser(this.currentUser);

        this.router.navigate(['/']);

      } else if (reponseLogin.status == "error"){
        alert("MARCHE PAS")
      }

    });

  }

  sign() {}

  logOut() {
    this.currentUser = null;
    this.currentToken = null;
    this.cookiesService.delete('voisinConnecterToken');
  }
}
