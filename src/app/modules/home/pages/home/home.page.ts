import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { Router } from '@angular/router';
import { Rating } from 'src/app/core/models/rating.model';
import { RecipeQuery } from 'src/app/core/models/recipe-query.model';
import { DEFAULT_QUERY_SETTINGS } from 'src/app/core/models/constants';
import { Recipe } from 'src/app/core/models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  recipes: Recipe[] = [];

  query: RecipeQuery = DEFAULT_QUERY_SETTINGS;

  title: string = "Recently added";

  selectedIngredients: Ingredient[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.query.sortField = 'createdAt';
    this.query.sortDirection = 'desc';
    this.query.filter = {};

    this.recipeService.fetch(this.query).subscribe(response => {
      if (response.code == 1) {
        this.router.navigate(['/']);
      }
      this.title = "Recently added";
      this.recipes = response.data.result;
    });
  }

  searchRecipes(ingredients: Ingredient[]) {
    this.selectedIngredients = ingredients;
    
    this.query.filter = {
      ingredients: ingredients
    };

    if (ingredients.length != 0) {
      this.recipeService.fetch(this.query).subscribe(response => {
        if (response.code == 1) {
          console.log(response.message);
        } else {
          this.recipes = response.data.result;
          this.title = "Search result";
        }
      });
    } else {
      this.ngOnInit();
    }
  }

}
