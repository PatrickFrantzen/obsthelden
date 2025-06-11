import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ErrorDialogSignalService } from "../../shared/error-dialog/error-dialog-signal.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["../auth.component.scss"],
    imports: [CommonModule, FormsModule]
    })

export class RegisterComponent {

    private auth: Auth = inject(Auth);
    private firestore: Firestore = inject(Firestore);
    private router: Router = inject(Router);
    private errorDialogSignalService = inject(ErrorDialogSignalService);
    email: string = '';
    password: string = '';
    parentName: string = '';
    childName: string = '';
    childAge: number = 0; // Alter des Kindes, optional
    
   async onSubmit(form: NgForm) {
        const { email, password, parentName, childName, childAge } = form.value;

        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const uid = userCredential.user.uid;

            await setDoc(doc(this.firestore, 'users', uid), {
                email: email,
                parentName: parentName,
                child: {
                    name: childName,
                    age: Number(childAge)
                },
                createdAt: new Date()
            })

            console.log("Benutzer erfolgreich registriert:", userCredential);

            // Hier kann eine Navigation zur Startseite oder zum Dashboard erfolgen
            this.navigateToLogin();

        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            this.errorDialogSignalService.handleError(error);
            // Hier kann eine Fehlerbehandlung implementiert werden
            
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