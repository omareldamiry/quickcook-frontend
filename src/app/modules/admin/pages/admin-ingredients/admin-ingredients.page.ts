import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { AddIngredientsComponent } from '../../components/add-ingredients/add-ingredients.component';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.page.html',
  styleUrls: ['./admin-ingredients.page.css']
})
export class AdminIngredientsPage implements OnInit, AfterViewInit {

  ingredients: Ingredient[] = [];
  dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
  displayedColumns: string[] = ['id', 'name', 'type', 'options'];

  @ViewChild('addIngredients') addIngredientsComponent!: AddIngredientsComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllIngredients().subscribe(response => {
      if (response.code == 1) {
        console.log(response.message);
        return;
      }
      this.ingredients = response.data;
      this.dataSource.data = this.ingredients;
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
