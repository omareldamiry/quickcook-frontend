import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/core/services/ingredient/ingredient.service';
import { IngredientType } from 'src/app/core/enums/ingredient-type';
import { Ingredient } from 'src/app/core/models/ingredient.model';
// TODO Make dedicated interface for SearchDialogData
export interface SearchDialogData {
  ingredients: Ingredient[]
}

@Component({
  selector: 'app-recipe-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() selectedIngredients: Ingredient[] = [];
  @Output() ingredientsQuery = new EventEmitter<Ingredient[]>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchDialog, {
      data: {
        ingredients: this.selectedIngredients
      }, width: "300px", maxHeight: "500px"
    });

    dialogRef.afterClosed().subscribe((result: { selectedIngredients: Ingredient[] } | undefined) => {
      if(result)
      if (result.selectedIngredients.length != 0) {
        this.ingredientsQuery.emit(result.selectedIngredients);
      }
    });
  }

}

@Component({
  selector: 'recipe-search-dialog',
  templateUrl: './search-dialog.html'
})
export class SearchDialog implements OnInit, AfterViewInit, AfterViewChecked {

  ingredientTypes = IngredientType;
  public keys(): Array<string> {
    var keys = Object.keys(this.ingredientTypes);
    return keys.slice(keys.length / 2);
  }

  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  selectedIngredientsValues: string[] = [];

  @ViewChildren(MatChip) chips!: QueryList<MatChip>;

  constructor(
    public dialogRef: MatDialogRef<SearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialogData,
    private ingredientService: IngredientService
  ) { }

  ngOnInit(): void {
    this.ingredientService.fetchAll().subscribe(response => {
      if (response.code == 1) {

      } else {
        this.ingredients = response.data;
        this.selectedIngredients = this.data.ingredients;
        this.selectedIngredientsValues = this.selectedIngredients.map(ingredient => ingredient.name);
        if(this.selectedIngredientsValues.length != 0) {
          setTimeout(() => {
            this.onInitSelect(); 
          })
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // console.log(1);
    // console.log(this.chipLists.get(0)?.chips.length);
    // TODO: Add chip auto selection from previous search
  }

  ngAfterViewChecked(): void {
    
  }

  toggleSelection(chip: MatChip, ingredient: Ingredient) {
    chip.toggleSelected();
    if (chip.selected) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient), 1);
    }
  }

  onInitSelect() {
    for(let chip of this.chips) {
      if(this.selectedIngredientsValues.includes(chip.value.toString())) {
        chip.select();
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
