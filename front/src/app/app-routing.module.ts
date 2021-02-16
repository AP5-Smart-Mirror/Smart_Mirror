import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MirrorComponent } from './mirror/mirror.component';
import { WebsiteComponent } from './website/website.component';
import { AuthenticationComponent } from './website/authentication/authentication.component';
import { HomeComponent } from './website/home/home.component';

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
