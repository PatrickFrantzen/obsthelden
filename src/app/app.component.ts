import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDialogComponent } from "./shared/error-dialog/error-dialog.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'obsthelden-app';
}
