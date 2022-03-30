import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';
import { SearchFormComponent, SearchDialog } from './components/search-form/search-form.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RatingDialog, RecipePage } from './pages/recipe/recipe.page';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FavouritesPage } from './pages/favourites/favourites.page';


@NgModule({
  declarations: [
    HomePage,
    SearchFormComponent,
    RecipeCardComponent,
    RatingDialog,
    SearchDialog,
    RecipePage,
    StarRatingComponent,
    FavouritesPage,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
  ],
  exports: [
    HomePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
