import { Component, inject, input } from "@angular/core";
import { ErrorDialogSignalService } from "./error-dialog-signal.service";

@Component({
    selector: "app-error-dialog",
    templateUrl: "./error-dialog.component.html",
    styleUrls: ["./error-dialog.component.scss"]
})
export class ErrorDialogComponent {
    errorDialogSignalService = inject(ErrorDialogSignalService);
    message = this.errorDialogSignalService.errorMessage
    isVisible = this.errorDialogSignalService.showErrorDialog;

    close(){
        this.errorDialogSignalService.closeDialog();
    }
}