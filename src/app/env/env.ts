import {UserManagerSettings, WebStorageStateStore} from 'oidc-client';

export class Env {
  static getClientSettings(): UserManagerSettings {
    return {
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      authority: '',
      client_id: '',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'id_token token',
      scope: 'openid email profile api:customer:',
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true
    };
  }
}
