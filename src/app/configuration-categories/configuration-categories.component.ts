import { Component, OnInit } from '@angular/core';
import { Category, ICategory } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../_services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-categories',
  templateUrl: './configuration-categories.component.html'
})
export class ConfigurationCategoriesComponent implements OnInit {

  constructor(
    private accountService:AccountService,
    private categoryService:CategoryService,
    private router:Router,
    private _snackBar: MatSnackBar) { }

  // account = this.accountService.accountValue;
  color = "#28a745";
  title =""
  categories: ICategory[];

  ngOnInit(): void {
    this.refreshCategories();
    //TODO: Delete from here. just for testing:
    var account = this.accountService.accountValue;
    console.log({account});
  }

  deleteCategory(event, item) {

    try {
      var category = item as Category;
      this.categoryService.delete(category.categoryId).subscribe(
        data => {
          this.refreshCategories();
          this._snackBar.open(category.name + ' deleted', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  // openCategory(event, item) {

  //   try {
  //     var category = item as Category;

  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  refreshCategories(){
    this.categoryService.getAll().subscribe(
      data => {this.categories = data;
      },
      error =>{
        alert(error);
      });
  }

}
