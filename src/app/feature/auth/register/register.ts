import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {
    Nom: '',
    prenom: '',
    email: '',
    password: '',
  };

  showPassword = false;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$';

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
         alert('Compte créé avec succès !');
         this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error?.message || 'Erreur lors de l inscription');
      },
    });
  }
}
