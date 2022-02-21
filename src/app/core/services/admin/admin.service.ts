import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthService } from '../../authentication/auth.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private authService: AuthService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) { }

  // Auth operations
  
  login(body: any) {
    return this.authService.login(body, "admin");
  }

  logout() {
    this.authService.logout();
    this.authService.isAdmin = false;
  }

  // Ingredient operations

  getAllIngredients() {
    return this.ingredientService.getAllIngredients();    
  }

  createIngredient(body: Ingredient) {
    return this.ingredientService.createIngredient(body)
  }

  updateIngredient(body: Ingredient) {
    return this.ingredientService.updateIngredient(body);
  }

  deleteIngredient(id: number) {
    return this.ingredientService.deleteIngredient(id);
  }

  // Recipe operations

  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  createRecipe(body: Recipe) {
    return this.recipeService.createRecipe(body);
  }

  updateRecipe(body: Recipe) {
    return this.recipeService.updateRecipe(body);
  }

  deleteRecipe(id: number) {
    return this.recipeService.deleteRecipe(id);
  }

}
