import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { Recipe } from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnChanges, OnInit {

  @Input() recipe: Recipe = {
    id: 0,
    name: "Recipe Card",
    desc: "Recipe description",
    ingredients: [{
      name: 'ingredient 1'
    }],
    rating: 0.0,
  };

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.recipe.isFavourite = this.userService.isInFavourites(this.recipe);
  }

  ngOnInit(): void {
  }

  navigateToRecipe(): void {
    this.router.navigate([`/recipe/${this.recipe.id}`]);
  }

  toggleFavourite() {
    this.userService.toggleFavourites(this.recipe).subscribe(response => {
      if(response.code == 0) {
        this.recipe.isFavourite = !this.recipe.isFavourite;
      }
    });
  }

}
