import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Account } from "../_models"
import { Auth } from 'aws-amplify';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    console.log('login');
    return Auth.signIn(email, password).then((cognitoUser) => {
      console.log({ cognitoUser });

      const account = new Account();
      account.userName = cognitoUser.username,
      account.firstName = cognitoUser.attributes.given_name;
      account.lastName = cognitoUser.attributes.family_name;
      account.email = cognitoUser.attributes.email;
      account.jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;

      this.accountSubject.next(account);
      return account;
    });
  }

  logout() {
    console.log('logout');
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    try {
      return Auth.currentAuthenticatedUser().then((cognitoUser) => {
        console.log({ cognitoUser });

        const account = new Account();
        account.userName = cognitoUser.username,
        account.firstName = cognitoUser.attributes.given_name;
        account.lastName = cognitoUser.attributes.family_name;
        account.email = cognitoUser.attributes.email;
        account.jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;

        this.accountSubject.next(account);
        return account;
      }).catch((error) => {
        console.log({error});
      });

    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
  }

  register(email:string, password:string, firstName:string, lastName:string) {
    var account = {
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: firstName,
        family_name: lastName,
      },
    };
    console.log({account});
    const user = Auth.signUp(account);
    console.log({ user });
    return user;
  }

  forgotPassword(email: string) {
    return Auth.forgotPassword(email);
  }

  resetPassword(email: string, password: string, verificationCode: string) {
    return Auth.forgotPasswordSubmit(email, verificationCode, password);
  }

  // helper methods (NOT USED)

  // private refreshTokenTimeout;

  // private startRefreshTokenTimer() {
  //     // parse json object from base64 encoded jwt token
  //     const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

  //     // set a timeout to refresh the token a minute before it expires
  //     const expires = new Date(jwtToken.exp * 1000);
  //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  // }

  // private stopRefreshTokenTimer() {
  //     clearTimeout(this.refreshTokenTimeout);
  // }
}
