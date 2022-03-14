import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CoreModule } from 'src/app/core/core.module';
import { AdminRecipesPage, IngredientsDialog } from './pages/admin-recipes/admin-recipes.page';
import { AdminIngredientsPage } from './pages/admin-ingredients/admin-ingredients.page';
import { IngredientDialog, AddIngredientsComponent } from './components/add-ingredients/add-ingredients.component';
import { AddRecipesComponent, RecipeDialog } from './components/add-recipes/add-recipes.component';



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
    RecipeDialog,
    IngredientsDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
  ],
  exports: [AdminLoginPage]
})
export class AdminModule { }
