import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { AddIngredientsComponent } from '../../components/add-ingredients/add-ingredients.component';
import { AsyncTableDataSource } from 'src/app/core/models/async-table-data-source.model';
import { IngredientService } from 'src/app/core/services/ingredient/ingredient.service';
import { IngredientQuery } from 'src/app/core/models/ingredient-query.model';
import { merge, tap } from 'rxjs';
import { DEFAULT_QUERY_SETTINGS } from 'src/app/core/models/constants';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientFilter } from 'src/app/core/models/ingredient-filter.model';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientType } from 'src/app/core/enums/ingredient-type';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.page.html',
  styleUrls: ['./admin-ingredients.page.css']
})
export class AdminIngredientsPage implements OnInit, AfterViewInit {

  ingredients: Ingredient[] = [];
  dataSource = new MatTableDataSource<Ingredient>(this.ingredients);
  ingredientDataSource!: AsyncTableDataSource<Ingredient, IngredientQuery, IngredientService>;
  ingredientQuery: IngredientQuery = DEFAULT_QUERY_SETTINGS;
  ingredientFilter = new FormControl();
  displayedColumns: string[] = ['id', 'name', 'type', 'options'];

  @ViewChild('addIngredients') addIngredientsComponent!: AddIngredientsComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private ingredientService: IngredientService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.ingredientDataSource = new AsyncTableDataSource(this.ingredientService);
    this.ingredientDataSource.loadData();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange, this.ingredientFilter.valueChanges).pipe(
      tap(() => {
        this.ingredientQuery.filter = this.ingredientFilter.value || {};
        this.ingredientQuery.pageSize = this.paginator.pageSize;
        this.ingredientQuery.pageNumber = this.paginator.pageIndex;
        this.ingredientQuery.sortField = this.sort.active;
        this.ingredientQuery.sortDirection = this.sort.direction;
        this.ingredientDataSource.loadData(this.ingredientQuery);
      })
    ).subscribe();
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

  openFilterDialog() {
    let dialogRef = this.dialog.open(IngredientFilterDialog, {data: this.ingredientQuery.filter});

    dialogRef.afterClosed().subscribe((result: IngredientFilter) => {
      if(result) {
        this.ingredientFilter.setValue(result);
      }
    });
  }

  clearFilter() {
    this.ingredientFilter.reset();
  }

}

@Component({
  templateUrl: './filter-dialog.html',
  styleUrls: ['./admin-ingredients.page.css']
})
export class IngredientFilterDialog {

  ingredientFilter: FormGroup;
  public IngredientType = IngredientType;
  public keys(): Array<string> {
    var keys = Object.keys(this.IngredientType);
    return keys.slice(keys.length / 2);
  }

  constructor(
    private dialogRef: MatDialogRef<IngredientFilterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IngredientFilter,
  ) {
    this.ingredientFilter = new FormGroup({
      name: new FormControl(data.name),
      ofType: new FormControl(data.ofType),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
