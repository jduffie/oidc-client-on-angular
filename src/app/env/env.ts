import {UserManagerSettings, WebStorageStateStore} from 'oidc-client';

export class Env {
  static getClientSettings(): UserManagerSettings {
    return {
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      authority: 'https://xgs-reach.us.auth0.com/',
      client_id: 'zEJp6uhSGyZARMYhwOwi2D0n7rCDX2OS',
      redirect_uri: 'http://localhost:4200/',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'id_token token',
      scope: 'openid email profile api:customer:',
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true
    };
  }
}
