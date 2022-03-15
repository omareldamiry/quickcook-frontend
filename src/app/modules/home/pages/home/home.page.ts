import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { Ingredient } from 'src/app/core/models/ingredient.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  recipes: any = [];

  title: string = "Recently added";

  selectedIngredients: Ingredient[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(result => {
      if (result.code == 1) {
        localStorage.removeItem("token");
      }
      this.title = "Recently added";
      this.recipes = result.data;
    });
  }

  searchRecipes(ingredients: Ingredient[]) {
    this.selectedIngredients = ingredients;

    const query: number[] = ingredients.map(ingredient => {
      return ingredient.id!;
    });

    if (query.length != 0) {
      this.recipeService.searchRecipes(query).subscribe(response => {
        if (response.code == 1) {
          console.log(response.message);
        } else {
          this.recipes = response.data;
          this.title = "Search result";
        }
      });
    } else {
      this.ngOnInit();
    }
  }

}
