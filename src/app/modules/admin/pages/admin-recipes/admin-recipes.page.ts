import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AddRecipesComponent } from '../../components/add-recipes/add-recipes.component';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.page.html',
  styleUrls: ['./admin-recipes.page.css']
})
export class AdminRecipesPage implements OnInit, AfterViewInit {

  recipes: Recipe[] = [];
  dataSource = new MatTableDataSource<Recipe>(this.recipes);
  displayedColumns: string[] = ["id", "name", "desc", "ingredients", "options"];

  @ViewChild("addRecipes") addRecipesComponent!: AddRecipesComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.adminService.getAllRecipes().subscribe(response => {
      if (response.code == 1) {
        console.log(response.message);
        return;
      }
      this.recipes = response.data;
      this.dataSource.data = this.recipes;
    });
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  openRecipeDialog(recipe: Recipe) {
    this.addRecipesComponent.openDialog(recipe);
  }

  openIngredientsDialog(recipe: Recipe) {
    let dialogRef = this.dialog.open(IngredientsDialog, {data: recipe});

    
  }

  addRecipe(recipe: Recipe) {
    // console.log(recipe);
    this.adminService.createRecipe(recipe).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  updateRecipe(recipe: Recipe) {
    // console.log(recipe);
    this.adminService.updateRecipe(recipe).subscribe(response => {
      console.log(response);
    });
  }

  deleteRecipe(id: number) {
    // console.log(id);
    this.adminService.deleteRecipe(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
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
