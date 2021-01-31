import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
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
    const email = this.route.snapshot.queryParams['email'];

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
    console.log('verify-email: ' + email);

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        verificationCode: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
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
      .resetPassword(this.f.email.value, this.f.password.value, this.f.verificationCode.value)
      .then(() => {
        console.log('Password reset sucessful');
        this._snackBar.open(
          'Password reset successful, please log in',
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
