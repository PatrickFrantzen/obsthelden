import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  authService = inject(AuthService); // Hier wird der AuthService injiziert, um Login-Logik zu verwenden

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
}
