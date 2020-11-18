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
    return this.manager.signinRedirectCallback()
      .then(user => {
        this.user = user;
        console.log('AuthService:completeAuthentication then token_type:' + this.user.token_type);
        console.log('AuthService:completeAuthentication then access_token:' + this.user.access_token);
        console.log('AuthService:completeAuthentication then id_token:' + this.user.id_token);
        console.log('AuthService:completeAuthentication then scopes:' + this.user.scopes);
        console.log('AuthService:completeAuthentication then profile.sid:' + this.user.profile.sid);
        console.log('AuthService:completeAuthentication then profile.iss:' + this.user.profile.iss);
        console.log('AuthService:completeAuthentication then profile.name:' + this.user.profile.name);
        console.log('AuthService:completeAuthentication then profile.sub:' + this.user.profile.sub);
        console.log('AuthService:completeAuthentication then profile.profile:' + this.user.profile.profile);
        console.log('AuthService:completeAuthentication then state:' + this.user.state);
        console.log('AuthService:completeAuthentication then session state:' + this.user.session_state);
        console.log('AuthService:completeAuthentication then expired:' + this.user.expired);
        console.log('AuthService:completeAuthentication then expires_in:' + this.user.expires_in);
      })
      .catch(reason => {
        console.log('AuthService:completeAuthentication then.reason' + reason);
      });
  }
}
