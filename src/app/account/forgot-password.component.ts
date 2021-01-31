import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this._snackBar.dismiss();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this._snackBar.dismiss();

    this.accountService
      .forgotPassword(this.f.email.value)
      .then(() => {
        this._snackBar.open('Please check your email for password reset instructions', 'End now');
        this.router.navigate(['../verify-email'], { relativeTo: this.route });
      })
      .catch((error) => this._snackBar.open(error.message))
      .finally(() => (this.loading = false));

    // this.accountService.forgotPassword(this.f.email.value)
    //     .pipe(first())
    //     .pipe(finalize(() => this.loading = false))
    //     .subscribe({
    //         next: () => this._snackBar.open('Please check your email for password reset instructions', 'End now'),
    //         error: error => this._snackBar.open(error)
    //     });
}

}
