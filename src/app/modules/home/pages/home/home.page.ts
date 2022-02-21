import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  recipes: any = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(result => {
      if(result.code == 1) {
        localStorage.removeItem("token");
      }
      this.recipes = result.data;

      console.log(this.recipes);
    });
  }

}
