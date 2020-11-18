import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ProtectedTwoComponent } from './protected-two/protected-two.component';

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent, ProtectedTwoComponent,
    AuthCallbackComponent,
    ProtectedTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
