import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private apiService: ApiService) { }

  // TODO: Check and send auth data

  getAllRecipes() {
    const token = localStorage.getItem("token");
    
    return this.apiService.post("/recipes", { token });
  }

  createRecipe(recipe: Recipe) {
    return this.apiService.post("/recipe", recipe);
  }

  updateRecipe(recipe: Recipe) {
    return this.apiService.put(`/recipe/${recipe.id}`, recipe);
  }

  deleteRecipe(id: Number) {
    return this.apiService.delete(`/recipe/${id}`);
  }
}
