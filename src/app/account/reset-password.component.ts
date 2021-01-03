import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from '../_helpers';
import { first } from 'rxjs/operators';

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = null;
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  const token = this.route.snapshot.queryParams['token'];

  // remove token from url to prevent http referer leakage
  this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

  this.accountService.validateResetToken(token)
      .pipe(first())
      .subscribe({
          next: () => {
              this.token = token;
              this.tokenStatus = TokenStatus.Valid;
          },
          error: () => {
              this.tokenStatus = TokenStatus.Invalid;
          }
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
    this.accountService.resetPassword(this.token, this.f.password.value, this.f.confirmPassword.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this._snackBar.open('Password reset successful, you can now login', 'End now');
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
                this._snackBar.open(error);
                this.loading = false;
            }
        });
}

}
