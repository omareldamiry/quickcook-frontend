import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CoreModule } from 'src/app/core/core.module';
import { AdminRecipesPage, IngredientsDialog, RecipeFilterDialog } from './pages/admin-recipes/admin-recipes.page';
import { AdminIngredientsPage, IngredientFilterDialog } from './pages/admin-ingredients/admin-ingredients.page';
import { IngredientDialog, AddIngredientsComponent } from './components/add-ingredients/add-ingredients.component';
import { AddRecipesComponent, RecipeDialog } from './components/add-recipes/add-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsyncTableComponent } from './components/async-table/async-table.component';



@NgModule({
  declarations: [
    AdminLoginPage,
    AdminLoginComponent,
    AdminHomePage,
    AdminRecipesPage,
    AdminIngredientsPage,
    AddIngredientsComponent,
    AddRecipesComponent,
    IngredientDialog,
    IngredientFilterDialog,
    RecipeDialog,
    IngredientsDialog,
    RecipeFilterDialog,
    AsyncTableComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AdminRoutingModule,
    SharedModule,
  ],
  exports: [AdminLoginPage]
})
export class AdminModule { }
