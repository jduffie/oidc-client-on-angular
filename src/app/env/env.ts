import {OidcClientSettings, UserManagerSettings, WebStorageStateStore} from 'oidc-client';

export interface CoreSettings  {
  readonly gitBaseUrl?: string;
}

export class Env {
  static getCoreSettings(): CoreSettings {
    return {
      gitBaseUrl: 'https://github.com/jduffie/oidc-client-on-angular/blob/main/'
    };
  }
  static getClientSettings(): UserManagerSettings {
    return {
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      authority: 'https://xgs-reach.us.auth0.com/',
      client_id: 'zEJp6uhSGyZARMYhwOwi2D0n7rCDX2OS',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'id_token token',

      // 'code' tells oidc-client to use authorization code flow and PKCE
      //   but you must remove 'openid' from scope to not retrieve the
      //   access_token and id_token
      // response_type: 'code',
      scope: 'openid email profile api:customer:',
      // scope: 'email profile api:customer:',
      filterProtocolClaims: false,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
    };
  }
}
