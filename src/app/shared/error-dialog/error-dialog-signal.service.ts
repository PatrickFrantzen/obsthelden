import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogSignalService {
  showErrorDialog = signal(false);
  errorMessage = signal<string>('');

  handleError(error: any) {
    let message =
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
    switch (error.code) {
      case 'auth/wrong-password':
        message = 'Das Passwort ist falsch.';
        break;
      case 'auth/user-not-found':
        message = 'Diese Emailadresse ist nicht registiert';
        break;
      case 'auth/email-already-in-use':
        message = 'Diese Emailadresse ist bereits registiert';
        break;
      case 'auth/weak-password':
        message =
          'Das Passwort ist zu schwach. Bitte wählen Sie ein stärkeres Passwort mit mindestens 6 Zeichen.';
        break;
      case 'auth/invalid-email':
        message =
          'Die eingegebene Emailadresse ist ungültig. Bitte überprüfen Sie die Eingabe.';
        break;
      default:
        message = 'Ein unbekannter Fehler ist aufgetreten';
    }
    this.openDialog(message);
  }

  openDialog(message: string) {
    this.errorMessage.set(message);
    this.showErrorDialog.set(true);

    setTimeout(() => {
      this.closeDialog();
    }, 5000); // Dialog schließt sich nach 5 Sekunden automatisch
  }

  closeDialog() {
    this.showErrorDialog.set(false);
    this.errorMessage.set('');
  }
}
