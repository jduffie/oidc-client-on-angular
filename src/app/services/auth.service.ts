import { Injectable } from '@angular/core';
import {UserManager, UserManagerSettings, User, UserManagerEvents} from 'oidc-client';
import {Env} from '../env/env';
import * as Oidc from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(Env.getClientSettings());
  private user: User = null;

  constructor() {

     Oidc.Log.logger = console;
     Oidc.Log.level = Oidc.Log.DEBUG;

      this.manager.getUser().then(user => {
        console.log('AuthService:constructor: got user:' + user);
        this.user = user;
      });

      // setup event handlers
      this.manager.events.addSilentRenewError(callback => {
        console.log('addSilentRenewError : name:' + callback.name + ' msg:' + callback.message);
      });
      this.manager.events.removeSilentRenewError(callback => {
        console.log('removeSilentRenewError : name:' + callback.name + ' msg:' + callback.message);
      });
      this.manager.events.addUserLoaded(callback => {
        console.log('addUserLoaded : name:' + callback.profile.name + ' details:' + callback.toStorageString());
      });
      this.manager.events.removeUserLoaded(callback => {
        console.log('removeUserLoaded : name:' + callback.profile.name + ' details:' + callback.toStorageString());
      });
      this.manager.events.addUserSessionChanged(() => {
        console.log('addUserSessionChanged - add user session changed');
      });
      this.manager.events.removeUserSessionChanged(() => {
        console.log('removeUserSessionChanged - add user session changed');
      });
  }


  isLoggedIn(): boolean {
    console.log('AuthService:isLoggedIn: start');
    if (this.user != null && !this.user.expired) {
      this.dumpUser('isLoggedIn:', this.user);
      return true;
    }
    console.log('AuthService:isLoggedIn: not logged in');
    return false;
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
        this.dumpUser('AuthService:completeAuthentication:', user);

      })
      .catch(reason => {
        console.log('AuthService:completeAuthentication: then.reason:' + reason);
      });
  }

  dumpUser(caller: string, user: User) {
    if (user == null) {
      return;
    }
    console.log('caller:' + caller + 'then token_type:' + user.token_type);
    console.log('caller:' + caller + 'then access_token:' + user.access_token);
    console.log('caller:' + caller + 'then id_token:' + user.id_token);
    console.log('caller:' + caller + 'then scopes:' + user.scopes);
    console.log('caller:' + caller + 'then profile.sid:' + user.profile.sid);
    console.log('caller:' + caller + 'then profile.iss:' + user.profile.iss);
    console.log('caller:' + caller + 'then profile.name:' + user.profile.name);
    console.log('caller:' + caller + 'then profile.sub:' + user.profile.sub);
    console.log('caller:' + caller + 'then profile.profile:' + user.profile.profile);
    console.log('caller:' + caller + 'then state:' + user.state);
    console.log('caller:' + caller + 'then session state:' + user.session_state);
    console.log('caller:' + caller + 'then expired:' + user.expired);
    console.log('caller:' + caller + 'then expires_in:' + user.expires_in);
  }
}
