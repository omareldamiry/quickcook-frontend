import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

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
  };

  constructor() { }

  ngOnInit(): void {
  }

}
