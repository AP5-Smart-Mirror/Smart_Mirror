import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MirrorComponent } from './mirror/mirror.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './home/authentication/authentication.component';

const routes: Routes = [
  {path: '', component: MirrorComponent},
  {path: 'home', component: HomeComponent,
  children: [
    {path: '', component: HomeComponent},
    {path: 'login', component: AuthenticationComponent},
    {path: '**', redirectTo: ''},
  ]},
  {path: '**', redirectTo: ''}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
