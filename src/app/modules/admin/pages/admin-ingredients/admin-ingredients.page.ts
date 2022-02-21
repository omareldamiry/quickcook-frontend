import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AddIngredientsComponent } from '../../components/add-ingredients/add-ingredients.component';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.page.html',
  styleUrls: ['./admin-ingredients.page.css']
})
export class AdminIngredientsPage implements OnInit {

  ingredients: Ingredient[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'options'];

  @ViewChild('addIngredients') addIngredientsComponent!: AddIngredientsComponent;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllIngredients().subscribe(response => {
      if (response.code == 1) {
        console.log(response.message);
        return;
      }
      this.ingredients = response.data;
    });
  }

  addIngredient(ingredient: Ingredient) {
    this.adminService.createIngredient(ingredient).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  deleteIngredient(id: number) {
    this.adminService.deleteIngredient(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  updateIngredient(ingredient: Ingredient) {
    this.adminService.updateIngredient(ingredient).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  openIngredientDialog(ingredient: Ingredient) {
    this.addIngredientsComponent.openDialog(ingredient);
  }

}
