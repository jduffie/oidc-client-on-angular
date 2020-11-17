import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import {Env} from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(Env.getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      console.log('AuthService:constructor:' + user);
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    console.log('AuthService:isLoggedIn:' + this.user);
    if (this.user == null) {
      this.completeAuthentication();
    }
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    console.log('AuthService:getClaims:' + this.user);
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    console.log('AuthService:getAuthorizationHeaderValue:' + this.user);
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    console.log('AuthService:startAuthentication:' + this.user);
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    console.log('AuthService:completeAuthentication:' + this.user);
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      console.log('AuthService:completeAuthentication then:' + this.user);
      console.log('AuthService:completeAuthentication then:' + this.user.access_token);
    }).catch(reason => {console.log('AuthService:completeAuthentication then.reason' + reason); });
  }
}
