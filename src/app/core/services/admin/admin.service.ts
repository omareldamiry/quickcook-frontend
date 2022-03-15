import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { Recipe } from 'src/app/core/models/recipe.model';
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
    this.authService.isAdmin = false;
    this.authService.logout();
  }

  setAdminFlag(isAdmin: boolean) {
    this.authService.isAdmin = isAdmin;
  }

  // Ingredient operations

  getAllIngredients() {
    return this.ingredientService.fetchAll();    
  }

  createIngredient(body: Ingredient) {
    return this.ingredientService.create(body)
  }

  updateIngredient(body: Ingredient) {
    return this.ingredientService.update(body);
  }

  deleteIngredient(id: number) {
    return this.ingredientService.delete(id);
  }

  // Recipe operations

  getAllRecipes() {
    return this.recipeService.fetchAll();
  }

  createRecipe(body: Recipe) {
    return this.recipeService.create(body);
  }

  updateRecipe(body: Recipe) {
    return this.recipeService.update(body);
  }

  deleteRecipe(id: number) {
    return this.recipeService.delete(id);
  }

}
