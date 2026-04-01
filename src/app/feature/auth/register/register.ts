import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { App } from '../../../app';
import { ApiReponse } from '../../../shared/models/api-reponse';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  showPassword = false;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$';

  constructor(
    private authService: AuthService,
    private router: Router,
    private app: App,
  ){}

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  onRegister(form : NgForm) {
    let nom = form.value.RegisterNom;
    let prenom = form.value.RegisterPrenom;
    let email = form.value.RegisterEmail;
    let password = form.value.RegisterPassword;

    var bodynoJson ={
      "nom": nom,
      "prenom": prenom,
      "email": email,
      "password": password
    }

    this.authService.register(bodynoJson, this.app.urlAPI()).subscribe((reponseRegister: ApiReponse) => {

      if(reponseRegister.status == "ok"){
        alert("Compte Créer avec Succes")
        this.router.navigate(['/login']);
      }
    })
  }
}
