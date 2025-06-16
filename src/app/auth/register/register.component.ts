import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorDialogSignalService } from '../../shared/error-dialog/error-dialog-signal.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  private authService = inject(AuthService); // Hier wird der AuthService injiziert, um die Registrierungslogik zu verwenden
  private router: Router = inject(Router);
  private errorDialogService = inject(ErrorDialogSignalService);
  email: string = '';
  password: string = '';
  parentName: string = '';
  childName: string = '';
  childAge: number = 0; // Alter des Kindes, optional

  async onSubmit() {
    try {
      const success = await this.authService.register(
        this.email,
        this.password,
        this.parentName,
        this.childName,
        this.childAge
      );
      if (success) {
        this.navigateToLogin();
      }
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      this.errorDialogService.handleError(error);
    }
  }

  navigateToLogin() {
    // Navigation zur Login-Seite
    this.router.navigate(['/login']);
  }

  emailValidation() {
    // Hier kann eine E-Mail-Validierung implementiert werden
    return this.email && this.email.includes('@');
  }

  passwordValidation() {
    // Hier kann eine Passwort-Validierung implementiert werden
    return this.password && this.password.length >= 6;
  }
}
