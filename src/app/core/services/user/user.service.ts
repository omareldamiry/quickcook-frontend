import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from '../../http/api.service';
import { DEFAULT_QUERY_SETTINGS } from '../../models/constants';
import { RecipeQuery } from '../../models/recipe-query.model';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;

  constructor(private apiService: ApiService) {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      this._user = JSON.parse(userJson) as User;
    }
  }

  get user(): User | undefined {
    return this._user;
  }

  toggleFavourites(recipe: Recipe) {
    const requestBody = {
      recipeId: recipe.id!,
      userId: this._user?.id!,
      action: recipe.isFavourite ? "disconnect" : "connect"
    };

    return this.apiService.put("/user/favourites", requestBody);
  }

  isInFavourites(recipe: Recipe): Observable<boolean> {
    let _isFavourited: boolean = false;
    const query: RecipeQuery = DEFAULT_QUERY_SETTINGS;
    query.filter = {
      id: [recipe.id]
    };

    const isFavouriteObservable = new Observable<boolean>(observer => {

      this.getFavourites(query).pipe(
        catchError(err => of(null))
      ).subscribe(response => {
        if (response) {
          if (response.code == 0) {
            if (response.data.result[0]) {
              _isFavourited = true;
            }
            observer.next(_isFavourited);
          }
        }
      });
    });

    return isFavouriteObservable;
  }

  getFavourites(query?: RecipeQuery) {
    if (!query) {
      query = DEFAULT_QUERY_SETTINGS;
      query.filter = {};
    }
    return this.apiService.post(`/user/${this._user?.id}/favourites`, { query });
  }
}
