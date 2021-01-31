import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from '../_helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this._snackBar.dismiss();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService
      .register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
      .then(() => {
        console.log('Registration sucessful');
        this._snackBar.open(
          'Registration successful, please check your email for verification instructions',
          'End now'
        );
        this.router.navigate(['../login'], { relativeTo: this.route });
      })
      .catch((error) => {
        console.log('error:');
        console.log({error});
        this._snackBar.open(error);
        this.loading = false;
      });
  }
}
