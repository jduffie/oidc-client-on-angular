import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProtectedComponent} from './protected/protected.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {ProtectedTwoComponent} from './protected-two/protected-two.component';


const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'protected2',
    component: ProtectedTwoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
