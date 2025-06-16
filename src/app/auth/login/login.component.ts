import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorDialogSignalService } from '../../shared/error-dialog/error-dialog-signal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  private authService = inject(AuthService); // Hier wird der AuthService injiziert, um Login-Logik zu verwenden
  private router: Router = inject(Router);
  private errorDialogService = inject(ErrorDialogSignalService);

  email: string = '';
  password: string = '';

  async onSubmit() {
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        // Navigation zur Hauptseite oder Dashboard
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      this.errorDialogService.handleError(error);
    }
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
