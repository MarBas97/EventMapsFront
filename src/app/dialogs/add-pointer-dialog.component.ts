import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description: string;
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'add-pointer-dialog.component.html',
})
export class PointerCreatorDialog {

  constructor(
    public dialogRef: MatDialogRef<PointerCreatorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
