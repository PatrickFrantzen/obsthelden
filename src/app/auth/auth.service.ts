import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);

  readonly uid = signal<string | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        this.uid.set(user.uid); // Setze die UID des angemeldeten Benutzers
      } else {
        console.log('No user is signed in.');
        this.uid.set(null); // Setze die UID auf null, wenn kein Benutzer angemeldet ist
      }
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true; // Login erfolgreich
    } catch (error) {
      throw error; // Fehler wird an den aufrufenden Code weitergegeben
    }
  }

  async register(
    email: string,
    password: string,
    parentName: string,
    childName: string,
    childAge: number
  ): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'users', uid), {
        email: email,
        parentName: parentName,
        child: {
          name: childName,
          age: Number(childAge),
        },
        createdAt: new Date(),
      });

      return true; // Registrierung erfolgreich
      // Hier kann eine Navigation zur Startseite oder zum Dashboard erfolgen
    } catch (error) {
      throw error; // Fehler wird an den aufrufenden Code weitergegeben
      // Hier kann eine Fehlerbehandlung implementiert werden
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      this.uid.set(null);
      this.router.navigate(['/login']); // Optional: Navigation zur Login-Seite nach dem Logout
    });
  }

  getUser() {
    return this.auth.onAuthStateChanged;
  }
}
