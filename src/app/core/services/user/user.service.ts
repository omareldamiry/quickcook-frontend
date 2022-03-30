import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ApiService } from '../../http/api.service';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;

  constructor(private apiService: ApiService) {
    const userJson = localStorage.getItem('user');

    if(userJson) {
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
      action: recipe.isFavourite? "disconnect" : "connect"
    };

    this._setFavourites(recipe);

    return this.apiService.put("/user/favourites", requestBody);
  }

  isInFavourites(recipe: Recipe): boolean {
    let _isFavourited: boolean = false;

    this._user?.favourites?.forEach(favRecipe => {
      if(favRecipe.id == recipe.id) {
        _isFavourited = true;
      }
    });
    
    return _isFavourited;
  }

  private _setFavourites(recipe: Recipe) {
    const newUser = this._user!;
    if(!recipe.isFavourite && !this.isInFavourites(recipe))
    newUser.favourites?.push(recipe);
    else newUser.favourites?.splice(newUser.favourites.findIndex(value => value.id == recipe.id), 1);


    const newUserJson = JSON.stringify(newUser);

    localStorage.setItem('user', newUserJson);
  }
}
