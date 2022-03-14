import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
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
      if (result) {
        (result.mode == 'add') ? this.addRecipeData.emit(result.recipe)
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

  allIngredients: Ingredient[] = [];
  filteredIngredients: Observable<Ingredient[]>;
  selectedIngredients: Ingredient[] = [{name: ''}];
  ingredientCtrl: FormControl = new FormControl();
  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<RecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RecipeDialogData,
    private adminService: AdminService,
  ) {
    this.adminService.getAllIngredients().subscribe(response => {
      this.allIngredients = response.data;
    });

    if(this.data.mode == 'add'){
      this.data.recipe.ingredients = this.selectedIngredients;
    } else {
      this.selectedIngredients = this.data.recipe.ingredients;
    }

    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => (ingredient ? this._filter(ingredient) : this.allIngredients))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const selectedIngredient = this.stringToIngredient(value);
      if (selectedIngredient.name != '' && !this.selectedIngredients.includes(selectedIngredient)) {
        this.selectedIngredients.push(selectedIngredient);
      }
    }
    event.chipInput!.clear();

    this.ingredientCtrl.setValue(null);
  }

  remove(ingredient: Ingredient): void {
    const index = this.selectedIngredients.indexOf(ingredient);

    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const ingredient = this.stringToIngredient(event.option.viewValue);
    if(!this.selectedIngredients.includes(ingredient))
    this.selectedIngredients.push(ingredient);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private stringToIngredient(value: string): Ingredient {

    let selectedIngredient: Ingredient = { name: '' };

    this.allIngredients.forEach(ingredient => {
      if (ingredient.name == value) {
        selectedIngredient = ingredient;
      }
    });

    return selectedIngredient;
  }

  private _filter(value: string): Ingredient[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue));
  }
}
