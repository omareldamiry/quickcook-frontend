import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apiService: ApiService) { }

  // TODO: Check and send token

  getAllRecipes() {
    const token = localStorage.getItem("token");
    
    return this.apiService.post("/recipes", { token });
  }

  createRecipe(recipe: Recipe) {
    return this.apiService.post("/recipes/recipe", recipe);
  }

  updateRecipe(recipe: Recipe) {
    return this.apiService.put(`/recipes/${recipe.id}`, recipe);
  }

  deleteRecipe(id: Number) {
    return this.apiService.delete(`/recipes/${id}`);
  }

  searchRecipes(ingredients: number[]) {
    return this.apiService.post("/recipes/search", { ingredients });
  }
}
