import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminIngredientsPage } from './pages/admin-ingredients/admin-ingredients.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';
import { AdminRecipesPage } from './pages/admin-recipes/admin-recipes.page';

const routes: Routes = [
    { path: '', component: AdminLoginPage },
    { path: 'home', component: AdminHomePage },
    { path: 'recipes', component: AdminRecipesPage },
    { path: 'ingredients', component: AdminIngredientsPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }