import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AddRecipesComponent } from '../../components/add-recipes/add-recipes.component';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.page.html',
  styleUrls: ['./admin-recipes.page.css']
})
export class AdminRecipesPage implements OnInit {

  recipes: Recipe[] = [];
  displayedColumns: string[] = ["id", "name", "desc", "options"];

  @ViewChild("addRecipes") addRecipesComponent!: AddRecipesComponent;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllRecipes().subscribe(response => {
      if (response.code == 1) {
        console.log(response.message);
        return;
      }
      this.recipes = response.data;
    });
  }

  openRecipeDialog(recipe: Recipe) {
    this.addRecipesComponent.openDialog(recipe);
  }

  addRecipe(recipe: Recipe) {
    console.log(recipe);
  }

  updateRecipe(recipe: Recipe) {
    console.log(recipe);
  }

  deleteRecipe(id: number) {
    console.log(id);
  }

}
