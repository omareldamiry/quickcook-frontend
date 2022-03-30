import { Component, OnInit } from '@angular/core';
import { DEFAULT_QUERY_SETTINGS } from 'src/app/core/models/constants';
import { RecipeFilter } from 'src/app/core/models/recipe-filter.model';
import { RecipeQuery } from 'src/app/core/models/recipe-query.model';
import { Recipe } from 'src/app/core/models/recipe.model';
import { User } from 'src/app/core/models/user.model';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.css']
})
export class FavouritesPage implements OnInit {

  user?: User;
  favourites: Recipe[] = [];

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
    ) {
      const query: RecipeQuery = DEFAULT_QUERY_SETTINGS;
      
      this.user = this.userService.user;
      
      query.filter = {
        id: this.user?.favourites?.map(recipe => recipe.id)
      };
    this.recipeService.fetch(query).subscribe(response => {
      if(response.code == 0) {
        this.favourites = response.data.result;
      }
    });
  }

  ngOnInit(): void {
  }

}
