import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/shared/models/recipe.model';

export interface RecipeDialogData {
  recipe: Recipe,
  mode: string;
}

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.css']
})
export class AddRecipesComponent implements OnInit {

  @Output() addRecipeData = new EventEmitter<Recipe>();
  @Output() updateRecipeData = new EventEmitter<Recipe>();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(recipe?: Recipe) {
    const dialogRef = this.dialog.open(RecipeDialog, {
      data: (recipe) ? {
        recipe: recipe,
        mode: 'edit'
      } : {
        recipe: {
          name: "",
        },
        mode: 'add'
      },
    });

    dialogRef.afterClosed().subscribe((result: RecipeDialogData) => {
      if(result) {
        (result.mode=='add')? this.addRecipeData.emit(result.recipe)
        : this.updateRecipeData.emit(result.recipe);
      }
    });
  }

}

@Component({
  templateUrl: "./add-recipe-dialog.html",
  styleUrls: ["./add-recipes.component.css"],
})
export class RecipeDialog {
  constructor(
    public dialogRef: MatDialogRef<RecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RecipeDialogData,
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
