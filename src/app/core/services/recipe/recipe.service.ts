import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe.model';
import { ApiService } from '../../http/api.service';
import { ApiResponse } from '../../models/api-response.model';
import { DEFAULT_QUERY_SETTINGS } from '../../models/constants';
import { DataService } from '../../models/data-service.model';
import { RecipeQuery } from '../../models/recipe-query.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends DataService<Recipe, RecipeQuery>{

  constructor(private apiService: ApiService) {
    super();
  }

  // TODO: Check and send token

  fetchAll() {
    const token = localStorage.getItem("token");
    let query: RecipeQuery = DEFAULT_QUERY_SETTINGS;
    query.filter = {};
    
    return this.apiService.post("/recipes", { token, query });
  }

  fetch(query?: RecipeQuery): Observable<ApiResponse> {
    if(!query) {
      query = DEFAULT_QUERY_SETTINGS;
    }

    const token = localStorage.getItem("token");
    
    return this.apiService.post("/recipes", { token, query });
  }

  create(recipe: Recipe) {
    return this.apiService.post("/recipes/recipe", recipe);
  }

  update(recipe: Recipe) {
    return this.apiService.put(`/recipes/${recipe.id}`, recipe);
  }

  delete(id: Number) {
    return this.apiService.delete(`/recipes/${id}`);
  }

  searchRecipes(ingredients: number[]) {
    return this.apiService.post("/recipes/search", { ingredients });
  }
}
