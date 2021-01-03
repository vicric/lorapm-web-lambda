import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, ICategory } from '../_models/category';
import { CategoryService } from '../_services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-configuration-category-form',
  templateUrl: './configuration-category-form.component.html'
})
export class ConfigurationCategoryFormComponent implements OnInit {

  myForm: FormGroup;
  id: number;
  isAddMode: boolean;

  constructor(
    private fb: FormBuilder,
    private categoryService:CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });

    this.myForm.valueChanges.subscribe(console.log);

    if (!this.isAddMode){
      this.categoryService.get(this.id).subscribe(
        data => this.myForm.patchValue(data),
        error => alert(error)
      );
    }
  }

  get name () {
    return this.myForm.get('name');
  }

  get color () {
    return this.myForm.get('color');
  }

  async submitHandler() {
    if (this.isAddMode) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  private createCategory() {
    const formValue = this.myForm.value;

    try {
      this.categoryService.create(formValue).subscribe(
        data => {

          this.router.navigateByUrl('configuration-categories');
          this._snackBar.open('Category created', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  private updateCategory() {
    const formValue = this.myForm.value;

    try {
      this.categoryService.update(this.id, formValue).subscribe(
        data => {

          this.router.navigateByUrl('configuration-categories');
          this._snackBar.open('Category updated', 'End now');
        },
        error =>{
          alert(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

}
