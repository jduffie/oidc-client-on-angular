import {Component, OnInit} from '@angular/core';
import {Env} from './env/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular oidc-client Integration';
  clientSettingsUrl: string;

  constructor() {
    this.clientSettingsUrl = Env.getCoreSettings().gitBaseUrl + 'src/app/env/env.ts';
  }

  ngOnInit() {
    // this.authService.completeAuthentication();
  }
}
