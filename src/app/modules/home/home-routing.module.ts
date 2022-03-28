import { NgModule } from '@angular/core';
import { RouterModule, Routes, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomePage } from './pages/home/home.page';
import { RecipePage } from './pages/recipe/recipe.page';

const routes: Routes = [
  { path: '', component: HomePage, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: RecipePage, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
