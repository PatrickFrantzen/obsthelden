import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  authService = inject(AuthService); // Hier wird der AuthService injiziert, um Login-Logik zu verwenden
  router: Router = inject(Router);

  email: string = '';
  password: string = '';

  onSubmit() {
    // Hier wird die Logik für den Login-Prozess implementiert
    console.log('Login attempt with', this.email, this.password);
    this.authService.register(this.email, this.password).subscribe({
      next: (userCredential) => {
        console.log('Login successful:', userCredential);
        // Hier kann
      },
    });
  }

  emailValidation() {
    // Hier kann eine E-Mail-Validierung implementiert werden
    return this.email && this.email.includes('@');
  }

  passwordValidation() {
    // Hier kann eine Passwort-Validierung implementiert werden
    return this.password && this.password.length >= 6;
  }

  navigateToRegister() {
    // Navigation zur Registrierungsseite
    this.router.navigate(['/register']);
  }
}
