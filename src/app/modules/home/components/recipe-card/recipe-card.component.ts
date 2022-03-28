import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rating } from 'src/app/core/models/rating.model';
import { Recipe } from '../../../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: Recipe = {
    id: 0,
    name: "Recipe Card",
    desc: "Recipe description",
    ingredients: [{
      name: 'ingredient 1'
    }],
    rating: 0.0,
  };

  @Output() rating = new EventEmitter<Rating>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToRecipe(): void {
    this.router.navigate([`/recipe/${this.recipe.id}`]);
  }

}
