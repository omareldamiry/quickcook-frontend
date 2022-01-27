import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// TODO Make dedicated interface for SearchDialogData
export interface SearchDialogData {
  name: string
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchDialog, {data: {

    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.html'
})
export class SearchDialog {

  constructor(
    public dialogRef: MatDialogRef<SearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialogData
  ) { }

    closeDialog() {
      this.dialogRef.close();
    }
}
