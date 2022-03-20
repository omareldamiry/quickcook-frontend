import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { ApiService } from '../../http/api.service';
import { ApiResponse } from '../../models/api-response.model';
import { DEFAULT_QUERY_SETTINGS } from '../../models/constants';
import { DataService } from '../../models/data-service.model';
import { IngredientQuery } from '../../models/ingredient-query.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService extends DataService<Ingredient, IngredientQuery> {

  constructor(private apiService: ApiService) {
    super();
  }

  fetchAll() {
    return this.apiService.get("/ingredients");
  }

  fetch(query?: IngredientQuery): Observable<ApiResponse> {
    //! Replace after result 
    if(!query) {
      query = DEFAULT_QUERY_SETTINGS;
      query.filter = {};
    }
    return this.apiService.post("/ingredients", query);
  }

  create(ingredient: Ingredient) {
    return this.apiService.post("/ingredients/ingredient", ingredient);
  }

  update(ingredient: Ingredient) {
    return this.apiService.put(`/ingredients/${ingredient.id}`, ingredient);
  }

  delete(id: number) {
    return this.apiService.delete(`/ingredients/${id}`);
  }
}
