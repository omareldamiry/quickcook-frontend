import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(
    private apiService: ApiService
  ) { }

  getAllIngredients() {
    return this.apiService.get("/ingredients");
  }

  createIngredient(ingredient: Ingredient) {
    return this.apiService.post("/ingredients", ingredient);
  }

  updateIngredient(ingredient: Ingredient) {
    return this.apiService.put(`/ingredients/${ingredient.id}`, ingredient);
  }

  deleteIngredient(id: number) {
    return this.apiService.delete(`/ingredients/${id}`);
  }
}
