import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientType } from 'src/app/shared/enums/ingredient-type';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export interface IngredientDialogData {
  ingredient: Ingredient,
  mode: string;
}

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css']
})
export class AddIngredientsComponent implements OnInit {

  @Output() addIngredientData = new EventEmitter<Ingredient>();
  @Output() updateIngredientData = new EventEmitter<Ingredient>();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(ingredient?: Ingredient) {
    const dialogRef = this.dialog.open(IngredientDialog, {
      data: (ingredient) ? {
        ingredient: ingredient,
        mode: 'edit'
      } : {
        ingredient: {
          name: "",
          type: IngredientType.Unlisted,
        },
        mode: 'add'
      },
    });

    dialogRef.afterClosed().subscribe((result: IngredientDialogData) => {
      if(result) {
        (result.mode=='add')? this.addIngredientData.emit(result.ingredient)
        : this.updateIngredientData.emit(result.ingredient);
      }
    });
  }

}

@Component({
  templateUrl: './add-ingredient-dialog.html',
  styleUrls: ['./add-ingredients.component.css'],
})
export class IngredientDialog {

  public IngredientType = IngredientType;
  public keys(): Array<string> {
    var keys = Object.keys(this.IngredientType);
    return keys.slice(keys.length / 2);
  }

  constructor(
    public dialogRef: MatDialogRef<IngredientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IngredientDialogData,
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
