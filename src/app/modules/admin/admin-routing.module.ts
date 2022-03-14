import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminIngredientsPage } from './pages/admin-ingredients/admin-ingredients.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';
import { AdminRecipesPage } from './pages/admin-recipes/admin-recipes.page';

const routes: Routes = [
    { path: '', component: AdminLoginPage },
    { path: 'home', component: AdminHomePage, canActivate: [AdminGuard] },
    { path: 'recipes', component: AdminRecipesPage, canActivate: [AdminGuard] },
    { path: 'ingredients', component: AdminIngredientsPage, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }