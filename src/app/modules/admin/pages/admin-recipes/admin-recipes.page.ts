import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Recipe } from 'src/app/core/models/recipe.model';
import { AddRecipesComponent } from '../../components/add-recipes/add-recipes.component';
import { MatSort } from '@angular/material/sort';
import { AsyncTableDataSource } from 'src/app/core/models/async-table-data-source.model';
import { RecipeQuery } from 'src/app/core/models/recipe-query.model';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { map, merge, Observable, startWith, tap } from 'rxjs';
import { DEFAULT_QUERY_SETTINGS } from 'src/app/core/models/constants';
import { RecipeFilter } from 'src/app/core/models/recipe-filter.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { IngredientService } from 'src/app/core/services/ingredient/ingredient.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.page.html',
  styleUrls: ['./admin-recipes.page.css']
})
export class AdminRecipesPage implements OnInit, AfterViewInit {

  recipes: Recipe[] = [];
  dataSource = new MatTableDataSource<Recipe>(this.recipes);
  recipeDataSource!: AsyncTableDataSource<Recipe, RecipeQuery, RecipeService>;
  recipeQuery: RecipeQuery = DEFAULT_QUERY_SETTINGS;
  recipeFilter = new FormControl();
  displayedColumns: string[] = ["id", "name", "desc", "rating", "createdAt", "ingredients", "options"];

  @ViewChild("addRecipes") addRecipesComponent!: AddRecipesComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private recipeService: RecipeService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.recipeDataSource = new AsyncTableDataSource(this.recipeService);
    this.recipeDataSource.loadData();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange, this.recipeFilter.valueChanges).pipe(
      tap(() => {
        this.recipeQuery.filter = this.recipeFilter.value || {};
        this.recipeQuery.pageNumber = this.paginator.pageIndex;
        this.recipeQuery.pageSize = this.paginator.pageSize;
        this.recipeQuery.sortField = this.sort.active;
        this.recipeQuery.sortDirection = this.sort.direction;
        this.recipeDataSource.loadData(this.recipeQuery);
      })
    ).subscribe();
  }

  openRecipeDialog(recipe: Recipe) {
    this.addRecipesComponent.openDialog(recipe);
  }

  openIngredientsDialog(recipe: Recipe) {
    let dialogRef = this.dialog.open(IngredientsDialog, {data: recipe});    
  }

  openFilterDialog() {
    let dialogRef = this.dialog.open(RecipeFilterDialog, {data: this.recipeQuery.filter});

    dialogRef.afterClosed().subscribe((result: RecipeFilter) => {
      if(result) {
        if(!result.name && !result.ingredients!.length && !result.createdAt) {
          
        }else {
          this.recipeFilter.setValue(result);
        }
      }
      console.log(this.recipeQuery);
    });
  }

  addRecipe(recipe: Recipe) {
    this.adminService.createRecipe(recipe).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  updateRecipe(recipe: Recipe) {
    this.adminService.updateRecipe(recipe).subscribe(response => {
      console.log(response);
    });
  }

  deleteRecipe(id: number) {
    this.adminService.deleteRecipe(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  clearFilter() {
    this.recipeFilter.reset();
  }

}

@Component({
  templateUrl: "./ingredients-dialog.html",
  styleUrls: ["./admin-recipes.page.css"]
})
export class IngredientsDialog {

  constructor(
    public dialogRef: MatDialogRef<IngredientsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

}

@Component({
  templateUrl: "./filter-dialog.html",
  styleUrls: ["./admin-recipes.page.css"]
})
export class RecipeFilterDialog {

  recipeFilter!: FormGroup;
  allIngredients: Ingredient[] = [];
  ingredientCtrl = new FormControl('');
  selectedIngredients: Ingredient[];
  filteredIngredients!: Observable<Ingredient[]>;
  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;

  constructor(
    private ingredientService: IngredientService,
    public dialogRef: MatDialogRef<RecipeFilterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RecipeFilter
  ) {
    this.selectedIngredients = data.ingredients || [];
    this.recipeFilter = new FormGroup({
      name: new FormControl(this.data.name),
      ingredients: new FormControl(this.selectedIngredients),
      createdAt: new FormControl(this.data.createdAt),
    });
    this.ingredientService.fetchAll().subscribe(response => {
      this.allIngredients = response.data;
    });

    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) =>  (ingredient? this._filter(ingredient):this.allIngredients.slice()))
    );
    
  }

  closeDialog() {
    this.dialogRef.close();
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

  remove(ingredient: Ingredient) {
    const index = this.selectedIngredients.indexOf(ingredient);

    if(index >= 0) {
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
