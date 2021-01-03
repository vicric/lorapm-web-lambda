import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  constructor(
    private router: Router,
    private accountService: AccountService
  ){
    // redirect to home if already logged in
    if (this.accountService.accountValue) {
      this.router.navigate(['/']);
  }
  }
}
