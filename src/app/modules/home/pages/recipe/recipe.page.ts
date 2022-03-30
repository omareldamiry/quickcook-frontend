import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_QUERY_SETTINGS } from 'src/app/core/models/constants';
import { Rating } from 'src/app/core/models/rating.model';
import { RecipeQuery } from 'src/app/core/models/recipe-query.model';
import { Recipe } from 'src/app/core/models/recipe.model';
import { User } from 'src/app/core/models/user.model';
import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.css']
})
export class RecipePage implements OnInit {

  recipe: Recipe = {
    name: '',
    ingredients: [],
    rating: 0
  };

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private recipeService: RecipeService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchRecipe(id).subscribe(response => {
        if(response.code == 0) {
          this.recipe = response.data.result[0];
          this.recipe.isFavourite = this.userService.isInFavourites(this.recipe);
        }
      });
    });
  }

  ngOnInit(): void {
  }

  openRatingDialog(): void {
    let dialogRef = this.dialog.open(RatingDialog);

    dialogRef.afterClosed().subscribe(result => {
      // result = { value, comment }
      if(result) {
        const user = JSON.parse(localStorage.getItem("user")!) as User;

        const rating: Rating = {
          value: result.value,
          comment: result.comment,
          recipeId: this.recipe.id!,
          userId: user.id
        };

        // console.log(rating);
        this.submitRating(rating);
      }
    });
  }

  fetchRecipe(id: number) {
    const query: RecipeQuery = DEFAULT_QUERY_SETTINGS;
    query.filter = { id: [id] };
    return this.recipeService.fetch(query);
  }

  toggleFavourite(): void {
    this.userService.toggleFavourites(this.recipe).subscribe(response => {
      if(response.code == 0) {
        this.recipe.isFavourite = !this.recipe.isFavourite;
      }
      console.log(response);
    });
  }

  submitRating(rating: Rating): void {
    console.log(rating);
    this.recipeService.rate(rating).subscribe(response => {
      console.log(response);
    });
  }

}

@Component({
  templateUrl: './rating-dialog.html',
  styleUrls: ['./recipe.page.css']
})
export class RatingDialog {

  constructor(
    private dialogRef: MatDialogRef<RatingDialog>,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
